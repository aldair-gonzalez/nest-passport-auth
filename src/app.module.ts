import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    /*
    // Use global guard
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    */
  ],
})
export class AppModule {}
