'use strict';

import Sequelize from 'sequelize';
import config from '../config/config.json';

const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[env];

const sequelize = new Sequelize(sequelizeConfig);

export default sequelize;