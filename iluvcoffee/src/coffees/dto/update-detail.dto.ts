import { IsString} from "class-validator";
import {CreateDetailDto} from "./create-detail.dto";
import {PartialType} from "@nestjs/mapped-types";

export class UpdateDetailDto extends PartialType(CreateDetailDto) {}
