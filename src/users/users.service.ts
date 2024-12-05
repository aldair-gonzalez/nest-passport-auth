import { Injectable } from '@nestjs/common';
// import { Prisma, User } from '@prisma/client';
// import { PrismaService } from 'src/prisma.service';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  // constructor(private prisma: PrismaService) {}
  // async getUser(
  //   userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  // ): Promise<User | null> {
  //   return await this.prisma.user.findUnique({
  //     where: userWhereUniqueInput,
  //   });
  // }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
