import { Expose } from 'class-transformer';
import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export const CALLBACK_DETAILS_GET_REQUEST_VALIDATION = {
  NOT_EMPTY: {
    message: 'Must have field customer_id.',
  },
};

export class CallbackDetailsResult {
  @Expose({ name: 'callback_key' })
  @IsNotEmpty()
  public callbackKey: string;

  @IsNotEmpty()
  public url: string;
}

export class CallbackDetailsGetFilter {
  @ArrayNotEmpty(CALLBACK_DETAILS_GET_REQUEST_VALIDATION.NOT_EMPTY)
  public customerId: string;

  public notificationTypeId: string;
}
