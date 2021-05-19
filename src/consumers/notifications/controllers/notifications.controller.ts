import { consumerMessage, Message } from '@amndns/amqp-ts';
import { Logger, LoggerInterface } from '@amndns/service-utils/logger';
import { Service } from 'typedi';
import { notificationMessage } from '../../../utils';
import { DeliveryStatus } from '../models/notification.model';
import {
  NotificationConsumerPayload,
  NotificationWebhookPayload,
} from '../models/notifications.backend-model';
import NotificationsService from '../services/notifications.service';

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
      if (deadQueue.count > 10) {
        this.logger.info(
          `Dropped the notification with ID: ${consumedNotification.idempotencyToken} because it exceeded the retry limit.`
        );
        message.ack();
      }
    }

    const transformedNotification = await notificationMessage(
      NotificationWebhookPayload,
      consumedNotification
    );

    try {
      await this.notificationsService.sendWebhookNotification(
        consumedNotification.idempotencyToken,
        consumedNotification.customerId,
        consumedNotification.notificationTypeId,
        transformedNotification
      );

      this.logger.info(
        `Processed message: ${JSON.stringify(message.getContent())}`
      );
      message.ack();
    } catch (error) {
      this.logger.error(error);
      this.notificationsService.updateNotification(
        consumedNotification.idempotencyToken,
        {
          deliveryStatus: DeliveryStatus.FAILURE,
          httpStatusCode: error.response.status ?? null,
        }
      );
      message.reject();
    }
  }
}

export default NotificationsController;