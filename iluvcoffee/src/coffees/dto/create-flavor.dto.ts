import {IsObject, IsOptional, IsString, ValidateNested} from "class-validator";

export class CreateFlavorDto {
  @IsString()
  readonly name: string
}
