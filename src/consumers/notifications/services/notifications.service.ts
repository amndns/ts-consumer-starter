import axios from 'axios';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import CallbackDetailsManager from '../../callback/repositories/callback.manager';
import Notification, { DeliveryStatus } from '../models/notification.model';
import {
  NotificationsUpdateRequest,
  NotificationWebhookPayload,
} from '../models/notifications.backend-model';
import NotificationsRepository from '../repositories/notifications.repository';

@Service()
class NotificationsService {
  constructor(
    @InjectRepository()
    private notificationsRepository: NotificationsRepository,
    private callbackManager: CallbackDetailsManager
  ) {}

  public updateNotification(
    idempotencyToken: string,
    request: NotificationsUpdateRequest
  ): Promise<Notification> {
    return this.notificationsRepository.updateNotification(
      idempotencyToken,
      request
    );
  }

  public async sendWebhookNotification(
    idempotencyToken: string,
    customerId: string,
    notificationTypeId: string,
    notificationPayload: NotificationWebhookPayload
  ): Promise<void> {
    const { callbackKey, url } = await this.callbackManager.getCallbackDetails({
      customerId,
      notificationTypeId,
    });

    const response = await axios.post(url, notificationPayload, {
      headers: {
        'Content-Type': 'application/json',
        'x-idempotency-key': idempotencyToken,
        'x-callback-key': callbackKey,
      },
    });

    this.updateNotification(idempotencyToken, {
      deliveryStatus: DeliveryStatus.SUCCESS,
      httpStatusCode: response.status,
    });
  }
}

export default NotificationsService;
