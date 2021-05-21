import {IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {CreateBrandDto} from "./create-brand.dto";
import {Profile} from "../entities/profile.entity";
import {CreateProfileDto} from "./create-profile.dto";
import {Brand} from "../entities/brand.entity";

export class CreateBaristaDto{
  @IsString()
  readonly name: string

  @IsNumber()
  readonly brand: Brand
  // @IsOptional()
  // @ValidateNested()
  // @Type(()=>CreateBrandDto)
  // readonly brand: Brand

  @IsOptional()
  @ValidateNested()
  @Type(()=>CreateProfileDto)
  readonly profile: Profile
}




export class Member{
  private readonly id: number
  private readonly name: string
  private readonly tel: string
}
