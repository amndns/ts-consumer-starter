import { WinstonLogger } from '@amndns/service-utils/logger';
import { createConnection, LoggerOptions } from 'typeorm';
import { dbEnv, dirsEnv } from '../config';

const typeormLoader = async (): Promise<void> => {
  const logger = new WinstonLogger(__filename);

  const {
    type,
    master,
    numSlaves,
    slaves,
    username,
    password,
    database,
    logging,
    synchronize,
  } = dbEnv;
  const { entities, migrations, migrationsDir } = dirsEnv;

  const connection =
    numSlaves > 0
      ? {
          replication: {
            master: {
              host: master.host,
              port: master.port,
              username,
              password,
              database,
            },
            slaves: slaves.map(({ host, port }) => ({
              host,
              port,
              username,
              password,
              database,
            })),
          },
        }
      : {
          host: master.host,
          port: master.port,
          username,
          password,
          database,
        };

  createConnection({
    type: type as any,
    entities,
    migrations,
    logging: logging as LoggerOptions,
    synchronize,
    cli: {
      migrationsDir,
    },
    ...connection,
  })
    .then(() => {
      logger.info(
        `Connected to master database at ${master.host}:${master.port}.`
      );
      if (numSlaves > 0) {
        slaves.forEach(({ host, port }) => {
          logger.info(`Connected to slave database at ${host}:${port}.`);
        });
      }
    })
    .catch((error) => logger.error(error));
};

export default typeormLoader;
