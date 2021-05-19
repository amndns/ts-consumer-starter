import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CallbackUrl from '../../callback/models/callback-url.model';
import Notification from './notification.model';

@Entity()
class NotificationType {
  @PrimaryGeneratedColumn('increment')
  public pk: number;

  @IsNotEmpty()
  @Column({ unique: true })
  @Generated('uuid')
  public id: string;

  @IsNotEmpty()
  @Column('varchar', { length: 63 })
  public type: string;

  @IsNotEmpty()
  @Column('jsonb', { name: 'sample_payload' })
  public samplePayload: Record<string, string>;

  @OneToMany(() => CallbackUrl, (callbackUrl) => callbackUrl.notificationType)
  public callbackUrls: CallbackUrl[];

  @OneToMany(
    () => Notification,
    (notification) => notification.notificationType
  )
  public notifications: Notification[];
}

export default NotificationType;
