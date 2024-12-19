import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
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
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message:
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;

  @IsNotEmpty()
  @IsEnum(LoginMethodList, {
    message: `Login method must be one of the following: ${Object.values(
      LoginMethodList,
    )}`,
  })
  provider: LoginMethod;
}
