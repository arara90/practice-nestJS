import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common'
import {Coffee} from "./entities/coffee.entity"
import {CreateCoffeeDto} from "./dto/create-coffee.dto"
import {InjectRepository} from "@nestjs/typeorm"
import {Connection, getManager, Repository} from "typeorm"
import {UpdateCoffeeDto} from "./dto/update-coffee.dto"
import {Flavor} from "./entities/flavor.entity"
import {PaginationQueryDto} from "../common/dto/pagination-query.dto"
import {Event} from "../events/entities/event.entity"
import {Brand} from "./entities/brand.entity"
import {Category} from "./entities/category.entity"
import {Detail} from "./entities/detail.entity"

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Detail)
    private readonly detailRepository: Repository<Detail>,
    private readonly connetion: Connection,
  ) {}

  private async preloadFlavorByName(name:string):Promise<Flavor>{
    const existingFlavor = await this.flavorRepository.findOne({name})
    if(existingFlavor) return existingFlavor
    return this.flavorRepository.create({name})
  }

  private async preloadBrandByName(name:string):Promise<Brand>{
    const existingBrand = await this.brandRepository.findOne({name})
    if(existingBrand) return existingBrand
    return this.brandRepository.create({name})
}

  private async preloadCategoryByName(name:string):Promise<Category>{
    const existingCategory = await this.categoryRepository.findOne({name})
    if(existingCategory) return existingCategory
    return this.categoryRepository.create({name})
  }

  // private async preloadDetailById(id:number):Promise<Category>{
  //   const existingDetail = await this.categoryRepository.findOne(+id)
  //   if(existingDetail) return existingDetail.
  //   return this.categoryRepository.create({name})
  // }

  findAll(paginationQuery: PaginationQueryDto){
    const {limit, offset} = paginationQuery
    const coffees = this.coffeeRepository.find({
      relations:['flavors', 'brand','detail'],
      skip: offset,
      take: limit
    })
    return coffees
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne(id, {relations: ['flavors', 'brand', 'detail']})
    if(!coffee) throw new NotFoundException(`Coffee ${id} Not Found`)
    return coffee
  }

  async findFlavorsFromCoffee(id: string) {
    const coffee = await this.coffeeRepository.findOne(id, {relations:['flavors']})
    if(!coffee) throw new NotFoundException(`Coffee ${id} Not Found`)
    return coffee.flavors
  }

  async findFlavor(id: string) {
    // const flavor = await this.flavorRepository.findOne(id, {relations:['coffees']})
    // console.log(flavor)
    // if(!flavor) throw new NotFoundException(`flavor ${id} Not Found`)
    // return flavor
    const flavorsWithCoffees = await this.connetion
      .getRepository(Flavor)
      .createQueryBuilder("flavor")
      .leftJoinAndSelect("flavor.coffees", "coffee")
      .where('flavor.id = :id', { id })
      .getMany()
     return flavorsWithCoffees
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    // //flavor가 존재하면 가져오고, 없으면 create해서 담아옴.
    let flavors = []
    if(createCoffeeDto.flavors){
      flavors = await Promise.all(createCoffeeDto.flavors.map(name=>this.preloadFlavorByName(name)))
    }
    const brand = await this.preloadBrandByName(createCoffeeDto.brand)
    const category = await this.preloadCategoryByName(createCoffeeDto.category)
    const coffee = this.coffeeRepository.create({...createCoffeeDto, flavors, brand, category})
    return this.coffeeRepository.save(coffee)
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    let coffee = await this.coffeeRepository.findOne(+id, {relations:['detail']})
    if(!coffee) throw new NotFoundException(`Coffee ${id} Not Found`)
    else{
      const detail = await this.detailRepository.preload({id: +(coffee.detail.id), ...updateCoffeeDto.detail } )
      const flavors = updateCoffeeDto.flavors && await Promise.all(updateCoffeeDto.flavors.map(name=>this.preloadFlavorByName(name)))
      const brand = await this.preloadBrandByName(updateCoffeeDto.brand)
      const category = await this.preloadCategoryByName(updateCoffeeDto.category)
      coffee = await this.coffeeRepository.preload({id: +id, ...updateCoffeeDto, flavors, brand, category, detail})

      return this.coffeeRepository.save(coffee)
    }
  }

  async remove(id: string) {
    const coffee = await this.findOne(id)
    const detail = await this.detailRepository.findOne(coffee.detail.id)
    return this.detailRepository.remove(detail)
  }

  async removeFlavor(id: string) {
    const flavor = await this.flavorRepository.findOne(id)
    if(!flavor) throw new NotFoundException(`flavor ${id} Not Found`)
    return this.flavorRepository.remove(flavor)
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
