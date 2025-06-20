import { IsOptional, IsString, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
  email?: string;

  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;
}
