import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/index.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
        // select: {
        //   id: true,
        //   email: true,
        //   createdAt: true,
        // },
      });
      // delete user.hash;
      // return user;
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credential taken');
        }
      }
      throw error;
    }

    // return the saved user

    // return { msg: 'i have signed up' };
  }

  async signin(dto: AuthDto) {
    // find user
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //  if user doesn't exist throe exception
    if (!user) throw new ForbiddenException('Credential incorrect');

    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);

    // if password incorrect throe exception
    if (!pwMatches) throw new ForbiddenException('Credential incorrect');

    // send back the user
    // delete user.hash;
    // return user;
    return this.signToken(user.id, user.email);
    // return { msg: 'i have signed in' };
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return {
      access_token: token,
    };
  }
}
