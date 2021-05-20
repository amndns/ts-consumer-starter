import { EntityRepository, Repository } from 'typeorm';
import Notification from '../models/notification.model';
import { NotificationsUpdateRequest } from '../models/notifications.backend-model';

@EntityRepository(Notification)
class NotificationsRepository extends Repository<Notification> {
  public async updateNotification(
    idempotencyToken: string,
    request: NotificationsUpdateRequest
  ): Promise<Notification> {
    const { deliveryStatus = null, httpStatusCode = null } = request;
    const notification = await this.findOne({
      idempotencyToken,
    });
    if (!notification) {
      throw new Error(
        `Notification with ID: ${idempotencyToken} does not exist.`
      );
    }

    this.merge(notification, {
      ...(deliveryStatus ? { deliveryStatus } : {}),
      ...(httpStatusCode ? { httpStatusCode } : {}),
    });

    return this.save(notification);
  }
}

export default NotificationsRepository;
