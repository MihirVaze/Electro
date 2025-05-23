'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('State', [
      {
        id: 'e2a62af6-aa9c-4c6a-9e67-69e4128939a6',
        name: 'Maharashtra',
        isDeleted: false,
        deletedBy: null,
        restoredBy: null,
        createdBy: null,
        updatedBy: null,
        deletedAt: null,
        restoredAt: null
      },
      {
        id: '8e11968f-0c7d-46bd-beb2-beb6c0ac22d4',
        name: 'Madhya Pradesh',
        isDeleted: false,
        deletedBy: null,
        restoredBy: null,
        createdBy: null,
        updatedBy: null,
        deletedAt: null,
        restoredAt: null
      },
    ], {});

    await queryInterface.bulkInsert('District', [
      {
        id: 'b59686a2-51d8-4cef-b97d-5c7228d0c8e7',
        name: 'Pune',
        stateId: 'e2a62af6-aa9c-4c6a-9e67-69e4128939a6',
        isDeleted: false,
        deletedBy: null,
        restoredBy: null,
        createdBy: null,
        updatedBy: null,
        deletedAt: null,
        restoredAt: null
      },
      {
        id: '4bcc200b-d93a-43c5-8e8d-d699ba8d47f4',
        name: 'Nagpur',
        stateId: 'e2a62af6-aa9c-4c6a-9e67-69e4128939a6',
        isDeleted: false,
        deletedBy: null,
        restoredBy: null,
        createdBy: null,
        updatedBy: null,
        deletedAt: null,
        restoredAt: null
      },
      {
        id: '01663b6a-edb9-4708-b104-0bc60eabb43a',
        name: 'Indore',
        stateId: '8e11968f-0c7d-46bd-beb2-beb6c0ac22d4',
        isDeleted: false,
        deletedBy: null,
        restoredBy: null,
        createdBy: null,
        updatedBy: null,
        deletedAt: null,
        restoredAt: null
      },
      {
        id: 'f06975ef-27e1-4954-a338-21a2ebba20a3',
        name: 'Ujjain',
        stateId: '8e11968f-0c7d-46bd-beb2-beb6c0ac22d4',
        isDeleted: false,
        deletedBy: null,
        restoredBy: null,
        createdBy: null,
        updatedBy: null,
        deletedAt: null,
        restoredAt: null
      },
    ], {});

    await queryInterface.bulkInsert('City', [
      {
        id: 'aed733c9-8a69-47d6-8deb-85e89e7845cf',
        name: 'Vadgaon',
        districtId: 'b59686a2-51d8-4cef-b97d-5c7228d0c8e7',
        isDeleted: false,
        deletedBy: null,
        restoredBy: null,
        createdBy: null,
        updatedBy: null,
        deletedAt: null,
        restoredAt: null
      },
      {
        id: 'b908613b-5c87-4d44-a8ad-3202ddbd8d01',
        name: 'Lonavala',
        districtId: 'b59686a2-51d8-4cef-b97d-5c7228d0c8e7',
        isDeleted: false,
        deletedBy: null,
        restoredBy: null,
        createdBy: null,
        updatedBy: null,
        deletedAt: null,
        restoredAt: null
      },
      {
        id: 'bf7a25c2-c79c-4799-bc16-12a4ae054cf9',
        name: 'Kamptee',
        districtId: '4bcc200b-d93a-43c5-8e8d-d699ba8d47f4',
        isDeleted: false,
        deletedBy: null,
        restoredBy: null,
        createdBy: null,
        updatedBy: null,
        deletedAt: null,
        restoredAt: null
      },
      {
        id: 'eba43e9d-88d7-4cb2-b9d1-4c4e1697a082',
        name: 'Hingna',
        districtId: '4bcc200b-d93a-43c5-8e8d-d699ba8d47f4',
        isDeleted: false,
        deletedBy: null,
        restoredBy: null,
        createdBy: null,
        updatedBy: null,
        deletedAt: null,
        restoredAt: null
      },
      {
        id: '7a43a9b7-64bd-4cff-90ef-08dc7b349716',
        name: 'Sanwer',
        districtId: '01663b6a-edb9-4708-b104-0bc60eabb43a',
        isDeleted: false,
        deletedBy: null,
        restoredBy: null,
        createdBy: null,
        updatedBy: null,
        deletedAt: null,
        restoredAt: null
      },
      {
        id: 'faef4c67-2e27-434f-b7f9-92781dd6de17',
        name: 'Pithampur',
        districtId: '01663b6a-edb9-4708-b104-0bc60eabb43a',
        isDeleted: false,
        deletedBy: null,
        restoredBy: null,
        createdBy: null,
        updatedBy: null,
        deletedAt: null,
        restoredAt: null
      },
      {
        id: 'a20cc72a-007b-47a0-bdfe-893628ea810e',
        name: 'Barnagar',
        districtId: 'f06975ef-27e1-4954-a338-21a2ebba20a3',
        isDeleted: false,
        deletedBy: null,
        restoredBy: null,
        createdBy: null,
        updatedBy: null,
        deletedAt: null,
        restoredAt: null
      },
      {
        id: 'c2b36860-3b22-4d0c-8759-b72faa6d7c22',
        name: 'Mahidpur',
        districtId: 'f06975ef-27e1-4954-a338-21a2ebba20a3',
        isDeleted: false,
        deletedBy: null,
        restoredBy: null,
        createdBy: null,
        updatedBy: null,
        deletedAt: null,
        restoredAt: null
      },
    ], {});
  },
  
  async down(queryInterface) {
    await queryInterface.bulkDelete('City', null, {});
    await queryInterface.bulkDelete('District', null, {});
    await queryInterface.bulkDelete('State', null, {});
  }
};
