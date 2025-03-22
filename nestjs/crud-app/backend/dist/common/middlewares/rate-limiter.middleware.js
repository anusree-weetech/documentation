"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiterMiddleware = void 0;
const express_rate_limit_1 = require("express-rate-limit");
class RateLimiterMiddleware {
    limiter = (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: 'Too many requests, please try again later.',
    });
    use(req, res, next) {
        this.limiter(req, res, next);
    }
}
exports.RateLimiterMiddleware = RateLimiterMiddleware;
//# sourceMappingURL=rate-limiter.middleware.js.map