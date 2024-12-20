import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    const logger = new Logger('PrismaService');

    try {
      await this.$connect();
      logger.log('Connected to database');
    } catch (error) {
      logger.error(error.message);
    }
  }
}
