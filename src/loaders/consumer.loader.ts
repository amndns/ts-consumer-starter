import path from 'path';
import { WinstonLogger } from '@amndns/service-utils/logger';

const consumerLoader = async (args: string[]): Promise<void> => {
  const logger = new WinstonLogger(__filename);

  if (args.length !== 3) {
    logger.error(`Arguments passed to node is invalid.`);
    return;
  }

  const filename = args[2];
  const consumer = (await import(filename)).default;

  try {
    consumer.run();
    logger.info(`Consumer from ${path.basename(filename)} is activated.`);
  } catch (error) {
    logger.error(`Consumer from ${path.basename(filename)} failed to start.`);
  }
};

export default consumerLoader;
