import { NotificationWebhookPayload } from '../../../../../src/consumers/notifications/models/notifications.backend-model';
import NotificationsService from '../../../../../src/consumers/notifications/services/notifications.service';

describe('NotificationsService', () => {
  const notificationsService = new NotificationsService();

  describe('sendWebhookNotification', () => {
    it('Should send the webhook notification to the subscriber', async (done) => {
      const notificationWebhookPayload = new NotificationWebhookPayload();
      notificationWebhookPayload.data = {
        action: 'create_payment',
        payment_status: 'success',
      };
      notificationWebhookPayload.customerId = '1';

      await notificationsService.sendWebhookNotification(
        'https://reqres.in/',
        notificationWebhookPayload
      );

      done();
    });
  });
});
