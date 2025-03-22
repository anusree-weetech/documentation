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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const express_session_1 = require("express-session");
const docs_decorator_1 = require("../../common/decorators/docs.decorator");
const session_guard_1 = require("../../common/guards/session.guard");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    DeleteUser(session) {
        return this.userService.deleteUser(session.user.id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, docs_decorator_1.ApiDocs)({
        summary: 'Delete current user',
        successStatus: 200,
        successExample: {
            message: { type: 'string', example: 'Deleted user with ID: 123' },
        },
        errorResponses: [{ status: 404, message: 'User not found' }],
    }),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_session_1.Session !== "undefined" && express_session_1.Session) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "DeleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map