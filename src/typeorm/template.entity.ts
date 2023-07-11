import { InputsType } from 'src/template/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Template {
  @PrimaryGeneratedColumn({
    name: 'template_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  templateName: string;

  @Column({
    nullable: false,
    type: 'json',
    default: [],
  })
  inputs: InputsType[];
}