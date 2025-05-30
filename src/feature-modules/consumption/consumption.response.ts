export const CONSUMPTION_RESPONSES = {
    BAD_REQUEST: {
        status: 400,
        message: 'Please Fill All The Neccessary Details',
    },
    CREATION_FAILS: {
        status: 500,
        message: 'Internal Server Error',
    },
    CONSUMPTION_CREATED: {
        status: 201,
        message: 'UI Successfully Added',
    },
    CONSUMPTION_NOT_FOUND: {
        status: 404,
        message: 'UI Not Found For Given Id',
    },
    CONSUMPTION_UPDATED: {
        status: 200,
        message: 'UI Updated Of The Client',
    },
    CONSUMPTION_DELETED:{
        status:200,
        message:"UI deleted Successfully"
    }
};
