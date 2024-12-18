import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js';
import File from './file.js';

class Experience extends Model {}

Experience.init({
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
  modelName: 'Experience',
});

Experience.belongsTo(File, {
  foreignKey: 'picture',
  as: 'File'
});

export default Experience;