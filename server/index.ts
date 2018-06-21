import * as express from 'express';
import { initializeRoutes } from './routes';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

initializeRoutes(app);

function runOnPort() {
  console.log('Server running on port:' + port);
  return port;
}

const server = app.listen(runOnPort());
