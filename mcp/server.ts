import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getRequirementDetails } from "./ragService";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import {
  runPlaywrightTests,
  showPlaywrightReport,
  runSpecificTestSpec,
} from "./playwrightRunner";

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

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "run_playwright_tests",
      description: "MUST use this tool to execute Playwright tests. Do not use terminal commands directly.",
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
    {
      name: "run_specific_spec_tests",
      description: "Run Specific Test spec",
      inputSchema: {
        type: "object",
        properties: {
          testFile: {
            type: "string",
            description: "Test file name",
          },
        },
        required: ["testFile"],
      },
    },
    {
      name: "get_requirement_details",
      description: "MUST use this tool to retrieve requirement details from markdown requirement files.",
      inputSchema: {
        type: "object",
        properties: {
          epicName: {
            type: "string",
            description: "Epic file name without .md",
          },
        },
        required: ["epicName"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;

  if (toolName === "run_playwright_tests") {
    console.error("MCP TOOL EXECUTED: run_playwright_tests");
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
    console.error("MCP TOOL EXECUTED: show_playwright_report");

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

  if (toolName === "get_requirement_details") {
    console.error("MCP TOOL EXECUTED: get_requirement_details");
    const epicName = request.params.arguments?.epicName as string;
    const result = await getRequirementDetails(epicName);
    return {
      content: [
        {
          type: "text",
          text: result,
        },
      ],
    };
  }

  if (toolName === "run_specific_spec_tests") {
    console.error("Running Spec file test cases...");
    console.error("MCP TOOL EXECUTED: run_specific_spec_tests");

    const testFile = request.params.arguments?.testFile as string;

    if (!testFile) {
      throw new Error("Missing required parameter: testFile");
    }

    const result = await runSpecificTestSpec(testFile);

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
});

async function main() {
  const transport = new StdioServerTransport();

  await server.connect(transport);

  console.error("MCP Server Started");
}

main().catch(console.error);