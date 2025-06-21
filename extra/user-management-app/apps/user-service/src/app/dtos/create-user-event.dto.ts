import { IsUUID, IsString, IsEmail, IsISO8601 } from 'class-validator';

export class CreateUserEventDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsISO8601()
  createdAt: string;
}

