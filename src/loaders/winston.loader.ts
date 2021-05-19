import { configure, format, transports } from 'winston';
import { Environment, logEnv, nodeEnv } from '../config';

const winstonLoader = (): void => {
  const { level } = logEnv;

  configure({
    transports: [
      new transports.Console({
        level,
        handleExceptions: true,
        format:
          nodeEnv !== Environment.DEVELOPMENT
            ? format.combine(format.json())
            : format.combine(format.colorize(), format.simple()),
      }),
    ],
  });
};

export default winstonLoader;
