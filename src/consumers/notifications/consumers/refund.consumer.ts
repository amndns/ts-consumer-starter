import { Message, RabbitConsumer } from '@amndns/amqp-ts';
import { Container } from 'typedi';
import { rabbitmqEnv, notificationsEnv } from '../../../config';
import NotificationsController from '../controllers/notifications.controller';

const config = {
  ...rabbitmqEnv,
  ...notificationsEnv.refund,
};

const callback = (notification: Message): void => {
  const notificationsController = Container.get(NotificationsController);
  notificationsController.processMessage(notification);
};

const refundConsumer = new RabbitConsumer(config, callback);
export default refundConsumer;
