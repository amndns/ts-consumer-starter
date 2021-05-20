import * as path from 'path';
import {
  getOsEnv,
  getOsEnvOptional,
  getOsEnvArray,
  getOsPaths,
  getOsPath,
} from '@amndns/service-utils/env';
import { toBool, toNumber } from '@amndns/service-utils/ts';
import * as dotenv from 'dotenv';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export enum Environment {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  TEST = 'test',
}

export const nodeEnv = process.env.NODE_ENV || Environment.DEVELOPMENT;

export const appEnv = {
  name: getOsEnv('APP_NAME'),
};

export const dbEnv = {
  type: getOsEnv('TYPEORM_CONNECTION'),
  master: {
    host: getOsEnv('DB_MASTER_HOST'),
    port: toNumber(getOsEnv('DB_MASTER_PORT')),
  },
  numSlaves: toNumber(getOsEnv('DB_NUM_SLAVES')),
  slaves: Array(toNumber(getOsEnv('DB_NUM_SLAVES')))
    .fill(0)
    .map((_, i) => {
      const [host, port] = getOsEnvArray(`DB_SLAVE_${i}`);
      return {
        host,
        port: toNumber(port),
      };
    }),
  username: getOsEnv('DB_USERNAME'),
  password: getOsEnv('DB_PASSWORD'),
  database: getOsEnv('DB_DATABASE'),
  logging: getOsEnvArray('TYPEORM_LOGGING'),
  synchronize: toBool(getOsEnvOptional('TYPEORM_SYNCHRONIZE')),
};

export const dirsEnv = {
  entities: getOsPaths('TYPEORM_ENTITIES'),
  migrations: getOsPaths('TYPEORM_MIGRATIONS'),
  migrationsDir: getOsPath('TYPEORM_MIGRATIONS_DIR', false),
  consumers: getOsPath('RABBIT_CONSUMERS'),
};

export const logEnv = {
  level: getOsEnv('LOG_LEVEL'),
  json: toBool(getOsEnvOptional('LOG_JSON')),
  output: getOsEnv('LOG_OUTPUT'),
};

export const rabbitmqEnv = {
  host: getOsEnv('RABBIT_HOST'),
  port: toNumber(getOsEnv('RABBIT_PORT')),
  username: getOsEnv('RABBIT_USERNAME'),
  password: getOsEnv('RABBIT_PASSWORD'),
};

export const redisEnv = {
  numNodes: toNumber(getOsEnv('REDIS_NUM_NODES')),
  nodes: Array(toNumber(getOsEnv('REDIS_NUM_NODES')))
    .fill(0)
    .map((_, i) => {
      const [host, port] = getOsEnvArray(`REDIS_NODE_${i}`);
      return {
        host,
        port: toNumber(port),
      };
    }),
  options: {
    redisOptions: {
      password: getOsEnv('REDIS_PASSWORD'),
    },
    scaleReads: getOsEnv('REDIS_SCALE_READS'),
  },
};

export const notificationsEnv = {
  createPayment: {
    exchange: 'notifications',
    queue: 'create_payment.queue',
    routingKey: 'create_payment.key',
    deadLetterOptions: {
      deadLetterExchange: 'notifications',
      deadLetterQueue: 'create_payment.dead.queue',
      deadLetterRoutingKey: 'create_payment.dead.key',
      messageTtl: 5000,
    },
  },
  refund: {
    exchange: 'notifications',
    queue: 'refund.queue',
    routingKey: 'refund.key',
    deadLetterOptions: {
      deadLetterExchange: 'notifications',
      deadLetterQueue: 'refund.dead.queue',
      deadLetterRoutingKey: 'refund.dead.key',
      messageTtl: 5000,
    },
  },
  linkAccount: {
    exchange: 'notifications',
    queue: 'link_account.queue',
    routingKey: 'link_account.key',
    deadLetterOptions: {
      deadLetterExchange: 'notifications',
      deadLetterQueue: 'link_account.dead.queue',
      deadLetterRoutingKey: 'link_account.dead.key',
      messageTtl: 5000,
    },
  },
};
