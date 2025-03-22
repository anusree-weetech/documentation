import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
