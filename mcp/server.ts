import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { runPlaywrightTests, showPlaywrightReport } from "./playwrightRunner.ts";

const server = new Server(
  {
    name: "playwright-enterprise-framework",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(
  ListToolsRequestSchema,
  async () => ({
    tools: [
      {
        name: "run_playwright_tests",
        description: "Run all Playwright tests in the framework",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
    name: "show_playwright_report",
    description: "Open Playwright HTML report",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  ],
  })
);

server.setRequestHandler(
  CallToolRequestSchema,
  async (request) => {
    const toolName = request.params.name;

    if (toolName === "run_playwright_tests") {
      console.error("Running Playwright Tests...");

      const result = await runPlaywrightTests();

      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    }

    if (toolName === "show_playwright_report") {
      console.error("Opening Playwright Report...");

      const result = await showPlaywrightReport();

      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${toolName}`);
  }
);
async function main() {
  const transport = new StdioServerTransport();

  await server.connect(transport);

  console.error("MCP Server Started");
}

main().catch(console.error);