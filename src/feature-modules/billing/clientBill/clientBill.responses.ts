export const CLIENT_BILL_RESPONSES = {
    CLIENT_NOT_FOUND: {
        status: 404,
        message: 'CLIENT NOT FOUND',
    },
    CLIENT_BILL_CREATION_FAILED: {
        status: 500,
        message: 'CLIENT BILL COULD NOT BE CREATED',
    },
    CLIENT_BILL_CREATION_FIELDS_MISSING: {
        status: 500,
        message: 'PLEASE ENTER ALL THE FIELDS',
    },
    CLIENT_BILL_CREATED: {
        status: 201,
        message: 'CLIENT BILL CREATED SUCCESSFULLY',
    },
    CLIENT_BILL_CANT_BE_UPDATED: {
        status: 500,
        message: 'CLIENT BILL CANT BE UPDATED SUCCESSFULLY',
    },
    CLIENT_BILL_UPDATED: {
        status: 200,
        message: 'CLIENT BILL UPDATED SUCCESSFULLY',
    },
};
