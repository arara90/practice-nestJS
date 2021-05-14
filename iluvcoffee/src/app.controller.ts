import {Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import { AuthService } from './auth/auth.service'
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
// import {AuthGuard} from "@nestjs/passport";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req){
    // return req.user
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req){
    console.log('ddd')
    return req.user
  }
}
