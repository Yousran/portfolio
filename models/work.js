import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js';
import File from './file.js';

class Work extends Model {}

Work.init({
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  picture: DataTypes.INTEGER,
  link: DataTypes.STRING,
  show: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
}, {
  sequelize,
  modelName: 'Work',
});

Work.belongsTo(File, {
  foreignKey: 'picture',
  as: 'File'
});

export default Work;