'use strict';

import Sequelize from 'sequelize';
import config from '../config/config.json';
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
console.log('env:', env);
const sequelizeConfig = config[env];

const sequelize = new Sequelize(sequelizeConfig);

export default sequelize;