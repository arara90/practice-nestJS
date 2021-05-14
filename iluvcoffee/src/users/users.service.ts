import {Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  findAll(){
    const users = this.userRepository.find()
    return users
  }

  findOne(id:string){
    const user = this.userRepository.findOne(id)
    if(!user) throw new NotFoundException(`User ${id} Not Found`)
      return user
    }

  findOneByParam(param:object){
    const user = this.userRepository.findOne(param)
    if(!user) throw new NotFoundException(`User ${param} Not Found`)
    return user
  }

  async create(createUserDto: CreateUserDto){
    const isExist = await this.userRepository.findOne({username:createUserDto.username})
    if(isExist){
      throw new InternalServerErrorException('Duplicated username')
    } else{
      const user = this.userRepository.create(createUserDto)
      return this.userRepository.save(user)
    }
  }

  async update(id:string, updateUserDto: UpdateUserDto){
    const user = await this.userRepository.preload({id:+id, ...updateUserDto})
    if(!user) throw new NotFoundException(`User ${id} Not Found`)
    return this.userRepository.save(user)
  }

  async remove(id:string){
    const user = await this.findOne(id)
    return this.userRepository.remove(user)
  }

  async login(loginUserDto: LoginUserDto){
    const user =  await this.userRepository.findOne({username: loginUserDto.username})
    if(!user) throw new NotFoundException(`Username ${loginUserDto.username} Not Found`)
    else{
      if(loginUserDto.password === user.password) return user
      else throw new UnauthorizedException('Password not Matched')
    }
  }
}
