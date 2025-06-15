import { applyDecorators } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

export function ApiDocs({
  summary,
  successStatus,
  successExample,
  errorResponses,
  params,
  queries,
}: {
  summary?: string;
  successStatus?: number;
  successExample?: Record<string, any>;
  errorResponses?: { status: number; message: string }[];
  params?: { name: string; example: any; required?: boolean }[];
  queries?: { name: string; example: any; required?: boolean }[];
} = {}) {
  const decorators: MethodDecorator[] = [];

  if (summary) {
    decorators.push(ApiOperation({ summary }));
  }

  if (successStatus && successExample) {
    decorators.push(
      ApiResponse({
        status: successStatus,
        description: 'Success',
        content: {
          'application/json': {
            schema: { type: 'object', properties: successExample },
          },
        },
      }),
    );
  }

  if (errorResponses && errorResponses.length) {
    decorators.push(
      ...errorResponses.map(({ status, message }) =>
        ApiResponse({
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
        }),
      ),
    );
  }

  if (params?.length) {
    decorators.push(
      ...params.map(({ name, example, required = true }) =>
        ApiParam({ name, example, required }),
      ),
    );
  }

  if (queries?.length) {
    decorators.push(
      ...queries.map(({ name, example, required = true }) =>
        ApiQuery({ name, example, required }),
      ),
    );
  }

  if (
    summary ||
    successStatus ||
    successExample ||
    errorResponses?.length||
    params?.length ||
    queries?.length
  ) {
    decorators.push(
      ApiConsumes(
        'application/x-www-form-urlencoded',
        'application/json',
        'multipart/form-data',
      ),
    );
  }

  return applyDecorators(...decorators);
}
