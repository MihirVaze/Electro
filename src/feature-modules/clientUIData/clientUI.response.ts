export const UI_RESPONSES = {
    BAD_REQUEST: {
        status: 400,
        message: 'PLEASE FILL ALL THE NECCESSARY DETAILS',
    },
    UI_CREATION_FAILS: {
        status: 500,
        message: 'INTERNAL SERVER ERROR',
    },
    UI_CREATED: {
        status: 201,
        message: 'UI SUCCESSFULLY ADDED',
    },
    UI_NOT_FOUND: {
        status: 404,
        message: 'UI NOT FOUND FOR GIVEN ID',
    },
    UI_UPDATED: {
        status: 200,
        message: 'UI UPDATED OF THE CLIENT',
    },
    UI_DELETED: {
        status: 200,
        message: 'UI DELETED SUCCESSFULLY',
    },
};
