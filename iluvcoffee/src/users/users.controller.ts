import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService:UsersService) {}

  //1. register
  @Post('/register')
  create(@Body() createUser:CreateUserDto){
    return this.usersService.create(createUser)
  }

  //2. login
  @Post('/login')
  login(@Body() loginUser:LoginUserDto){
    return this.usersService.login(loginUser)
  }

  //3. update
  @Patch(':id')
  update(@Param('id') id:string, @Body() updateUser:UpdateUserDto){
    return this.usersService.update(id, updateUser)
  }

  //4. delete
  @Delete(':id')
  remove(@Param('id') id:string){
    return this.usersService.remove(id)
  }

  //5. getAll
  @Get()
  findAll() {
    return this.usersService.findAll()
  }
  //6. getOne
  @Get(':id')
  findOne(@Param('id') id:string ){
    return this.usersService.findOne(''+id)
  }
}
