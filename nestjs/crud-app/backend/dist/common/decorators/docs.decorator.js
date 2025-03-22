"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDocs = ApiDocs;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function ApiDocs({ summary, successStatus, successExample, errorResponses, params, queries, } = {}) {
    const decorators = [];
    if (summary) {
        decorators.push((0, swagger_1.ApiOperation)({ summary }));
    }
    if (successStatus && successExample) {
        decorators.push((0, swagger_1.ApiResponse)({
            status: successStatus,
            description: 'Success',
            content: {
                'application/json': {
                    schema: { type: 'object', properties: successExample },
                },
            },
        }));
    }
    if (errorResponses && errorResponses.length) {
        decorators.push(...errorResponses.map(({ status, message }) => (0, swagger_1.ApiResponse)({
            status,
            description: message,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: { message: { type: 'string', example: message } },
                    },
                },
            },
        })));
    }
    if (params?.length) {
        decorators.push(...params.map(({ name, example, required = true }) => (0, swagger_1.ApiParam)({ name, example, required })));
    }
    if (queries?.length) {
        decorators.push(...queries.map(({ name, example, required = true }) => (0, swagger_1.ApiQuery)({ name, example, required })));
    }
    if (summary ||
        successStatus ||
        successExample ||
        errorResponses?.length ||
        params?.length ||
        queries?.length) {
        decorators.push((0, swagger_1.ApiConsumes)('application/x-www-form-urlencoded', 'application/json', 'multipart/form-data'));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
//# sourceMappingURL=docs.decorator.js.map