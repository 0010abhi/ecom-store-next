# Testing Guide

This project includes comprehensive testing setup with **Unit Tests**, **Component Tests**, and **Functional/Integration Tests**.

## 📦 Testing Stack

- **Jest** - Test runner and assertion library
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers for DOM
- **node-mocks-http** - HTTP mocking for API tests

## 🚀 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode (auto-reruns on file changes)
```bash
npm run test:watch
```

### Run specific test suites
```bash
# Unit tests only
npm run test:unit

# Component tests only
npm run test:component

# API tests only
npm run test:api

# Integration tests only
npm run test:integration
```

### Generate coverage report
```bash
npm run test:coverage
```

This generates a coverage report in the `coverage/` directory showing:
- Statement coverage
- Branch coverage
- Line coverage
- Function coverage

## 📁 Test Structure

```
app/
├── __tests__/
│   ├── unit/
│   │   └── helpers.test.ts              # Utility function tests
│   ├── components/
│   │   └── CartButton.test.tsx          # React component tests
│   ├── api/
│   │   └── auth.test.ts                 # API route handler tests
│   └── integration/
│       └── auth-flow.test.tsx           # End-to-end flow tests
├── _utils/
│   └── helpers.ts                       # Utility functions to test
└── _context/
    └── AuthContext.tsx                  # Auth context (tested via integration)
```

## 🧪 Test Types

### 1. Unit Tests (`unit/`)
Test individual functions and utilities in isolation.

**Example: `helpers.test.ts`**
```typescript
describe('validateEmail', () => {
  it('should validate correct email addresses', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });
});
```

**Running:**
```bash
npm run test:unit
```

### 2. Component Tests (`components/`)
Test React components in isolation using React Testing Library.

**Example: `CartButton.test.tsx`**
```typescript
it('should render cart button with emoji', () => {
  render(<CartButton />);
  const link = screen.getByRole('link');
  expect(link.textContent).toContain('🛒');
});
```

**Key Testing Library APIs:**
- `render()` - Render component
- `screen.getBy*()` - Query elements
- `fireEvent` - Simulate user interactions
- `waitFor()` - Wait for async operations

**Running:**
```bash
npm run test:component
```

### 3. API Tests (`api/`)
Test API route handlers and business logic.

**Example: `auth.test.ts`**
```typescript
it('should return 200 on successful login', async () => {
  const response = await mockLoginHandler(request);
  expect(response.status).toBe(200);
});
```

**Running:**
```bash
npm run test:api
```

### 4. Integration Tests (`integration/`)
Test complete user flows involving multiple components/services.

**Example: `auth-flow.test.tsx`**
```typescript
it('should handle successful login flow', () => {
  // Test complete login → dashboard flow
});
```

**Running:**
```bash
npm run test:integration
```

## 📝 Writing Tests

### Unit Test Template
```typescript
describe('Function Name', () => {
  it('should do something specific', () => {
    const result = functionUnderTest(input);
    expect(result).toBe(expectedValue);
  });

  it('should handle edge cases', () => {
    expect(functionUnderTest(edgeCase)).toBe(expected);
  });
});
```

### Component Test Template
```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interaction', () => {
    render(<ComponentName />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('Updated')).toBeInTheDocument();
  });
});
```

### API Test Template
```typescript
describe('API Endpoint', () => {
  it('should return expected response', async () => {
    const request = new NextRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    const response = await handler(request);
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('success', true);
  });
});
```

## 🎯 Testing Best Practices

### ✅ Do's
- Test behavior, not implementation
- Use descriptive test names
- Keep tests focused and isolated
- Use semantic queries (getByRole, getByLabelText)
- Test error cases
- Mock external dependencies

### ❌ Don'ts
- Don't test implementation details
- Don't use `getByTestId` excessively
- Don't write tests that depend on other tests
- Don't test third-party libraries
- Don't use hardcoded waits (setTimeout)

## 🔧 Configuration

### jest.config.ts
- Configures Jest runner
- Sets up TypeScript support
- Defines module aliases
- Sets test file patterns

### jest.setup.ts
- Imports testing utilities
- Mocks Next.js modules (router, image)
- Sets up environment variables for tests
- Configures global mocks

## 📊 Coverage Goals

Aim for:
- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

View coverage:
```bash
npm run test:coverage
# Open coverage/lcov-report/index.html in browser
```

## 🐛 Debugging Tests

### Run single test file
```bash
npm test -- helpers.test.ts
```

### Run tests matching pattern
```bash
npm test -- --testNamePattern="validateEmail"
```

### Debug in Node
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

## 🚀 CI/CD Integration

Add to your CI pipeline (GitHub Actions, etc.):
```yaml
- name: Run tests
  run: npm test -- --coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/lcov.info
```

## 📚 Useful Resources

- [Jest Documentation](https://jestjs.io)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Next.js Testing](https://nextjs.org/docs/testing)

## ⚡ Example Test Run

```bash
$ npm test

 PASS  app/__tests__/unit/helpers.test.ts
  Utility Functions - Unit Tests
    validateEmail
      ✓ should validate correct email addresses (2 ms)
      ✓ should reject invalid email addresses (1 ms)
    validatePassword
      ✓ should validate passwords with 3+ characters (1 ms)
      ✓ should reject short passwords (1 ms)
    calculateDiscount
      ✓ should calculate discounts correctly (1 ms)
    formatPrice
      ✓ should format prices correctly (1 ms)

 PASS  app/__tests__/components/CartButton.test.tsx
  CartButton Component
    ✓ should render cart button (5 ms)
    ✓ should have correct href (2 ms)

 PASS  app/__tests__/api/auth.test.ts
  Login API Route
    ✓ should return 400 if credentials missing (3 ms)
    ✓ should return 401 if invalid (2 ms)
    ✓ should return 200 on success (2 ms)

Tests:       13 passed, 13 total
```

## 🤝 Contributing Tests

When adding new features:
1. Write tests first (TDD approach)
2. Implement the feature
3. Ensure all tests pass
4. Run coverage to check coverage goals
5. Commit with test changes

## Questions?

Refer to the test files in `app/__tests__/` for working examples!
