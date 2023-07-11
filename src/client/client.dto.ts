import { IsNotEmpty } from "class-validator";

export class CreateClientDto {
  @IsNotEmpty()
  clientName: string;

  @IsNotEmpty()
  template: number;
}