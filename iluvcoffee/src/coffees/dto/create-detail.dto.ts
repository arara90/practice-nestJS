import {IsOptional, IsString} from "class-validator";

export class CreateDetailDto{
  @IsOptional()
  @IsString()
  readonly photo: string


  @IsOptional()
  @IsString()
  readonly ingredients: string

  @IsString()
  readonly desc: string

}
