import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

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
  public data: Record<string, string>;

  @Expose({ name: 'customer_id', toPlainOnly: true })
  public customerId: string;
}

export class NotificationWebhookPayload {
  @IsOptional()
  public data: Record<string, string>;

  @Expose({ name: 'customer_id', toPlainOnly: true })
  @IsNotEmpty()
  public customerId: string;
}
