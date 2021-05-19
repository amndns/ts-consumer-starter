import 'reflect-metadata';

import consumerLoader from './loaders/consumer.loader';
import iocLoader from './loaders/ioc.loader';
import typeormLoader from './loaders/typeorm.loader';
import winstonLoader from './loaders/winston.loader';

const appConsumerLoader = async () => {
  winstonLoader();
  iocLoader();
  await typeormLoader();
  consumerLoader(process.argv);
};

appConsumerLoader();
