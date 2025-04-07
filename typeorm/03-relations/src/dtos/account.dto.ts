import { IsNumber, IsPositive, IsString } from 'class-validator';

export class AccountDto {
  @IsString()
  id: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
