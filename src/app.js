import dotenv from 'dotenv';

dotenv.config();

import './database';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import userRoutes from './routes/userRoutes';
import deliveryRoutes from './routes/deliveryRoutes';

const whiteList = [
  process.env.URL_APP,
];

const corsOptions = {
  origin(origin, callBack) {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callBack(null, true);
    } else {
      callBack(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/login/', userRoutes);
    this.app.use('/delivery/', deliveryRoutes);
  }
}

export default new App().app;
