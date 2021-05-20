import { validate } from 'class-validator';
import { DeliveryStatus } from '../../../../../src/consumers/notifications/models/notification.model';
import {
  NotificationConsumerPayload,
  NotificationWebhookPayload,
  NotificationsUpdateRequest,
} from '../../../../../src/consumers/notifications/models/notifications.backend-model';

describe('NotificationConsumerPayload', () => {
  it('Should fail the validation when fields are invalid', async (done) => {
    const consumerMessage = new NotificationConsumerPayload();

    const actualErrors = await validate(
      consumerMessage
    ).then((validationErrors) =>
      validationErrors.map((validationError) => validationError.constraints)
    );

    const expectedErrors = [
      { isNotEmpty: 'idempotencyToken should not be empty' },
      { isNotEmpty: 'data should not be empty' },
    ];

    expect(actualErrors).toStrictEqual(expectedErrors);
    done();
  });

  it('Should succeed the validation when fields are valid', async (done) => {
    const consumerMessage = new NotificationConsumerPayload();
    consumerMessage.idempotencyToken = '1';
    consumerMessage.data = {
      action: 'create_payment',
      payment_status: 'success',
    };
    consumerMessage.customerId = '1';
    consumerMessage.notificationTypeId = '1';
    consumerMessage.deliveryStatus = DeliveryStatus.PENDING;
    consumerMessage.dateCreated = new Date('2021');

    const errors = await validate(consumerMessage);

    expect(errors).toStrictEqual([]);
    done();
  });
});

describe('NotificationWebhookPayload', () => {
  it('Should fail the validation when fields are invalid', async (done) => {
    const messagesNotification = new NotificationWebhookPayload();

    const actualErrors = await validate(
      messagesNotification
    ).then((validationErrors) =>
      validationErrors.map((validationError) => validationError.constraints)
    );

    const expectedErrors = [
      { isNotEmpty: 'customerId should not be empty' },
      { isNotEmpty: 'notificationTypeId should not be empty' },
      { isNotEmpty: 'dateCreated should not be empty' },
    ];

    expect(actualErrors).toStrictEqual(expectedErrors);
    done();
  });

  it('Should succeed the validation when fields are valid', async (done) => {
    const messagesNotification = new NotificationWebhookPayload();
    messagesNotification.customerId = '1';
    messagesNotification.notificationTypeId = '2';
    messagesNotification.dateCreated = new Date('2021');

    const errors = await validate(messagesNotification);

    expect(errors).toStrictEqual([]);
    done();
  });
});

describe('NotificationsUpdateRequest', () => {
  it('Should fail the validation when fields are invalid', async (done) => {
    const notificationUpdate = new NotificationsUpdateRequest();

    const actualErrors = await validate(
      notificationUpdate
    ).then((validationErrors) =>
      validationErrors.map((validationError) => validationError.constraints)
    );

    const expectedErrors = [];

    expect(actualErrors).toStrictEqual(expectedErrors);
    done();
  });

  it('Should succeed the validation when fields are valid', async (done) => {
    const notificationUpdate = new NotificationsUpdateRequest();
    notificationUpdate.deliveryStatus = DeliveryStatus.SUCCESS;
    notificationUpdate.httpStatusCode = 200;

    const errors = await validate(notificationUpdate);

    expect(errors).toStrictEqual([]);
    done();
  });
});
