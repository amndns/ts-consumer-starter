import {
  CallbackDetailsGetFilter,
  CallbackDetailsResult,
} from '../../../../../src/consumers/callback/models/callback.backend-model';

class CallbackDetailsManagerMock {
  public one: CallbackDetailsResult;

  public getCallbackDetailsMock = jest.fn();

  public async getCallbackDetails(
    filter: CallbackDetailsGetFilter
  ): Promise<CallbackDetailsResult> {
    this.getCallbackDetailsMock(filter);
    return Promise.resolve(this.one);
  }
}

export default CallbackDetailsManagerMock;
