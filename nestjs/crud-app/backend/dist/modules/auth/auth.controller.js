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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const express_session_1 = require("express-session");
const auth_credential_dto_1 = require("../../common/dtos/auth-credential.dto");
const auth_service_1 = require("./auth.service");
const docs_decorator_1 = require("../../common/decorators/docs.decorator");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async signup(body, session) {
        const { email, password } = body;
        const user = await this.authService.signup(email, password);
        session.user = { email: user.email, id: user.id };
        return user;
    }
    async signin(body, session) {
        const { email, password } = body;
        const user = await this.authService.signin(email, password);
        session.user = { email: user.email, id: user.id };
        return user;
    }
    logout(session) {
        if (!session.user) {
            return { message: 'No active session found' };
        }
        if (session) {
            session.destroy((err) => {
                if (err) {
                    console.error('Error destroying session:', err);
                }
            });
        }
        return { message: 'Logged out successfully' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, docs_decorator_1.ApiDocs)({
        summary: 'User Signup',
        successStatus: 201,
        successExample: {
            id: { type: 'integer', example: 1 },
            email: { type: 'string', example: 'user@example.com' },
        },
        errorResponses: [
            {
                status: 409,
                message: 'Conflict - User already exists',
            },
        ],
    }),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credential_dto_1.AuthCredentialDto, typeof (_a = typeof express_session_1.Session !== "undefined" && express_session_1.Session) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, docs_decorator_1.ApiDocs)({
        summary: 'User Signin',
        successStatus: 200,
        successExample: {
            id: { type: 'integer', example: 1 },
            email: { type: 'string', example: 'user@example.com' },
        },
        errorResponses: [
            {
                status: 401,
                message: 'Unauthorized - Invalid credentials',
            },
        ],
    }),
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credential_dto_1.AuthCredentialDto, typeof (_b = typeof express_session_1.Session !== "undefined" && express_session_1.Session) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
__decorate([
    (0, docs_decorator_1.ApiDocs)({
        summary: 'User Logout',
        successStatus: 200,
        successExample: {
            message: { type: 'string', example: 'Logged out successfully' },
        },
        errorResponses: [
            {
                status: 400,
                message: 'Bad Request - No active session found',
            },
        ],
    }),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof express_session_1.Session !== "undefined" && express_session_1.Session) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map