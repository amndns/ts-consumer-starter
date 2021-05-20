import { CallbackDetailsResult } from '../../../../../src/consumers/callback/models/callback.backend-model';
import Notification, {
  DeliveryStatus,
} from '../../../../../src/consumers/notifications/models/notification.model';
import {
  NotificationsUpdateRequest,
  NotificationWebhookPayload,
} from '../../../../../src/consumers/notifications/models/notifications.backend-model';
import NotificationsService from '../../../../../src/consumers/notifications/services/notifications.service';
import CallbackDetailsManagerMock from '../../callback/repositories/callback-details.manager.mock';
import NotificationsRepositoryMock from '../repositories/notifications.repository.mock';

describe('NotificationsService', () => {
  const notificationsRepo = new NotificationsRepositoryMock();
  const callbackDetailsManager = new CallbackDetailsManagerMock();

  const notificationsService = new NotificationsService(
    notificationsRepo as any,
    callbackDetailsManager as any
  );

  describe('updateNotification', () => {
    it('Should update the notification in the DB', async (done) => {
      const notificationsUpdateRequest = new NotificationsUpdateRequest();
      notificationsUpdateRequest.deliveryStatus = DeliveryStatus.SUCCESS;
      notificationsUpdateRequest.httpStatusCode = 200;

      const notification = new Notification();
      notification.idempotencyToken = '1';
      notification.deliveryStatus = DeliveryStatus.SUCCESS;
      notification.httpStatusCode = 200;
      notificationsRepo.one = notification;

      const one = await notificationsService.updateNotification(
        '1',
        notificationsUpdateRequest
      );

      expect(notificationsRepo.updateNotificationMock).toBeCalledWith(
        '1',
        notificationsUpdateRequest
      );
      expect(one).toStrictEqual(notification);
      done();
    });
  });

  describe('sendWebhookNotification', () => {
    it('Should send the webhook notification to the subscriber', async (done) => {
      const notificationWebhookPayload = new NotificationWebhookPayload();
      notificationWebhookPayload.data = {
        action: 'create_payment',
        payment_status: 'success',
      };
      notificationWebhookPayload.customerId = '1';
      notificationWebhookPayload.notificationTypeId = '1';
      notificationWebhookPayload.dateCreated = new Date('2021');

      const notificationsUpdateRequest = new NotificationsUpdateRequest();
      notificationsUpdateRequest.deliveryStatus = DeliveryStatus.SUCCESS;
      notificationsUpdateRequest.httpStatusCode = 200;

      const callbackDetailsResult = new CallbackDetailsResult();
      callbackDetailsResult.callbackKey = '1';
      callbackDetailsResult.url = 'https://reqres.in/';
      callbackDetailsManager.one = callbackDetailsResult;

      await notificationsService.sendWebhookNotification(
        '1',
        '1',
        '1',
        notificationWebhookPayload
      );

      expect(notificationsRepo.updateNotificationMock).toBeCalledWith(
        '1',
        notificationsUpdateRequest
      );
      done();
    });
  });
});
