import concurrently from 'concurrently';
import glob from 'glob';
import { dirsEnv } from './config';

const { consumers } = dirsEnv;

glob(consumers, (error, filenames) => {
  if (error) {
    return;
  }

  const commands = filenames.map(
    (filename) => `node dist/app-consumer.js ${filename}`
  );

  concurrently(commands, {
    prefix: 'name',
    killOthers: ['failure', 'success'],
    restartTries: 3,
  }).then(
    () => process.exit(),
    () => process.exit()
  );
});
