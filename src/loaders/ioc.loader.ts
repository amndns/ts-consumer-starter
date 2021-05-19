import { useContainer as classValidatorUseContainer } from 'class-validator';
import { useContainer as ormUseContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

/**
 * Setup TypeORM to use TypeDI container.
 */
const iocLoader = (): void => {
  ormUseContainer(Container);
  classValidatorUseContainer(Container);
};

export default iocLoader;
