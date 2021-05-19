import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { DeliveryStatus } from './notification.model';

export class WebhookError extends Error {
  public httpStatusCode: number;

  constructor(message: string, httpStatusCode: number) {
    super(message);
    this.name = 'WebhookError';
    this.httpStatusCode = httpStatusCode;
  }
}

export class NotificationConsumerPayload {
  @IsNotEmpty()
  @Expose({ name: 'idempotency_token', toPlainOnly: true })
  public idempotencyToken: string;

  @IsNotEmpty()
  public data: Record<string, string>;

  @Expose({ name: 'customer_id', toPlainOnly: true })
  public customerId: string;

  @Expose({ name: 'notification_type_id', toPlainOnly: true })
  public notificationTypeId: string;

  @Expose({ name: 'delivery_status', toPlainOnly: true })
  public deliveryStatus: DeliveryStatus;

  @IsOptional()
  @Expose({ name: 'http_status_code', toPlainOnly: true })
  public httpStatusCode: Date;

  @Expose({ name: 'date_created', toPlainOnly: true })
  public dateCreated: Date;

  @IsOptional()
  @Expose({ name: 'retry_count', toPlainOnly: true })
  public retryCount: number;
}

export class NotificationWebhookPayload {
  @IsOptional()
  public data: Record<string, string>;

  @Expose({ name: 'customer_id', toPlainOnly: true })
  public customerId: string;

  @Expose({ name: 'notification_type_id', toPlainOnly: true })
  public notificationTypeId: string;

  @Expose({ name: 'date_created', toPlainOnly: true })
  public dateCreated: Date;
}

export class NotificationsUpdateRequest {
  @IsNotEmpty()
  public deliveryStatus: DeliveryStatus;

  @IsNotEmpty()
  public httpStatusCode: number;
}
