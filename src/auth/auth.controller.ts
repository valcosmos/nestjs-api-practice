import { AuthService } from './auth.service';
import { Body, Controller, ParseIntPipe, Post, Req } from '@nestjs/common';
import { AuthDto } from './dto';
// import { Request } from 'express';

@Controller('auth')
export class AuthController {
  // authService: AuthService
  constructor(private authService: AuthService) {}

  @Post('signup')
  // signup(@Req() req: Request) {
  signup(@Body() dto: AuthDto) {
    // signup(
    //   @Body('email') email: string,
    //   @Body('password', ParseIntPipe) password: string,
    // ) {
    // if(!dto.email)

    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
