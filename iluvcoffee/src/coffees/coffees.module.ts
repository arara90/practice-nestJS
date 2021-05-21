import { Module } from '@nestjs/common'
import {CoffeesController} from "./coffees.controller"
import {CoffeesService} from "./coffees.service"
import {TypeOrmModule} from "@nestjs/typeorm"
import {Coffee} from "./entities/coffee.entity"
import {Flavor} from "./entities/flavor.entity"
import {Event} from "../events/entities/event.entity"
import {Brand} from "./entities/brand.entity";
import {Detail} from "./entities/detail.entity";
import {Barista} from "./entities/barista.entity"
import {Customer} from "./entities/customer.entity"
import {Category} from "./entities/category.entity";
import {Coffeesbaristas} from "./entities/coffeesbaristas.entity";
import {Order} from "./entities/order.entity";
import {Profile} from "./entities/profile.entity";
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Coffee
      , Flavor
      , Event
      , Brand
      , Detail
      , Barista
      , Profile
      , Category
      , Customer
      , Order
      , Coffeesbaristas
    ]),
    BrandModule],
  controllers:[CoffeesController],
  providers:[CoffeesService]
} )
export class CoffeesModule {}
