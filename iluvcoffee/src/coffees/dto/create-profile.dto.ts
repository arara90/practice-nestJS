import {IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {CreateBrandDto} from "./create-brand.dto";
import {CreateCoffeeDto} from "./create-coffee.dto";
import {Profile} from "../entities/profile.entity";
import {CreateBaristaDto} from "./create-barista.dto";

export class CreateProfileDto{
  @IsString()
  readonly photo: string

  @IsOptional()
  @IsString()
  readonly address: string

  @IsOptional()
  @IsString()
  readonly contact: string

  @IsOptional()
  @IsString()
  readonly skills: string

  // @ValidateNested()
  // @Type(()=>CreateBaristaDto)
  // readonly barista: CreateBaristaDto
}
