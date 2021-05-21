import { PartialType } from "@nestjs/mapped-types";
import {CreateCoffeeDto} from "./create-coffee.dto";
import {IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {CreateDetailDto} from "./create-detail.dto"
import {UpdateDetailDto} from "./update-detail.dto";
// import {UpdateDetailDto} from "./update-detail.dto"

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto){
  @IsOptional()
  @IsNumber()
  readonly id ?: number
}
//
//

// export class UpdateCoffeeDto {
//   @IsNumber()
//   readonly id?: number
//   @IsString()
//   readonly name?: string
//   @IsString()
//   readonly brand?: string
//   @IsString({each: true})
//   readonly flavors?: string[];
// }

// @ts-ignore
