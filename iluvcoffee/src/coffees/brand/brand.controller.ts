import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {BrandService} from "./brand.service";
import {CreateBaristaDto} from "../dto/create-barista.dto"
import {CreateBrandDto} from "../dto/create-brand.dto";

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  //barista
  @Get('barista/:id')
  findProfileFromBarista(@Param('id') id: string){
    return this.brandService.findProfileFromBarista(+id)
  }

  @Get('profile/:id')
  findBaristaFromProfile(@Param('id') id: string){
    return this.brandService.findBaristaFromProfile(+id)
  }

  @Get(':id/baristas')
  findAllBarista(@Param('id') id: string){
    return this.brandService.findAllBaristas(+id)
  }


  @Post('barista')
  createBarista(@Body() createBaristaDto: CreateBaristaDto ){
    console.log('create Barista')
    return this.brandService.createBarista(createBaristaDto)
  }


  @Delete('barista/:id')
  removeBarista(@Param('id') id:number){
    return this.brandService.removeBarista(id)
  }

  @Delete('profile/:id')
  removeProfile(@Param('id') id:number){
    return this.brandService.removeProfile(id)
  }

  //brand
  @Get()
  findAll(){
    return this.brandService.findAll()
  }

  @Post()
  createBrand(@Body() createBrandDto: CreateBrandDto ){
    return this.brandService.createBrand(createBrandDto)
  }

}
