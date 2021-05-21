import {IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {CreateDetailDto} from "./create-detail.dto";

export class CreateCoffeeDto {
  @IsString()
  readonly name: string

  @IsString()
  readonly brand: string

  @IsString()
  readonly category: string

  @IsOptional()
  @ValidateNested()
  @Type(()=>CreateDetailDto)
  readonly detail: CreateDetailDto

  @IsOptional()
  @IsString({each: true})
  readonly flavors: string[]
}
