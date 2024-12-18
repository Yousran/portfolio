import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js';
import File from './file.js';

class Education extends Model {}

Education.init({
  date: DataTypes.DATE,
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  picture: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true
  },
  show: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
}, {
  sequelize,
  modelName: 'Education',
});

Education.belongsTo(File, {
  foreignKey: 'picture',
  as: 'File'
});

export default Education;