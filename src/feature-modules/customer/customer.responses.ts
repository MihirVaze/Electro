export const CUSTOMER_RESPONSES = {
    CUSTOMER_NOT_FOUND: {
        status: 404,
        message: 'CUSTOMER NOT FOUND',
    },
    CUSTOMER_CREATION_FAILED: {
        status: 500,
        message: 'CUSTOMER COULD NOT BE CREATED',
    },
    CUSTOMER_CREATION_FIELDS_MISSING: {
        status: 500,
        message: 'PLEASE ENTER ALL THE FIELDS',
    },
    CUSTOMER_CREATED: {
        status: 201,
        message: 'CUSTOMER CREATED SUCCESSFULLY',
    },
    CUSTOMER_DELETION_FAILED: {
        status: 500,
        message: 'CUSTOMER COULD NOT BE DELETED',
    },
    CUSTOMER_DELETED: {
        status: 200,
        message: 'CUSTOMER DELETED SUCCESSFULLY',
    },
    CUSTOMER_UPDATION_FAILED: {
        status: 500,
        message: 'CUSTOMER COULD NOT BE UPDATED',
    },
    CUSTOMER_UPDATED: {
        status: 200,
        message: 'CUSTOMER UPDATED SUCCESSFULLY',
    },
    CUSTOMER_WORKER_NOT_FOUND: {
        status: 404,
        message: 'CUSTOMER WORKER NOT FOUND',
    },
    NO_WORKER_AVAILABLE_IN_THIS_AREA: {
        status: 404,
        message: 'NO WORKER AVAILABLE IN THIS AREA',
    },
};
