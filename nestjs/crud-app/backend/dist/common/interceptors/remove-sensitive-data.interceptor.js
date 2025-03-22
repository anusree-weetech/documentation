"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveSensitiveDataInterceptor = void 0;
const operators_1 = require("rxjs/operators");
class RemoveSensitiveDataInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            if (Array.isArray(data)) {
                data.forEach((item) => {
                    if (item.password) {
                        delete item.password;
                    }
                    else if (item.user?.password) {
                        delete item.user.password;
                    }
                });
            }
            if (data) {
                if (data.password) {
                    delete data.password;
                }
                else if (data.user?.password) {
                    delete data.user.password;
                }
            }
            return data;
        }));
    }
}
exports.RemoveSensitiveDataInterceptor = RemoveSensitiveDataInterceptor;
//# sourceMappingURL=remove-sensitive-data.interceptor.js.map