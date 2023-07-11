import { IsNotEmpty } from "class-validator";
import { InputsType } from "./types";

export class CreateTemplateDto {
  @IsNotEmpty()
  templateName: string;

  @IsNotEmpty()
  inputs: InputsType[];
}