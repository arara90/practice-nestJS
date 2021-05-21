import {IsOptional, IsString, ValidateNested} from "class-validator";
import {CreateCoffeeDto} from "./create-coffee.dto";
import {Type} from "class-transformer";
import {CreateBaristaDto} from "./create-barista.dto";
import {CreateDetailDto} from "./create-detail.dto";


export class CreateBrandDto {
  @IsString()
  readonly name: string

  @IsOptional()
  @ValidateNested()
  @Type(()=>CreateBaristaDto)
  readonly baristas: CreateBaristaDto[]

}
