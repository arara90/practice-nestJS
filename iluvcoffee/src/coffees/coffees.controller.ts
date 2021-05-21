import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Res} from '@nestjs/common';
import {CoffeesService} from "./coffees.service";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeesService.findAll(paginationQuery)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coffeesService.findOne('' + id)
  }

  @Get(':id/flavors')
  findFlavors(@Param('id') id: number) {
    return this.coffeesService.findFlavorsFromCoffee('' + id)
  }

  @Get('flavor/:id')
  findFlavor(@Param('id') id:number){
    return this.coffeesService.findFlavor('' + id)
  }


  @Post()
  // @HttpCode(HttpStatus.GONE)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log('create')
    console.log(createCoffeeDto)
    return this.coffeesService.create(createCoffeeDto)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto)
  }

  @Delete('flavor/:id')
  removeFlavor(@Param('id') id: string) {
    return this.coffeesService.removeFlavor(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id)
  }

}
