import { Exclude, Expose } from 'class-transformer';
import { notificationMessage } from '../../../src/utils';

class SampleMessage {
  @Expose({ name: 'string_data', toPlainOnly: true })
  public stringData: string;

  @Exclude()
  public sensitiveData: string;
}

describe('utils/utils', () => {
  describe('notificationMessage', () => {
    it('Should transform the notification message based on transformer decorators', async (done) => {
      const transformedMessage = await notificationMessage(SampleMessage, {
        stringData: 'test',
        sensitiveData: 'token',
      });
      const expectedMessage = {
        string_data: 'test',
      };

      expect(transformedMessage).toStrictEqual(expectedMessage);
      done();
    });
  });
});
