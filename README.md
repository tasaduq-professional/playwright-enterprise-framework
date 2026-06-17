# Playwright API Automation Framework

A scalable API Automation Framework built with Playwright and TypeScript.

## Highlights

- Generic API client wrapper
- Reusable domain API modules
- Externalized test data
- Centralized endpoint management
- Playwright test runner + HTML report
- MCP helpers for automation and tooling

---

## Project Structure (current)

```text
package.json
playwright.config.ts
api/
  userApi_Client.ts
endpoints/
  userApiEndpoints.ts
mcp/
  playwrightRunner.ts
  ragService.ts
  server.ts
playwright-report/
  index.html
testData/
  paymentApiData.ts
  userApiData.ts
tests/
  user.spec.ts
utils/
  ApiClient.ts
```

---

## Quickstart

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd FreshFamework
npm install
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Run a single test file:

```bash
npx playwright test tests/user.spec.ts
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Open the Playwright HTML report:

```bash
open playwright-report/index.html
# or
npx playwright show-report
```

---

## Key Files

- API client: utils/ApiClient.ts
- Domain API: api/userApi_Client.ts
- Endpoints: endpoints/userApiEndpoints.ts
- Tests: tests/user.spec.ts
- Test data: testData/userApiData.ts, testData/paymentApiData.ts
- MCP server & runner: mcp/server.ts, mcp/playwrightRunner.ts

---

## API Usage Examples

Generic `ApiClient` supports standard REST methods (GET, POST, PUT, PATCH, DELETE).

Example:

```typescript
const res = await apiClient.getMethod(userEndpoint, headers);
const create = await apiClient.postMethod(registerEndpoint, headers, payload);
```

Endpoints example:

```typescript
export const userApiEndpoints = {
  getUsers: '/api/users',
  registerUser: '/api/register'
};
```

---

## MCP Integration

This repo exposes an MCP-compatible server to run tests and open the report programmatically.

- Server: mcp/server.ts
- Runner: mcp/playwrightRunner.ts

Start the MCP server locally:

```bash
npx tsx mcp/server.ts
```

Notes:

- Ensure `tsx` is installed (dev dependency) or use `npx tsx`.

- The MCP tools include `run_playwright_tests` and `show_playwright_report`.

---

## RAG (Retrieval-Augmented Generation)

This project includes a RAG helper implementation used to enrich test diagnostics, assist with environment-specific Q&A, and augment reports with retrieved context.

- Implementation: `mcp/ragService.ts`
- Purpose: retrieve relevant artifacts or documents and generate contextualized text using a configured LLM provider.
- Basic usage: set any required provider keys as environment variables (for example `OPENAI_API_KEY`) and update vector-store or index paths inside `mcp/ragService.ts` as needed. Start the MCP server and invoke the RAG utilities via the MCP client or import `mcp/ragService.ts` from scripts.

Notes:

- RAG depends on an LLM provider and an index/vector store; ensure credentials and storage paths are configured before using.
- See `mcp/ragService.ts` for implementation details and provider-specific setup instructions.

---

## Contributing

1. Open an issue or feature request.
2. Create a branch for your change.
3. Add tests and update `testData` as needed.
4. Submit a pull request.

---

## Changelog

- 2026-06-17: README updated to reflect current file names and structure.

---

## Author

Tasaduq Hussain — Lead SDET | Playwright | TypeScript
