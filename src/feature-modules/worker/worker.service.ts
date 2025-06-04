import { Op, Transaction } from 'sequelize';
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
            const { workerName, phoneNo, email, cityId, createdBy } = worker;
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
                    createdBy,
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
                    createdBy,
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
                    attributes: {
                        exclude: [
                            'isDeleted',
                            'deletedBy',
                            'deletedAt',
                            'restoredBy',
                            'restoredAt',
                            'createdBy',
                            'updatedBy',
                            'createdAt',
                            'updatedAt',
                        ],
                    },
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

    async getWorkersSortedByCustomerCount(
        worker: Partial<Worker>,
        limit: number,
        schema: SchemaName,
    ) {
        try {
            const result = await workerRepo.getAll(
                { where: worker, order: [['customerCount', 'ASC']], limit },
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
        userId: string,
        schema: SchemaName,
        transaction?: Transaction,
    ) {
        try {
            const { phoneNo, email, ...remainingWorker } = worker;
            if (phoneNo || email) {
                const updateUser: any = {};
                if (phoneNo) {
                    updateUser.phoneNo = phoneNo;
                }
                if (email) {
                    updateUser.email = email;
                }

                updateUser.id = userId;

                await userService.updateUser(updateUser, schema);
            }

            const result = await workerRepo.update(
                remainingWorker,
                {
                    where: { userId },
                    transaction,
                },
                schema,
            );
            if (!result[0]) throw WORKER_RESPONSES.WORKER_UPDATION_FAILED;
            return WORKER_RESPONSES.WORKER_UPDATED;
        } catch (error) {
            transaction?.rollback();
            console.dir(error);
            throw error;
        }
    }

    async deleteWorker(worker: Partial<Worker>, schema: SchemaName) {
        try {
            const { userId, deletedBy } = worker;
            const result = await workerRepo.delete(
                { deletedBy, deletedAt: new Date() },
                { where: { userId } },
                schema,
            );
            if (!result[0]) throw WORKER_RESPONSES.WORKER_DELETION_FAILED;

            return WORKER_RESPONSES.WORKER_DELETED;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }
}

export default new WorkerService();
