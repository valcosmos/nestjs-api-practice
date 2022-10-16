import { JwtGuard } from './../auth/guard';
import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetUser } from '../decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  // @UseGuards(AuthGuard('jwt'))
  // @UseGuards(JwtGuard)
  @Get('me')
  // getMe(@Req() req: Request) {
  getMe(@GetUser() user: User) {
    return user;
  }
  // getMe(@GetUser('email') email: string) {
  //   return email;
  // }

  @Patch()
  editUser() {
    return '';
  }
}
