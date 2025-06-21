import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PostsBody {
  @ApiProperty({ example: 'My First Blog Post' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is the content of my blog post...' })
  @IsString()
  body: string;
}
