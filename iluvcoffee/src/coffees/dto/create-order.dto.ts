import {IsNumber} from "class-validator";

export class CreateOrderDto{
  @IsNumber()
  readonly customer: number

  @IsNumber()
  readonly coffee: number
}
