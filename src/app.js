import 'dotenv/config';
import './database';
import express from 'express';
import accountRoutes from './routes/accountRoutes';
import incomeRoutes from './routes/incomeRoutes';
import costRoutes from './routes/costRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/accounts', accountRoutes);
    this.app.use('/incomes', incomeRoutes);
    this.app.use('/costs', costRoutes);
  }
}

export default new App().app;
