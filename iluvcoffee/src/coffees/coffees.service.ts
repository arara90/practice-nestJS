import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {Coffee} from "./entities/coffee.entity";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Connection, Repository} from "typeorm";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";
import {Flavor} from "./entities/flavor.entity";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {Event} from "../events/entities/event.entity";


  @Injectable()
  export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connetion: Connection,
  ) {}

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
    const coffee = await this.coffeeRepository.findOne(id)
    if(!coffee) throw new NotFoundException(`Coffee ${id} Not Found`)
    return coffee;
  }

  async findLazy(id: string) {
    const coffee = await this.connetion.getRepository(Coffee).findOne(id)
    //const coffee = await this.connetion.getRepository(Coffee).findOne({name:'new'})
    //const rc = await this.connetion.getRepository(Coffee).findOne(14, {relations:['flavors']})

    console.log('------------------------coffee---------------------')
    console.log('coffee[\'__has_flavors__\']', coffee['__has_flavors__'])  //undefined
    console.log('coffee', coffee) // Coffee { id: 14, name: 'new', brand: 'ss', recommendations: 0 }

    console.log('------------------------coffee.flavors----------------------')
    const flavors = await coffee.flavors
    console.log('------------------------------------------------------------')
    console.log('flavors', flavors) // [ Flavor { id: 8, name: 'white' }, Flavor { id: 9, name: 'oat' } ]

    console.log('------------------------rc----------------------')
    console.log('rc.flavors', coffee.flavors) //Promise {[ Flavor { id: 8, name: 'white' }, Flavor { id: 9, name: 'oat' } ]}
    //console.log('rc.flavors[0]', coffee.flavors[0]) //undefined
    console.log('rc[__flavors__]', coffee['__flavors__']) // [ Flavor { id: 8, name: 'white' }, Flavor { id: 9, name: 'oat' } ]

    if(!coffee) throw new NotFoundException(`Coffee ${id} Not Found`)
    return coffee
    }

    async findEager(id:string) {
      const coffee = await this.connetion.getRepository(Coffee).findOne(id)
      //const coffee = await this.connetion.getRepository(Coffee).findOne({name:'new'})
      //const rc = await this.connetion.getRepository(Coffee).findOne(14, {relations:['flavors']})

      console.log('------------------------coffee---------------------')
      console.log('coffee[\'__has_flavors__\']', coffee['__has_flavors__'])  //undefined
      console.log('coffee', coffee) // Coffee { id: 14, name: 'new', brand: 'ss', recommendations: 0 }

      console.log('------------------------coffee.flavors----------------------')
      const flavors = coffee.flavors //not exists
      console.log('------------------------------------------------------------')
      console.log('flavors', flavors) // [ Flavor { id: 8, name: 'white' }, Flavor { id: 9, name: 'oat' } ]

      console.log('------------------------coffee again----------------------')
      console.log('rc.flavors', coffee.flavors) //Promise {[ Flavor { id: 8, name: 'white' }, Flavor { id: 9, name: 'oat' } ]}
      //console.log('rc.flavors[0]', coffee.flavors[0]) //undefined
      console.log('rc[__flavors__]', coffee['__flavors__']) // [ Flavor { id: 8, name: 'white' }, Flavor { id: 9, name: 'oat' } ]

      if(!coffee) throw new NotFoundException(`Coffee ${id} Not Found`)
      return coffee
    }

  async create(createCoffeeDto: CreateCoffeeDto) {
    //flavor가 존재하면 가져오고, 없으면 create해서 담아옴.
    // const flavors = await Promise.all(createCoffeeDto.flavors.map(name=>this.preloadFlavorByName(name)))
    // const coffee = this.coffeeRepository.create({...createCoffeeDto, flavors})
    // return this.coffeeRepository.save(coffee)
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    // const flavors = updateCoffeeDto.flavors && (await Promise.all(updateCoffeeDto.flavors.map(name=>this.preloadFlavorByName(name))))
    // const coffee = await this.coffeeRepository.preload({id: +id, ...updateCoffeeDto, flavors})
    // if(!coffee) throw new NotFoundException(`Coffee ${id} Not Found`)
    // return this.coffeeRepository.save(coffee)
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
