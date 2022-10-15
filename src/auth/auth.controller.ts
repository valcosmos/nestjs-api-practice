import { AuthService } from './auth.service';
import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  // authService: AuthService
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Req() req: Request) {
    console.log(req);

    return this.authService.signup();
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
