'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nickName: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      companyOrSchool: {
        type: Sequelize.STRING
      },
      gpuNum: {
        type: Sequelize.INTEGER
      },
      pid: {
        type: Sequelize.INTEGER
      },
      platSyncFrom: {
        type: Sequelize.INTEGER
      },
      userCode: {
        type: Sequelize.STRING
      },
      userType: {
        type: Sequelize.INTEGER
      },
      nodeMaxCount: {
        type: Sequelize.INTEGER
      },
      harborUserState: {
        type: Sequelize.STRING
      },
      markUserState: {
        type: Sequelize.STRING
      },
      registerInfo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};