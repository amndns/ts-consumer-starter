import { IsNotEmpty } from 'class-validator';
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
import NotificationType from '../../notifications/models/notification-type.model';

@Entity()
class CallbackUrl {
  @PrimaryGeneratedColumn('increment')
  public pk: number;

  @IsNotEmpty()
  @Column({ unique: true })
  @Generated('uuid')
  public id: string;

  @IsNotEmpty()
  @Column('varchar', { length: 511 })
  public url: string;

  @ManyToOne(() => Customer, (customer) => customer.callbackUrls)
  @JoinColumn({ name: 'customer_pk' })
  public customer: Customer;

  @ManyToOne(
    () => NotificationType,
    (notificationType) => notificationType.callbackUrls
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

export default CallbackUrl;
