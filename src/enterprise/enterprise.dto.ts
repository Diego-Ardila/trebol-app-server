import { IsNotEmpty, IsEmail, IsInt } from "class-validator";

export class CreateEnterpriseDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  enterpriseName: string;

  @IsNotEmpty()
  client: number;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
}