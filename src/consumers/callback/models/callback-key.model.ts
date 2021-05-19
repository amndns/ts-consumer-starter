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

@Entity()
class CallbackKey {
  @PrimaryGeneratedColumn('increment')
  public pk: number;

  @IsNotEmpty()
  @Column({ unique: true })
  @Generated('uuid')
  public id: string;

  @IsNotEmpty()
  @Column('varchar', { length: 64, name: 'callback_key', unique: true })
  public callbackKey: string;

  @ManyToOne(() => Customer, (customer) => customer.callbackKeys)
  @JoinColumn({ name: 'customer_pk' })
  public customer: Customer;

  @CreateDateColumn({
    name: 'date_created',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public dateCreated: Date;
}

export default CallbackKey;
