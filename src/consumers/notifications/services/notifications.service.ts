import axios from 'axios';
import { Service } from 'typedi';
import { NotificationWebhookPayload } from '../models/notifications.backend-model';

@Service()
class NotificationsService {
  public async sendWebhookNotification(
    url: string,
    notificationPayload: NotificationWebhookPayload
  ): Promise<void> {
    await axios.post(url, notificationPayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default NotificationsService;
