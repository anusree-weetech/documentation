import { Session as _session } from 'express-session';
import { PostsBody } from 'src/common/dtos/posts-body.dto';
import { PostsService } from './posts.service';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    addPost(body: PostsBody, session: _session): Promise<import("../../database/entities/post.entity").Post>;
    updatePost(session: _session, body: Partial<PostsBody>, id: string): Promise<import("../../database/entities/post.entity").Post>;
    deletePost(id: string, session: _session): Promise<{
        message: string;
    }>;
    fetchAllPosts(): Promise<import("../../database/entities/post.entity").Post[]>;
    fetchPost(id: string, session: _session): Promise<import("../../database/entities/post.entity").Post | null>;
    fetchAllPostsByUser(session: _session): Promise<import("../../database/entities/post.entity").Post[]>;
    deleteAllPostsByUser(session: _session): Promise<{
        message: string;
    }>;
}
