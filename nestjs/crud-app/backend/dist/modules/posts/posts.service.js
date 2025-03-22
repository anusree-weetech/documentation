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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("../../database/entities/post.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
let PostsService = class PostsService {
    postsRepository;
    userService;
    constructor(postsRepository, userService) {
        this.postsRepository = postsRepository;
        this.userService = userService;
    }
    async fetchPostById(id, userId) {
        return await this.postsRepository.findOne({
            where: { id, user: { id: userId } },
            relations: ['user'],
        });
    }
    async addPostByUser(body, userId) {
        const user = await this.userService.findUser('', userId);
        const post = this.postsRepository.create({ user, ...body });
        return this.postsRepository.save(post);
    }
    async editPostById(id, userId, body) {
        const post = await this.postsRepository.findOne({
            where: { id, user: { id: userId } },
            relations: ['user'],
        });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        Object.assign(post, body);
        return await this.postsRepository.save(post);
    }
    async deletePostById(id, userId) {
        const post = await this.postsRepository.findOne({
            where: { id, user: { id: userId } },
            relations: ['user'],
        });
        if (!post)
            throw new common_1.NotFoundException('Post not found to delete');
        return await this.postsRepository.remove(post);
    }
    async fetchAllPosts() {
        return await this.postsRepository.find();
    }
    async fetchAllPostsByUser(userId) {
        return await this.postsRepository.find({
            where: { user: { id: userId } },
            relations: ['user'],
        });
    }
    async deleteAllPostsByUser(userId) {
        return await this.postsRepository.delete({ user: { id: userId } });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], PostsService);
//# sourceMappingURL=posts.service.js.map