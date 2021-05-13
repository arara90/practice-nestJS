import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res} from '@nestjs/common';
import {CoffeesService} from "./coffees.service";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";
import {type} from "os";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService){
  }

  // @Get()
  // findAll(@Query() paginationQuery){
  //   const {limit, offset} = paginationQuery
  //   return `This action returns all coffees : ${limit} to ${offset}`
  // }

  @Get()
  findAll(@Query() paginationQuery:PaginationQueryDto){
    return this.coffeesService.findAll(paginationQuery)
  }

  @Get(':id')
  findOne(@Param('id') id:number){
    return this.coffeesService.findOne('' + id)
  }

  @Post()
    // @HttpCode(HttpStatus.GONE)
    create(@Body() createCoffeeDto:CreateCoffeeDto){
      console.log(createCoffeeDto instanceof CreateCoffeeDto )
      return this.coffeesService.create(createCoffeeDto)
  }
  // create(@Body() body){
  //   return this.coffeesService.create(body)
  // }

  @Patch(':id')
  update(@Param('id') id:string, @Body() updateCoffeeDto:UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto)
  }

  @Delete(':id')
  remove(@Param('id') id:string){
    return this.coffeesService.remove(id)

  }


  //etc//
  // @Post('name')
  // createB(@Body('name') body) {
  //
  //   // Other properies won't be validated except for 'name'
  //   return body
  // }

  // @Get()
  // findAll(@Res() response){
  //   // return 'all'
  //   response.status(200).send('This action returns all coffees') //response from express.js
  // }

}
