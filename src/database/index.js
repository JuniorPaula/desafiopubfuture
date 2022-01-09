import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Account from '../models/Account';
import Income from '../models/Income';

const models = [Account, Income];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);
