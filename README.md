# Playwright API Automation Framework

A scalable API Automation Framework built using Playwright and TypeScript.

## Features

- Generic API Client Wrapper
- Reusable API Modules
- Externalized Test Data
- Endpoint Management
- Dynamic Payload Support
- Environment Ready Structure
- Playwright Test Runner
- Easy Framework Scalability

---

## Project Structure

```text
src
│
├── api
│   ├── userApi_client.ts
│
├── endpoints
│   ├── userEndpoints.ts
│
├── testData
│   ├── userApiData.ts
│
├── utils
│   ├── ApiClient.ts
│
├── tests
│   ├── user.spec.ts
```

---

## Framework Design

```text
Test Cases
      │
      ▼
API Layer (UserApi)
      │
      ▼
ApiClient Wrapper
      │
      ▼
Playwright APIRequestContext
      │
      ▼
REST APIs
```

---

## Installation

Clone repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Install Playwright

```bash
npx playwright install
```

---

## Running Tests

Execute all tests

```bash
npx playwright test
```

Execute a specific test file

```bash
npx playwright test tests/user.spec.ts
```

Run in headed mode

```bash
npx playwright test --headed
```

Generate report

```bash
npx playwright show-report
```

---

## API Client

Generic API Wrapper located in:

```
utils/ApiClient.ts
```

Supported methods:

- GET
- POST
- PUT
- PATCH
- DELETE

Example:

```typescript
await apiClient.getMethod(endpoint, headers);

await apiClient.postMethod(endpoint, headers, payload);
```

---

## API Modules

Each business domain should have its own API class.

Example:

```
api/
├── UserApi.ts
├── PaymentApi.ts
├── BillingApi.ts
├── OrderApi.ts
```

Example Usage:

```typescript
const response = await userApi.getSingleUser(id);
```

---

## Endpoint Management

Endpoints are stored separately.

Example:

```typescript
export const userEndpoints = {
  getUsers: "/api/users",
  registerUser: "/api/register"
};
```

Benefits:

- Centralized management
- Easy maintenance
- Reduced duplication

---

## Test Data Management

Static payloads are stored separately.

Example:

```typescript
export const userApiData = {
  registration: {
    email: "eve.holt@reqres.in",
    password: "123456"
  }
};
```

Usage:

```typescript
const payload =
  userApiData.registration;
```

---

## Dynamic Payload Example

```typescript
const payload = {
  ...userApiData.registration,
  password: "567876545678"
};
```

Useful for:

- Negative testing
- Boundary testing
- Data-driven testing

---

## Sample Test

```typescript
test("Get Single User", async () => {

    const id = "2";

    const response =
        await userApi.getSingleUser(id);

    expect(
        (await response.json()).data.id
    ).toEqual(Number(id));
});
```

---

## Future Enhancements

- Environment Configuration
- Playwright Fixtures
- API Schema Validation
- Request/Response Logging
- Reporting Integration
- CI/CD Pipeline Integration
- Docker Support
- Allure Reporting
- Faker Data Generation

---

## Author

Tasaduq Hussain

Lead SDET | Playwright | TypeScript | API Automation