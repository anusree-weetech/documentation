import { IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  email: string;
  @IsString()
  name: string;
  @IsString()
  password: string;
}
