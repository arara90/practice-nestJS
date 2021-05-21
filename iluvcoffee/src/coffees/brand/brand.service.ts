import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Brand} from "../entities/brand.entity";
import {Connection, Repository} from "typeorm";
import {Barista} from "../entities/barista.entity";
import {Profile} from "../entities/profile.entity";
import {CreateBaristaDto} from "../dto/create-barista.dto";
import {Flavor} from "../entities/flavor.entity";
import {CreateBrandDto} from "../dto/create-brand.dto";
import {assertWithStatement} from "@babel/types";
import {Category} from "../entities/category.entity";

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,

    @InjectRepository(Barista)
    private readonly baristaRepository: Repository<Barista>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    private readonly connetion: Connection
  ) {}


  async findAll(){
    const brand = await this.brandRepository.find({relations:["baristas", "coffees"]})
    return brand
  }

  async findAllBaristas(id: number){
    const baristas = await this.baristaRepository.find({
      relations: ["profile"],
      where: { brand: id }
    })
    return baristas
  }

  async findProfileFromBarista(id: number){
    // const barista = await this.baristaRepository.findOne({id}, {relations:["profile"]})
    // return barista.profile
    const profileFromBarista = await this.connetion
      .getRepository(Barista)
      .createQueryBuilder("barista")
      .leftJoinAndSelect("barista.profile", "profile")
      .where('barista.id = :id', { id })
      .getOne()
    return profileFromBarista

  }

  async findBaristaFromProfile(id: number){
    // const profile = await this.profileRepository.findOne({id}, {relations:["barista"]})
    // return profile.barista
    const baristaFromProfile = await this.connetion
      .getRepository(Profile)
      .createQueryBuilder("profile")
      .leftJoinAndSelect("profile.barista", "barista")
      .where('profile.id = :id', { id })
      .getMany()
    return baristaFromProfile
  }

  async createBarista(createBaristaDto: CreateBaristaDto){
    const barista = await this.baristaRepository.create(createBaristaDto)
    return this.baristaRepository.save(barista)
  }

  async createBrand(createBrandDto: CreateBrandDto){
    const brand = await this.brandRepository.create(createBrandDto)
    return this.brandRepository.save(brand)
  }

  async removeBarista(id: number){
    const barista = await this.baristaRepository.findOneOrFail(id)
    return this.baristaRepository.remove(barista)
  }

  async removeBrand(id: number){
    const brand = await this.brandRepository.findOneOrFail(id)
    return this.brandRepository.remove(brand)
  }

  async removeProfile(id: number){
    const profile = await this.profileRepository.findOneOrFail(id)
    return this.profileRepository.remove(profile)
  }

}
