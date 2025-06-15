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
import { ApiExtraModels } from '@nestjs/swagger';
import { Session as _session } from 'express-session';
import { ApiDocs } from 'src/common/decorators/docs.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { PostsBody } from 'src/common/dtos/posts-body.dto';
import { SessionGuard } from 'src/common/guards/session.guard';
import { PostsService } from './posts.service';

@Controller('posts')
@UseGuards(SessionGuard)
@ApiExtraModels(PostsBody) // Register DTO for schema references
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiDocs({
    summary: 'Create a new post',
    successStatus: 201,
    successExample: {
      id: { type: 'integer', example: 1 },
      title: { type: 'string', example: 'My first post' },
      body: { type: 'string', example: 'This is the content of the post' },
    },
  })
  @Post()
  async addPost(@Body() body: PostsBody, @Session() session: _session) {
    return this.postsService.addPostByUser(body, session.user.id);
  }

  @ApiDocs({
    summary: 'Update a post',
    successStatus: 200,
    successExample: {
      id: { type: 'integer', example: 123 },
      title: { type: 'string', example: 'Updated post title' },
      body: { type: 'string', example: 'Updated post content' },
    },
    errorResponses: [{ status: 404, message: 'Post not found' }],
    params: [{ name: 'id', example: 123, required: true }],
  })
  @Patch(':id')
  updatePost(
    @Session() session: _session,
    @Body() body: Partial<PostsBody>,
    @Param('id') id: string,
  ) {
    return this.postsService.editPostById(parseInt(id), session.user.id, body);
  }

  @ApiDocs({
    summary: 'Delete a post by ID',
    successStatus: 200,
    successExample: {
      message: { type: 'string', example: 'Deleted post of id: 123' },
    },
    errorResponses: [{ status: 404, message: 'Post not found to delete' }],
    params: [{ name: 'id', example: 123, required: true }],
  })
  @Delete(':id')
  async deletePost(@Param('id') id: string, @Session() session: _session) {
    await this.postsService.deletePostById(parseInt(id), session.user.id);
    return { message: `Deleted post of id: ${id}` };
  }

  @ApiDocs({
    summary: 'Fetch all posts',
    successStatus: 200,
    successExample: {
      posts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Post title' },
            body: { type: 'string', example: 'Post content' },
          },
        },
      },
    },
  })
  @Get('all')
  @Public()
  fetchAllPosts() {
    return this.postsService.fetchAllPosts();
  }

  @ApiDocs({
    summary: 'Fetch a post by ID',
    successStatus: 200,
    successExample: {
      id: { type: 'integer', example: 123 },
      title: { type: 'string', example: 'Post title' },
      body: { type: 'string', example: 'Post content' },
    },
    errorResponses: [{ status: 404, message: 'Post not found' }],
    params: [{ name: 'id', example: 123, required: true }],
  })
  @Get(':id')
  fetchPost(@Param('id') id: string, @Session() session: _session) {
    return this.postsService.fetchPostById(parseInt(id), session.user.id);
  }

  @ApiDocs({
    summary: 'Fetch all posts by a user',
    successStatus: 200,
    successExample: {
      posts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'User post title' },
            body: { type: 'string', example: 'User post content' },
          },
        },
      },
    },
  })
  @Get()
  fetchAllPostsByUser(@Session() session: _session) {
    return this.postsService.fetchAllPostsByUser(session.user.id);
  }

  @ApiDocs({
    summary: 'Delete all posts by a user',
    successStatus: 200,
    successExample: {
      message: {
        type: 'string',
        example: 'Deleted all posts of user: 1',
      },
    },
  })
  @Delete()
  async deleteAllPostsByUser(@Session() session: _session) {
    await this.postsService.deleteAllPostsByUser(session.user.id);
    return { message: `Deleted all posts of user: ${session.user.id}` };
  }
}
