'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js';

class User extends Model {
  static associate(models) {
    // define association here
  }
}

User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING
}, {
  sequelize,
  modelName: 'User',
});

export default User;