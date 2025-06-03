import { FindOptions, UpdateOptions } from 'sequelize';
import { SchemaName } from '../../utility/umzug-migration';
import { WorkerSchema } from './worker.schema';
import { Worker } from './worker.type';

class WorkerRepo {
    public async createWorker(worker: Worker, schema: SchemaName) {
        return WorkerSchema.schema(schema).create(worker);
    }

    public async get(options: FindOptions<Worker>, schema: SchemaName) {
        return WorkerSchema.schema(schema).findOne(options);
    }

    public async getAll(options: FindOptions<Worker>, schema: SchemaName) {
        return WorkerSchema.schema(schema).findAndCountAll(options);
    }

    public async update(
        worker: Partial<Worker>,
        options: UpdateOptions<Worker>,
        schema: SchemaName,
    ) {
        return WorkerSchema.schema(schema).update(worker, options);
    }

    public async delete(
        worker: Partial<Worker>,
        options: UpdateOptions<Worker>,
        schema: SchemaName,
    ) {
        const { deletedAt, deletedBy } = worker;
        return WorkerSchema.schema(schema).update(
            { deletedAt, deletedBy, isDeleted: true },
            options,
        );
    }
}

export default new WorkerRepo();
