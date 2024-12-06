import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './decorators/public-access.decorator';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // Esta ruta es pública
  @Public()
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req: any) {
    return req.logout();
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  async getProfile(@Request() req: any) {
    return req.user;
  }
}
