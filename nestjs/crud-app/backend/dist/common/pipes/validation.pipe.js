"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrictValidationPipe = void 0;
const common_1 = require("@nestjs/common");
class StrictValidationPipe extends common_1.ValidationPipe {
    constructor() {
        super({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        });
    }
}
exports.StrictValidationPipe = StrictValidationPipe;
//# sourceMappingURL=validation.pipe.js.map