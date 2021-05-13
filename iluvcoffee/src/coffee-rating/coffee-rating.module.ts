import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import {CoffeesModule} from "../coffees/coffees.module";
import {DatabaseModule} from "../database/database.module";


@Module({
  imports: [CoffeesModule, DatabaseModule.register({
    type: 'postgres',
    host: 'joala',
    password:'dkfk5377',
    port: 5432
  })],
  providers: [CoffeeRatingService]
})
export class CoffeeRatingModule {}
