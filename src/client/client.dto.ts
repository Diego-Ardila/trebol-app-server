import { IsNotEmpty } from "class-validator";
import { Template } from "src/typeorm/template.entity";

export class CreateClientDto {
  @IsNotEmpty()
  clientName: string;

  @IsNotEmpty()
  template: number;
}