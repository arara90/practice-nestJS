import {HttpException, HttpStatus, Inject, Injectable, NotFoundException, Scope} from '@nestjs/common';
import {Coffee} from "./entities/coffee.entity";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Connection, Repository} from "typeorm";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";
import {Flavor} from "./entities/flavor.entity";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {Event} from "../events/entities/event.entity";
import {COFFEE_BRANDS} from "./coffees.constants";
import {ConfigService, ConfigType} from "@nestjs/config";
import coffeesConfig from "./config/coffees.config"


  // @Injectable({scope: Scope.REQUEST})
@Injectable()
  export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connetion: Connection,
    // @Inject('COFFEE_BRANDS') coffeeBrands:string[]
    //@Inject(COFFEE_BRANDS) coffeeBrands:string[]
    private readonly configService: ConfigService,
    @Inject(coffeesConfig.KEY)
    private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>
  ) {
    // console.log(coffeeBrands)
    //console.log('coffeeService Initiated')
    //const dbHost = this.configService.get('database.user') // dot(.) notation은 user 속성의 path다.
    //const dbHost = this.configService.get<string>('DATABASE_HOST', 'localhost')
    //const coffeesConfig = this.configService.get('coffees.foo')
    console.log(coffeesConfiguration)
    console.log(coffeesConfiguration.foo)
  }

  private async preloadFlavorByName(name:string):Promise<Flavor>{
    const existingFlavor = await this.flavorRepository.findOne({name})
    if(existingFlavor) return existingFlavor
    return this.flavorRepository.create({name})
  }

  findAll(paginationQuery: PaginationQueryDto){
    const {limit, offset} = paginationQuery
    const coffees = this.coffeeRepository.find({
      relations:['flavors'],
      skip: offset,
      take: limit
    })
    return coffees
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne(id, {relations: ['flavors']})
    if(!coffee) throw new NotFoundException(`Coffee ${id} Not Found`)
    return coffee
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    //flavor가 존재하면 가져오고, 없으면 create해서 담아옴.
    const flavors = await Promise.all(createCoffeeDto.flavors.map(name=>this.preloadFlavorByName(name)))
    const coffee = this.coffeeRepository.create({...createCoffeeDto, flavors})
    return this.coffeeRepository.save(coffee)
  }




  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {

    const coffee=undefined
    //const flavors = updateCoffeeDto.flavors && (await Promise.all(updateCoffeeDto.flavors.map(name=>this.preloadFlavorByName(name))))
    // const coffee = await this.coffeeRepository.preload({id: +id, ...updateCoffeeDto, flavors})
    if(!coffee) throw new NotFoundException(`Coffee ${id} Not Found`)
    return this.coffeeRepository.save(coffee)
  }

  async remove(id: string) {
    const coffee = await this.findOne(id)
    return this.coffeeRepository.remove(coffee)
  }

  async recommendCoffee(coffee:Coffee){
    const queryRunner = this.connetion.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try{
      coffee.recommendations++
      const recommendEvent = new Event()
      recommendEvent.name = 'recommend_coffee'
      recommendEvent.type = 'coffee'
      recommendEvent.payload = {coffeeId: coffee.id}

      await queryRunner.manager.save(coffee)
      await queryRunner.manager.save(recommendEvent)
      await queryRunner.commitTransaction()
    }
    catch (err){
      // error 발생 시 queryRunner에 저장했던 모든 작업 rollback
      await queryRunner.rollbackTransaction()
    }
    finally{
      //모든 작업 후에는 항상 connection 닫아준다.
      await queryRunner.release()
    }
  }
}
