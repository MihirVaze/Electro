export const CUSTOMER_BILL_RESPONSES = {
    BILL_NOT_FOUND: {
        status: 404,
        message: 'BILL NOT FOUND',
    },
    BILL_CREATION_FAILED: {
        status: 500,
        message: 'BILL COULD NOT BE CREATED',
    },
    BILL_CREATION_FIELDS_MISSING: {
        status: 400,
        message: 'PLEASE ENTER ALL REQUIRED FIELDS',
    },
    BILL_CREATED: {
        status: 201,
        message: 'BILL GENERATED SUCCESSFULLY',
    },
    BILL_DELETION_FAILED: {
        status: 500,
        message: 'BILL COULD NOT BE DELETED',
    },
    BILL_DELETED: {
        status: 200,
        message: 'BILL DELETED SUCCESSFULLY',
    },
    BILL_UPDATION_FAILED: {
        status: 500,
        message: 'BILL COULD NOT BE UPDATED',
    },
    BILL_UPDATED: {
        status: 200,
        message: 'BILL UPDATED SUCCESSFULLY',
    },
    BILL_PAYMENT_FAILED: {
        status: 500,
        message: 'BILL PAYMENT FAILED',
    },
    BILL_PAID: {
        status: 200,
        message: 'BILL PAID SUCCESSFULLY',
    },
};
