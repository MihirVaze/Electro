import { SchemaName } from '../../utility/umzug-migration';
import { CitySchema } from '../location/location.schema';
import { UserSchema } from '../user/user.schema';
import workerRepo from './worker.repo';
import { WORKER_RESPONSES } from './worker.responses';
import { Worker } from './worker.type';

class WorkerService {
    async addWorker(worker: Worker, schema: SchemaName) {
        try {
            const { userId, cityId } = worker;
            if (!userId || !cityId)
                throw WORKER_RESPONSES.WORKER_CREATION_FAILED;

            const result = await workerRepo.createWorker(worker, schema);
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
            let where: any = {};

            let workerWhere: any = {};

            const offset = (page - 1) * limit;

            const result = await workerRepo.getAll(
                {
                    where: { isDeleted: false, ...workerWhere },
                    include: [
                        {
                            model: UserSchema,
                            where,
                            attributes: ['name', 'email'],
                        },
                        {
                            model: CitySchema,
                            where,
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
        userId: string,
        schema: SchemaName,
    ) {
        try {
            const result = await workerRepo.update(
                worker,
                {
                    where: { userId },
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
            const result = await workerRepo.delete(
                { where: { userId: id } },
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
