

## ✅ 1. **Jest** (Most popular for React and general JS/TS)

### 🔧 Setup (if needed)

```bash
npm install --save-dev jest ts-jest @types/jest
```

Add to `package.json`:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

### 📄 `sum.ts`

```ts
export function sum(a: number, b: number): number {
  return a + b;
}
```

### 📄 `sum.test.ts`

```ts
import { sum } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```



## ✅ 2. **Mocha** (Classic JS test runner, often paired with Chai for assertions)

### 🔧 Setup

```bash
npm install --save-dev mocha chai ts-node @types/mocha @types/chai
```

Add to `package.json`:

```json
{
  "scripts": {
    "test": "mocha -r ts-node/register tests/**/*.test.ts"
  }
}
```

### 📄 `math.ts`

```ts
export function multiply(a: number, b: number): number {
  return a * b;
}
```

### 📄 `tests/math.test.ts`

```ts
import { expect } from 'chai';
import { multiply } from '../math';

describe('multiply()', () => {
  it('should return 15 for 3 * 5', () => {
    expect(multiply(3, 5)).to.equal(15);
  });
});
```



## ✅ 3. **Vitest** (Vite-native, fast and modern testing for JS/TS)

### 🔧 Setup (in a Vite project)

```bash
npm install --save-dev vitest
```

Add to `vite.config.ts`:

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});
```

Add to `package.json`:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

### 📄 `greet.ts`

```ts
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

### 📄 `greet.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { greet } from './greet';

describe('greet()', () => {
  it('greets a user by name', () => {
    expect(greet('Anu')).toBe('Hello, Anu!');
  });
});
```



### 🔁 Summary Table

| Framework  | Setup Complexity | Speed      | TS Support | Best Use Case             |
| ---------- | ---------------- | ---------- | ---------- | ------------------------- |
| **Jest**   | Medium           | Fast       | Excellent  | React apps, general TS/JS |
| **Mocha**  | Simple/Classic   | Slower     | Good       | Legacy projects           |
| **Vitest** | Easy (w/ Vite)   | Super fast | Excellent  | Vite-based TS/JS apps     |

