export const CONSUMPTION_RESPONSES = {
    BAD_REQUEST: {
        status: 400,
        message: 'PLEASE FILL ALL THE NECCESSARY DETAILS',
    },
    CREATION_FAILS: {
        status: 500,
        message: 'INTERNAL SERVER ERROR',
    },
    CONSUMPTION_CREATED: {
        status: 201,
        message: 'CONSUMPTION SUCCESSFULLY ADDED',
    },
    CONSUMPTION_NOT_FOUND: {
        status: 404,
        message: 'CONSUMPTION NOT FOUND FOR GIVEN ID',
    },
    CONSUMPTION_UPDATED: {
        status: 200,
        message: 'CONSUMPTION UPDATED OF THE CLIENT',
    },
    CONSUMPTION_DELETED: {
        status: 200,
        message: 'CONSUMPTION DELETED SUCCESSFULLY',
    },
};
