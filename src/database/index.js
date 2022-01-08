import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Account from '../models/Account';

const models = [Account];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
