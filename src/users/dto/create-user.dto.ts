import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { LoginMethodList } from '../enums/login-method.enum';
import { LoginMethod } from '@prisma/client';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(LoginMethodList, {
    message: `Login method must be one of the following: ${Object.values(
      LoginMethodList,
    )}`,
  })
  provider: LoginMethod;
}
