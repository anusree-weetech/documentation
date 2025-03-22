import { IsOptional, IsString } from 'class-validator';

export class PostsBody {
  @IsString()
  title: string;

  @IsString()
  body: string;
}
