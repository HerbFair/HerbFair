import crypto from 'crypto';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import context from 'express-http-context';
import clusterize from '@sliit-foss/clusterizer';
import { moduleLogger } from '@sliit-foss/module-logger';
import { correlationId } from './utils';
import { errorHandler, responseInterceptor } from './middleware';
import config from './config';
import routes from './routes';

const logger = moduleLogger('Server');

clusterize(
  () => {
    const app = express();

    app.use(helmet());
    app.use(compression());
    app.use(cors());

    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true }));

    app.use(context.middleware);

    app.use((req, _res, next) => {
      context.set('correlationId', req.headers[correlationId] ?? crypto.randomBytes(16).toString('hex'));
      next();
    });

    app.use(`/api/service-name`, routes);

    app.use(responseInterceptor);

    app.use(errorHandler);

    app.listen(config.PORT, config.HOST, () => {
      logger.info(`Payment service listening on ${config.HOST}:${config.PORT}`);
    });
  },
  { logger },
);
