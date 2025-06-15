import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function isSchemaObject(
  obj: SchemaObject | ReferenceObject,
): obj is SchemaObject {
  return !('$ref' in obj);
}
