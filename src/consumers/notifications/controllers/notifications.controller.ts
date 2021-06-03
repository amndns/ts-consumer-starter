import { consumerMessage, Message } from '@amndns/amqp-ts';
import { Logger, LoggerInterface } from '@amndns/service-utils/logger';
import { Service } from 'typedi';
import { notificationMessage } from '../../../utils';
import {
  NotificationConsumerPayload,
  NotificationWebhookPayload,
} from '../models/notifications.backend-model';
import NotificationsService from '../services/notifications.service';

const RETRY_LIMIT = 5;

@Service()
class NotificationsController {
  constructor(
    @Logger(__filename) private logger: LoggerInterface,
    private notificationsService: NotificationsService
  ) {}

  public async processMessage(message: Message): Promise<void> {
    const consumedNotification = await consumerMessage<NotificationConsumerPayload>(
      NotificationConsumerPayload,
      message
    );

    if (message.properties.headers['x-death']) {
      const [deadQueue] = message.properties.headers['x-death'];
      if (deadQueue.count > RETRY_LIMIT) {
        this.logger.info(
          `Dropped the notification because it exceeded the retry limit.`
        );
        message.ack();
        return;
      }
    }

    const transformedNotification = await notificationMessage(
      NotificationWebhookPayload,
      consumedNotification
    );

    try {
      await this.notificationsService.sendWebhookNotification(
        'https://reqres.in/api/users',
        transformedNotification
      );

      this.logger.info(
        `Processed message: ${JSON.stringify(message.getContent())}`
      );
      message.ack();
    } catch (error) {
      this.logger.error(error);
      message.reject();
    }
  }
}

export default NotificationsController;
