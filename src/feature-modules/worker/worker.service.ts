import { Op } from 'sequelize';
import { SchemaName } from '../../utility/umzug-migration';
import { CitySchema } from '../location/location.schema';
import roleServices from '../role/role.services';
import { UserSchema } from '../user/user.schema';
import userService from '../user/user.service';
import { UserRoleLocation } from '../user/user.types';
import workerRepo from './worker.repo';
import { WORKER_RESPONSES } from './worker.responses';
import { Worker } from './worker.type';

class WorkerService {
    async addWorker(worker: Worker, schema: SchemaName) {
        try {
            const { workerName, phoneNo, email, cityId } = worker;
            if (!phoneNo || !email)
                throw WORKER_RESPONSES.WORKER_CREATION_FAILED;

            const role = await roleServices.getRole({ role: 'worker' }, schema);

            const roles: UserRoleLocation[] = [
                {
                    roleId: role.id ?? '',
                    locationIds: [cityId],
                },
            ];

            const newUser = await userService.onBoardUser(
                {
                    name: workerName,
                    phoneNo,
                    email,
                    password: '',
                },
                roles,
                schema,
            );

            const { id } = newUser.result;
            if (!id) throw WORKER_RESPONSES.WORKER_CREATION_FAILED;

            const result = await workerRepo.createWorker(
                {
                    workerName,
                    userId: id,
                    cityId,
                },
                schema,
            );

            if (!result) throw WORKER_RESPONSES.WORKER_CREATION_FAILED;

            return WORKER_RESPONSES.WORKER_CREATED;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async getWorker(worker: Partial<Worker>, schema: SchemaName) {
        try {
            const result = await workerRepo.get({ where: worker }, schema);
            if (!result) throw WORKER_RESPONSES.WORKER_NOT_FOUND;

            return result;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async getWorkers(
        worker: Partial<Worker>,
        limit: number,
        page: number,
        schema: SchemaName,
    ) {
        try {
            const workerWhere: any = {};
            const userWhere: any = {};
            const cityWhere: any = {};

            if (worker?.workerName) {
                workerWhere.workerName = {
                    [Op.iLike]: `%${worker.workerName}%`,
                };
            }

            if (worker?.email) {
                userWhere.email = { [Op.iLike]: `%${worker.email}%` };
            }

            const offset = (page - 1) * limit;

            const result = await workerRepo.getAll(
                {
                    where: { isDeleted: false, ...workerWhere },
                    include: [
                        {
                            model: UserSchema,
                            where: userWhere,
                            attributes: ['name', 'email'],
                        },
                        {
                            model: CitySchema,
                            where: cityWhere,
                            attributes: ['name'],
                        },
                    ],
                    limit,
                    offset,
                },
                schema,
            );
            return result;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async updateWorker(
        worker: Partial<Worker>,
        workerId: string,
        schema: SchemaName,
    ) {
        try {
            const { phoneNo, email, ...remainingWorker } = worker;
            if (phoneNo || email) {
                const workerToBeUpdated = await workerRepo.get(
                    {
                        where: { id: workerId },
                    },
                    schema,
                );

                const updateUser: any = {};
                if (phoneNo) {
                    updateUser.phoneNo = phoneNo;
                }
                if (email) {
                    updateUser.email = email;
                }

                updateUser.id = workerToBeUpdated?.dataValues.id;

                await userService.updateUser(updateUser, schema);
            }

            const result = await workerRepo.update(
                remainingWorker,
                {
                    where: { id: workerId },
                },
                schema,
            );
            if (!result[0]) throw WORKER_RESPONSES.WORKER_UPDATION_FAILED;

            return WORKER_RESPONSES.WORKER_UPDATED;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async deleteWorker(id: string, schema: SchemaName) {
        try {
            const result = await workerRepo.delete({ where: { id } }, schema);
            if (!result[0]) throw WORKER_RESPONSES.WORKER_DELETION_FAILED;

            return WORKER_RESPONSES.WORKER_DELETED;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }
}

export default new WorkerService();
