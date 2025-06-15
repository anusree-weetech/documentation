import { PartialType } from '@nestjs/swagger';
import { PostsBody } from './posts-body.dto';

export class UpdatePost extends PartialType(PostsBody) {}
