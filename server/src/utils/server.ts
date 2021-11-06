import cors from 'cors';
import router from '@src/router';
import express from 'express';

function createServer() {
  const config = {
    origin: 'http://localhost:3000',
  };

  const app = express();
  app.use(cors(config));
  app.use(express.json());
  app.use(router);
  return app;
}

export default createServer;
