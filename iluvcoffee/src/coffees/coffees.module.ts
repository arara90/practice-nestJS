import {Injectable, Module, Scope} from '@nestjs/common'
import {CoffeesController} from "./coffees.controller"
import {CoffeesService} from "./coffees.service"
import {TypeOrmModule} from "@nestjs/typeorm"
import {Coffee} from "./entities/coffee.entity"
import {Flavor} from "./entities/flavor.entity"
import {Event} from "../events/entities/event.entity"
import {COFFEE_BRANDS} from "./coffees.constants"
import coffeesConfig from "./config/coffees.config"
import {ConfigModule} from "@nestjs/config"

class MockCoffeesService {}
class ConfigService{}
class DevelopmentConfigService{}
class ProductionConfigService{}
@Injectable()
export class CoffeeBrandsFactory{
  create(){
    return ['buddy brew', 'nescafe']
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event])
    , ConfigModule.forFeature(coffeesConfig)
  ],

  exports:[CoffeesService],
  controllers:[CoffeesController],
  providers:[CoffeesService,
    // {provide: 'COFFEE_BRANDS', useValue: ['buddy brew', 'nescafe']}]
    // {provide: COFFEE_BRANDS, useValue:['buddy brew', 'nescafe']},
    // {provide: ConfigService, useClass: process.env.NODE_ENV==='development' ? DevelopmentConfigService: ProductionConfigService}
    {provide: COFFEE_BRANDS, useFactory:()=>['buddy brew', 'nescafe']},
    // {provide: COFFEE_BRANDS, useFactory:()=>['buddy brew', 'nescafe'], scope: Scope.TRANSIENT}
    // {provide: COFFEE_BRANDS
    //   , useFactory:(brandsFactory:CoffeeBrandsFactory) => brandsFactory.create()
    // , inject : [CoffeeBrandsFactory]
    // }
    // { provide: COFFEE_BRANDS
    //   //, useFactory:(brandsFactory:CoffeeBrandsFactory) => brandsFactory.create()
    //   , useFactory: async (connection: Connection): Promise<string[]> => {
    //     const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe'])
    //     console.log('! Async Factory')
    //     return coffeeBrands
    //   }
    //   , inject : [Connection]
    // }
  ]}


)


export class CoffeesModule {}
