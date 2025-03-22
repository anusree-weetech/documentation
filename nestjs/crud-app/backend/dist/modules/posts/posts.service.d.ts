import { Post } from 'src/database/entities/post.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { PostsBody } from 'src/common/dtos/posts-body.dto';
export declare class PostsService {
    private postsRepository;
    private userService;
    constructor(postsRepository: Repository<Post>, userService: UsersService);
    fetchPostById(id: number, userId: number): Promise<Post | null>;
    addPostByUser(body: PostsBody, userId: number): Promise<Post>;
    editPostById(id: number, userId: number, body: Partial<PostsBody>): Promise<Post>;
    deletePostById(id: number, userId: number): Promise<Post>;
    fetchAllPosts(): Promise<Post[]>;
    fetchAllPostsByUser(userId: number): Promise<Post[]>;
    deleteAllPostsByUser(userId: number): Promise<import("typeorm").DeleteResult>;
}
