import { Message, RabbitConsumer } from '@amndns/amqp-ts';
import { Container } from 'typedi';
import { rabbitmqEnv, notificationsEnv } from '../../../config';
import NotificationsController from '../controllers/notifications.controller';

const config = {
  ...rabbitmqEnv,
  ...notificationsEnv.linkAccount,
};

const callback = (notification: Message): void => {
  const notificationsController = Container.get(NotificationsController);
  notificationsController.processMessage(notification);
};

const linkAccountConsumer = new RabbitConsumer(config, callback);
export default linkAccountConsumer;
