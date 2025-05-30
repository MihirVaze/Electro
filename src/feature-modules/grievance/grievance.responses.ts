export const GRIEVANCE_RESPONSES = {
    GRIEVANCE_NOT_FOUND: {
        status: 404,
        message: 'GRIEVANCE NOT FOUND',
    },
    GRIEVANCE_CREATION_FAILED: {
        status: 500,
        message: 'GRIEVANCE COULD NOT BE CREATED',
    },
    GRIEVANCE_CREATION_FIELDS_MISSING: {
        status: 500,
        message: 'PLEASE ENTER ALL THE FIELDS',
    },
    GRIEVANCE_CREATED: {
        status: 201,
        message: 'GRIEVANCE CREATED SUCCESSFULLY',
    },
    GRIEVANCE_DELETION_FAILED: {
        status: 500,
        message: 'GRIEVANCE COULD NOT BE DELETED',
    },
    GRIEVANCE_DELETED: {
        status: 200,
        message: 'GRIEVANCE DELETED SUCCESSFULLY',
    },
    GRIEVANCE_UPDATION_FAILED: {
        status: 500,
        message: 'GRIEVANCE COULD NOT BE UPDATED',
    },
    GRIEVANCE_UPDATED: {
        status: 200,
        message: 'GRIEVANCE UPDATED SUCCESSFULLY',
    },
    GRIEVANCE_ASSIGNED: {
        status: 200,
        message: 'GRIEVANCE ASSIGNED SUCCESSFULLY',
    },
    GRIEVANCE_ESCALATED: {
        status: 200,
        message: 'GRIEVANCE ESCALATED SUCCESSFULLY',
    },
    GRIEVANCE_ESCALATION_NOT_ALLOWED: {
        status: 200,
        message: 'GRIEVANCE ESCALATION NOT ALLOWED',
    },
};
