import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { PostsBody } from 'src/dtos/posts-body.dto';
import { PostsService } from './posts.service';
import { SessionGuard } from 'src/guards/session.guard';
import { Session as _session } from 'express-session';
import { Public } from 'src/decorators/public.decorator';

@Controller('posts')
@UseGuards(SessionGuard)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  async addPost(@Body() body: PostsBody, @Session() session: _session) {
    return this.postsService.addPostByUser(body, session.user.id);
  }

  @Patch(':id')
  updatePost(
    @Session() session: _session,
    @Body() body: Partial<PostsBody>,
    @Param('id') id: string,
  ) {
    return this.postsService.editPostById(parseInt(id), session.user.id, body);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string, @Session() session: _session) {
    const post = await this.postsService.deletePostById(
      parseInt(id),
      session.user.id,
    );
    return { message: `Deleted post of id: ${id}` };
  }

  @Get('all')
  @Public()
  fetchAllPosts() {
    return this.postsService.fetchAllPosts();
  }

  @Get(':id')
  fetchPost(@Param('id') id: string, @Session() session: _session) {
    return this.postsService.fetchPostById(parseInt(id), session.user.id);
  }

  @Get()
  fetchAllPostsByUser(@Session() session: _session) {
    return this.postsService.fetchAllPostsByUser(session.user.id);
  }

  @Delete()
  async deleteAllPostsByUser(@Session() session: _session) {
    await this.postsService.deleteAllPostsByUser(session.user.id);
    return { message: `Deleted all posts of user: ${session.user.id}` };
  }
}
