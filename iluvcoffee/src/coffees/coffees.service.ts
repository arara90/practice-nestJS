import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {Coffee} from "./entities/coffee.entity";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";
import {Flavor} from "./entities/flavor.entity";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>
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
    const coffee = await this.coffeeRepository.findOne(id, {relations: ['flavors']})
    if(!coffee) throw new NotFoundException(`Coffee ${id} Not Found`)
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    //flavor가 존재하면 가져오고, 없으면 create해서 담아옴.
    const flavors = await Promise.all(createCoffeeDto.flavors.map(name=>this.preloadFlavorByName(name)))
    const coffee = this.coffeeRepository.create({...createCoffeeDto, flavors})
    return this.coffeeRepository.save(coffee)
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = updateCoffeeDto.flavors && (await Promise.all(updateCoffeeDto.flavors.map(name=>this.preloadFlavorByName(name))))
    const coffee = await this.coffeeRepository.preload({id: +id, ...updateCoffeeDto, flavors})
    if(!coffee) throw new NotFoundException(`Coffee ${id} Not Found`)
    return this.coffeeRepository.save(coffee)
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
