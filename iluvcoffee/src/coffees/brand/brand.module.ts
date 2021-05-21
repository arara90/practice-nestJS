import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import {TypeOrmModule} from "@nestjs/typeorm"
import {Brand} from "../entities/brand.entity";
import {Barista} from "../entities/barista.entity";
import {Profile} from "../entities/profile.entity";

@Module({
  imports:[TypeOrmModule.forFeature([
    Brand,
    Barista,
    Profile
  ])
  ],
  controllers: [BrandController],
  providers: [BrandService]
})

export class BrandModule {}
