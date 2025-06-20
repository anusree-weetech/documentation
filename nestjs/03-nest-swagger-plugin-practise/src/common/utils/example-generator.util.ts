// example-generator.util.ts

import faker from '@faker-js/faker';

export function generateExample<T extends Record<string, any>>(
  cls: new () => T,
): T {
  const instance: Record<string, any> = new cls();

  const some: string = faker.person.fullName() as string;
  console.log(some);

  for (const key of Object.keys(instance)) {
    switch (key.toLowerCase()) {
      case 'name':
        instance[key] = faker.person.fullName() as string;
        break;
      case 'email':
        instance[key] = faker.internet.email() as string;
        break;
      case 'password':
        instance[key] = faker.internet.password() as string;
        break;
      case 'id':
        instance[key] = faker.string.uuid() as string;
        break;
      case 'phone':
        instance[key] = faker.phone.number() as string;
        break;
      case 'createdat':
      case 'updatedat':
        instance[key] = faker.date.recent().toISOString();
        break;
      default:
        instance[key] = faker.lorem.word();
        break;
    }
  }

  return instance;
}
