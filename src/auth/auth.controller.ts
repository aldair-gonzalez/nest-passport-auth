import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { LoginMethod } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  // Login with google using the google strategy
  @UseGuards(GoogleOauthGuard)
  @Get('google')
  async googleLogin() {}

  // Redirect URL for google
  @UseGuards(GoogleOauthGuard)
  @Get('google/callback')
  async googleLoginCallback(@Request() req: any) {
    const provider = LoginMethod.GOOGLE;

    try {
      const { name, email /* accessToken4 */ } = req.user;
      const userExists = await this.usersService.findOneByEmail(email);
      if (userExists) {
        return await this.authService.login(userExists);
      }

      const user = await this.usersService.createUser({
        name,
        email,
        password: '',
        provider,
      });
      return await this.authService.login(user);
    } catch (error) {
      throw error;
    }
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    try {
      const userExists = await this.usersService.findOneByEmail(user.email);
      if (userExists) {
        throw new BadRequestException('User already exists');
      }

      return await this.authService.register(user);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req: any) {
    return req.logout();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    return req.user;
  }
}
