import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Template } from './template.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn({
    name: 'client_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  clientName: string;

  @ManyToOne(type => Template)
  @JoinColumn()
  template: Template;
}