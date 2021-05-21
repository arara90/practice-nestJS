import {IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {CreateOrderDto} from "./create-order.dto";


export class CreateCustomerDto{
  @IsString()
  readonly username: string

  @IsOptional()
  @ValidateNested()
  @Type(()=>CreateOrderDto)
  readonly orders: CreateOrderDto[]
}
