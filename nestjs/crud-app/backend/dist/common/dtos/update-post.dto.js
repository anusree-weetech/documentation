"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePost = void 0;
const swagger_1 = require("@nestjs/swagger");
const posts_body_dto_1 = require("./posts-body.dto");
class UpdatePost extends (0, swagger_1.PartialType)(posts_body_dto_1.PostsBody) {
}
exports.UpdatePost = UpdatePost;
//# sourceMappingURL=update-post.dto.js.map