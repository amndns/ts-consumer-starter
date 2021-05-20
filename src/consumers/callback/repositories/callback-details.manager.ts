import { plainToClass } from 'class-transformer';
import { Service } from 'typedi';
import { getManager } from 'typeorm';
import {
  CallbackDetailsGetFilter,
  CallbackDetailsResult,
} from '../models/callback.backend-model';

@Service()
class CallbackDetailsManager {
  public async getCallbackDetails(
    filter: CallbackDetailsGetFilter
  ): Promise<CallbackDetailsResult> {
    const { customerId, notificationTypeId } = filter;

    const queryResult = await getManager().query(
      `
      SELECT ck.callback_key, cur.url
      FROM customer cu
      INNER JOIN callback_key ck ON cu.pk = ck.customer_pk
      INNER JOIN callback_url cur ON ck.customer_pk = cur.customer_pk
      INNER JOIN notification_type nt ON cur.notification_type_pk = nt.pk
      WHERE cu.id = $1
        AND nt.id = $2
      LIMIT 1
    `,
      [customerId, notificationTypeId]
    );

    return queryResult.length === 0
      ? null
      : plainToClass(CallbackDetailsResult, queryResult[0]);
  }
}

export default CallbackDetailsManager;
