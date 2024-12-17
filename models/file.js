import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js';

class File extends Model {}

File.init({
  path: DataTypes.STRING,
  tiny_path: DataTypes.STRING,
  original_name: DataTypes.STRING
}, {
  sequelize,
  modelName: 'File',
});

export default File;