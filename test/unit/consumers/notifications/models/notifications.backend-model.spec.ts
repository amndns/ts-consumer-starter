import { validate } from 'class-validator';
import {
  NotificationConsumerPayload,
  NotificationWebhookPayload,
} from '../../../../../src/consumers/notifications/models/notifications.backend-model';

describe('NotificationConsumerPayload', () => {
  it('Should fail the validation when fields are invalid', async (done) => {
    const consumerMessage = new NotificationConsumerPayload();

    const actualErrors = await validate(
      consumerMessage
    ).then((validationErrors) =>
      validationErrors.map((validationError) => validationError.constraints)
    );

    const expectedErrors = [{ isNotEmpty: 'data should not be empty' }];

    expect(actualErrors).toStrictEqual(expectedErrors);
    done();
  });

  it('Should succeed the validation when fields are valid', async (done) => {
    const consumerMessage = new NotificationConsumerPayload();
    consumerMessage.data = {
      action: 'create_payment',
      payment_status: 'success',
    };
    consumerMessage.customerId = '1';

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

    const expectedErrors = [{ isNotEmpty: 'customerId should not be empty' }];

    expect(actualErrors).toStrictEqual(expectedErrors);
    done();
  });

  it('Should succeed the validation when fields are valid', async (done) => {
    const messagesNotification = new NotificationWebhookPayload();
    messagesNotification.customerId = '1';

    const errors = await validate(messagesNotification);

    expect(errors).toStrictEqual([]);
    done();
  });
});
