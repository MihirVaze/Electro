export const WORKER_RESPONSES = {
    WORKER_NOT_FOUND: {
        status: 404,
        message: 'WORKER NOT FOUND',
    },
    WORKER_CREATION_FAILED: {
        status: 500,
        message: 'WORKER COULD NOT BE CREATED',
    },
    WORKER_CREATED: {
        status: 201,
        message: 'WORKER CREATED SUCCESSFULLY',
    },
    WORKER_DELETION_FAILED: {
        status: 500,
        message: 'WORKER COULD NOT BE DELETED',
    },
    WORKER_DELETED: {
        status: 200,
        message: 'WORKER DELETED SUCCESSFULLY',
    },
    WORKER_UPDATION_FAILED: {
        status: 500,
        message: 'WORKER COULD NOT BE UPDATED',
    },
    WORKER_UPDATED: {
        status: 200,
        message: 'WORKER UPDATED SUCCESSFULLY',
    },
};
