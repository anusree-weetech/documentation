import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsBody } from 'src/dtos/posts-body.dto';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private userService: UsersService,
  ) {}

  async fetchPostById(id: number, userId: number) {
    return await this.postsRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'], // Ensure the 'user' relation is loaded
    });
  }

  async addPostByUser(body: PostsBody, userId: number) {
    const user = await this.userService.findUser('', userId);

    const post = this.postsRepository.create({ user, ...body });
    return this.postsRepository.save(post);
  }

  async editPostById(id: number, userId: number, body: Partial<PostsBody>) {
    const post = await this.postsRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'], // Ensure the 'user' relation is loaded bcz long story
    });
    if (!post) throw new NotFoundException('Post not found');
    Object.assign(post, body); //syntax:.ass(target, source). copies partial data too from source to target
    return await this.postsRepository.save(post);
  }

  async deletePostById(id: number, userId: number) {
    const post = await this.postsRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
    });
    if (!post) throw new NotFoundException('Post not found to delete');
    return await this.postsRepository.remove(post);
  }

  async fetchAllPosts() {
    return await this.postsRepository.find();
  }

  async fetchAllPostsByUser(userId: number) {
    return await this.postsRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async deleteAllPostsByUser(userId: number) {
    return await this.postsRepository.delete({ user: { id: userId } });
  }
}
