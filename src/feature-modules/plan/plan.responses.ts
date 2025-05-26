export const PLAN_RESPONSES = {
  PLAN_NOT_FOUND: {
      status: 404,
      message: 'PLAN NOT FOUND'
  },
  PLAN_CREATION_FAILED: {
      status: 500,
      message: 'PLAN COULD NOT BE CREATED'
  },
  PLAN_CREATED: {
      status: 201,
      message: 'PLAN CREATED SUCCESSFULLY'
  },
  PLAN_DELETION_FAILED: {
      status: 500,
      message: 'PLAN COULD NOT BE DELETED'
  },
  PLAN_DELETED: {
      status: 200,
      message: 'PLAN DELETED SUCCESSFULLY'
  },
  PLAN_UPDATION_FAILED: {
      status: 500,
      message: 'PLAN COULD NOT BE UPDATED'
  },
  PLAN_UPDATED: {
      status: 200,
      message: 'PLAN UPDATED SUCCESSFULLY'
  }
};