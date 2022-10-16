import { UserService } from './user.service';
import { EditUserDto } from './dto/edit-user.dto';
import { JwtGuard } from './../auth/guard';
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetUser } from '../decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

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
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
