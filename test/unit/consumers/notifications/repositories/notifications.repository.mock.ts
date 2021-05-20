import Notification from '../../../../../src/consumers/notifications/models/notification.model';
import { NotificationsUpdateRequest } from '../../../../../src/consumers/notifications/models/notifications.backend-model';

class NotificationsRepositoryMock {
  public one: Notification;

  public updateNotificationMock = jest.fn();

  public async updateNotification(
    idempotencyToken: string,
    request: NotificationsUpdateRequest
  ): Promise<Notification> {
    this.updateNotificationMock(idempotencyToken, request);
    return Promise.resolve(this.one);
  }
}

export default NotificationsRepositoryMock;
