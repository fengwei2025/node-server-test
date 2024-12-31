'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    nickName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    sex: DataTypes.STRING,
    companyOrSchool: DataTypes.STRING,
    gpuNum:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'gpu数量',
    },
    pid: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '父id',
    },
    platSyncFrom: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '平台同步来源',
    },
    userCode: DataTypes.STRING,
    userType: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '用户类型',
    },
    nodeMaxCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '节点最大数量',
    },
    harborUserState: DataTypes.STRING,
    markUserState: DataTypes.STRING,
    registerInfo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
