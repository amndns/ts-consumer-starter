import { validate } from 'class-validator';
import {
  ConsumerMessage,
  MessagesCreateStatus,
  MessagesNotification,
} from '../../../../../src/notifications/messages/models/messages.backend-model';

describe('ConsumerMessage', () => {
  it('Should fail the validation when fields are invalid', async (done) => {
    const consumerMessage = new ConsumerMessage();

    const actualErrors = await validate(
      consumerMessage
    ).then((validationErrors) =>
      validationErrors.map((validationError) => validationError.constraints)
    );

    const expectedErrors = [
      {
        isNotEmpty: 'senderUserId should not be empty',
        isNumberString: 'senderUserId must be a number string',
      },
      {
        isNotEmpty: 'receiverUserId should not be empty',
        isNumberString: 'receiverUserId must be a number string',
      },
      { isNotEmpty: 'content should not be empty' },
    ];

    expect(actualErrors).toStrictEqual(expectedErrors);
    done();
  });

  it('Should succeed the validation when fields are valid', async (done) => {
    const consumerMessage = new ConsumerMessage();
    consumerMessage.senderUserId = '1';
    consumerMessage.receiverUserId = '2';
    consumerMessage.content = 'Test content';

    const errors = await validate(consumerMessage);

    expect(errors).toStrictEqual([]);
    done();
  });
});

describe('MessagesNotification', () => {
  it('Should fail the validation when fields are invalid', async (done) => {
    const messagesNotification = new MessagesNotification();

    const actualErrors = await validate(
      messagesNotification
    ).then((validationErrors) =>
      validationErrors.map((validationError) => validationError.constraints)
    );

    const expectedErrors = [{ isNotEmpty: 'status should not be empty' }];

    expect(actualErrors).toStrictEqual(expectedErrors);
    done();
  });

  it('Should succeed the validation when fields are valid', async (done) => {
    const consumerMessage = new ConsumerMessage();
    consumerMessage.senderUserId = '1';
    consumerMessage.receiverUserId = '2';
    consumerMessage.content = 'Test content';

    const messagesNotification = new MessagesNotification();
    messagesNotification.data = consumerMessage;
    messagesNotification.status = MessagesCreateStatus.SUCCESS;
    messagesNotification.callbackAuthenticationToken = 'xyz123';

    const errors = await validate(messagesNotification);

    expect(errors).toStrictEqual([]);
    done();
  });
});
