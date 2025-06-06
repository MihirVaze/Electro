export const CLIENT_RESPONSES = {
    CLIENT_NOT_FOUND: {
        status: 404,
        message: 'CLIENT NOT FOUND',
    },
    CLIENT_CREATION_FAILED: {
        status: 500,
        message: 'CLIENT COULD NOT BE CREATED',
    },
    CLIENT_CREATION_FIELDS_MISSING: {
        status: 500,
        message: 'PLEASE ENTER ALL THE FIELDS',
    },
    CLIENT_CREATED: {
        status: 201,
        message: 'CLIENT CREATED SUCCESSFULLY',
    },
    CLIENT_DELETION_FAILED: {
        status: 500,
        message: 'CLIENT COULD NOT BE DELETED',
    },
    CLIENT_DELETED: {
        status: 200,
        message: 'CLIENT DELETED SUCCESSFULLY',
    },
    CLIENT_UPDATION_FAILED: {
        status: 500,
        message: 'CLIENT COULD NOT BE UPDATED',
    },
    CLIENT_UPDATED: {
        status: 200,
        message: 'CLIENT UPDATED SUCCESSFULLY',
    },
    CLIENT_RESTORED: {
        status: 200,
        message: 'CLIENT RESTORED SUCCESSFULLY',
    },
};
