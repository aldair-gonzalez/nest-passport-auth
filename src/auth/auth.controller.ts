import {
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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    try {
      return await this.authService.register(user);
    } catch (error) {
      console.log(error);
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
