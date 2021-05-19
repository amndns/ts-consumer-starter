import { IsNotEmpty, IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Customer from '../../customers/models/customer.model';
import NotificationType from './notification-type.model';

export enum DeliveryStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

@Entity()
class Notification {
  @PrimaryGeneratedColumn('increment')
  public pk: number;

  @IsNotEmpty()
  @Column({ unique: true })
  @Generated('uuid')
  public idempotency_token: string;

  @IsNotEmpty()
  @Column('jsonb')
  public data: Record<string, string>;

  @IsOptional()
  @Column('enum', { enum: DeliveryStatus, default: DeliveryStatus.PENDING })
  public deliveryStatus: DeliveryStatus;

  @IsOptional()
  @Column('smallint', { nullable: true })
  public httpStatusCode: number;

  @ManyToOne(() => Customer, (customer) => customer.notifications)
  @JoinColumn({ name: 'customer_pk' })
  public customer: Customer;

  @ManyToOne(
    () => NotificationType,
    (notificationType) => notificationType.notifications
  )
  @JoinColumn({ name: 'notification_type_pk' })
  public notificationType: NotificationType;

  @CreateDateColumn({
    name: 'date_created',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public dateCreated: Date;
}

export default Notification;
