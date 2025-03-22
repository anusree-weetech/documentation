"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const express_session_1 = require("express-session");
const docs_decorator_1 = require("../../common/decorators/docs.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const posts_body_dto_1 = require("../../common/dtos/posts-body.dto");
const session_guard_1 = require("../../common/guards/session.guard");
const posts_service_1 = require("./posts.service");
let PostsController = class PostsController {
    postsService;
    constructor(postsService) {
        this.postsService = postsService;
    }
    async addPost(body, session) {
        return this.postsService.addPostByUser(body, session.user.id);
    }
    updatePost(session, body, id) {
        return this.postsService.editPostById(parseInt(id), session.user.id, body);
    }
    async deletePost(id, session) {
        await this.postsService.deletePostById(parseInt(id), session.user.id);
        return { message: `Deleted post of id: ${id}` };
    }
    fetchAllPosts() {
        return this.postsService.fetchAllPosts();
    }
    fetchPost(id, session) {
        return this.postsService.fetchPostById(parseInt(id), session.user.id);
    }
    fetchAllPostsByUser(session) {
        return this.postsService.fetchAllPostsByUser(session.user.id);
    }
    async deleteAllPostsByUser(session) {
        await this.postsService.deleteAllPostsByUser(session.user.id);
        return { message: `Deleted all posts of user: ${session.user.id}` };
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, docs_decorator_1.ApiDocs)({
        summary: 'Create a new post',
        successStatus: 201,
        successExample: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'My first post' },
            body: { type: 'string', example: 'This is the content of the post' },
        },
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_body_dto_1.PostsBody, typeof (_a = typeof express_session_1.Session !== "undefined" && express_session_1.Session) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "addPost", null);
__decorate([
    (0, docs_decorator_1.ApiDocs)({
        summary: 'Update a post',
        successStatus: 200,
        successExample: {
            id: { type: 'integer', example: 123 },
            title: { type: 'string', example: 'Updated post title' },
            body: { type: 'string', example: 'Updated post content' },
        },
        errorResponses: [{ status: 404, message: 'Post not found' }],
        params: [{ name: 'id', example: 123, required: true }],
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_session_1.Session !== "undefined" && express_session_1.Session) === "function" ? _b : Object, Object, String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, docs_decorator_1.ApiDocs)({
        summary: 'Delete a post by ID',
        successStatus: 200,
        successExample: {
            message: { type: 'string', example: 'Deleted post of id: 123' },
        },
        errorResponses: [{ status: 404, message: 'Post not found to delete' }],
        params: [{ name: 'id', example: 123, required: true }],
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof express_session_1.Session !== "undefined" && express_session_1.Session) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
__decorate([
    (0, docs_decorator_1.ApiDocs)({
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
    }),
    (0, common_1.Get)('all'),
    (0, public_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "fetchAllPosts", null);
__decorate([
    (0, docs_decorator_1.ApiDocs)({
        summary: 'Fetch a post by ID',
        successStatus: 200,
        successExample: {
            id: { type: 'integer', example: 123 },
            title: { type: 'string', example: 'Post title' },
            body: { type: 'string', example: 'Post content' },
        },
        errorResponses: [{ status: 404, message: 'Post not found' }],
        params: [{ name: 'id', example: 123, required: true }],
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof express_session_1.Session !== "undefined" && express_session_1.Session) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "fetchPost", null);
__decorate([
    (0, docs_decorator_1.ApiDocs)({
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
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof express_session_1.Session !== "undefined" && express_session_1.Session) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "fetchAllPostsByUser", null);
__decorate([
    (0, docs_decorator_1.ApiDocs)({
        summary: 'Delete all posts by a user',
        successStatus: 200,
        successExample: {
            message: {
                type: 'string',
                example: 'Deleted all posts of user: 1',
            },
        },
    }),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof express_session_1.Session !== "undefined" && express_session_1.Session) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deleteAllPostsByUser", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, swagger_1.ApiExtraModels)(posts_body_dto_1.PostsBody),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map