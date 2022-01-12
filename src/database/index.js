import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Account from '../models/Account';
import Income from '../models/Income';
import Cost from '../models/Cost';

const models = [Account, Income, Cost];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);
