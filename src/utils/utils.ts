import {
  ClassConstructor,
  classToPlain,
  plainToClass,
} from 'class-transformer';
import { validate } from 'class-validator';

/**
 * Converts a notification message into a request JS object. This also validates
 * the request object.
 */
export async function notificationMessage<T>(
  cls: ClassConstructor<unknown>,
  notification?: T
): Promise<T> {
  const transformedNotification = plainToClass(cls, notification);

  const errors = await validate(transformedNotification as any);
  if (errors.length > 1) {
    throw new Error(`Invalid notification message request shape.`);
  }

  return classToPlain(transformedNotification) as T;
}
