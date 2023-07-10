import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class Enterprise {
  @PrimaryColumn({
    name: 'enterprise_id',
    nullable: false
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  enterpriseName: string;

  @Column({
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    type: 'json',
    default: [],
  })
  files: JSON;

  @ManyToOne(type => Client)
  @JoinColumn()
  client: Client;
}