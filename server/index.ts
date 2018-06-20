import * as express from 'express';
import { initializeRoutes } from './routes';

const app = express();
const port = process.env.PORT || 4000;

initializeRoutes(app);

function runOnPort() {
  console.log('Server running on port:' + port);
  return port;
}

const server = app.listen(runOnPort());
