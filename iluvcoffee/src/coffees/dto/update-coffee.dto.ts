import {PartialType} from "@nestjs/mapped-types";
import {CreateCoffeeDto} from "./create-coffee.dto";

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto){}



// export class UpdateCoffeeDto {
//   @IsNumber()
//   readonly id: number
//   @IsString()
//   readonly name: string
//   @IsString()
//   readonly brand: string
//   @IsString({each: true})
//   readonly flavors: string[];
// }

// @ts-ignore
