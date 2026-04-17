# Project documentation

This folder tracks **features**, **environment**, and **MCP-style** descriptors for **Panda ❤️ Bamboo** (`panda-bamboo`).

| Path | Purpose |
|------|---------|
| [`FEATURES.md`](FEATURES.md) | What the app implements (storefront, Stripe, admin, APIs). |
| [`mcp/server-instructions.md`](mcp/server-instructions.md) | Agent/workflow instructions for this repo. |
| [`mcp/project-context.md`](mcp/project-context.md) | Stack, routes, auth, data model — keep in sync with code. |
| [`mcp/cursor-mcp.config.example.json`](mcp/cursor-mcp.config.example.json) | Example Cursor MCP server block. |
| [`mcp/resources/registry.json`](mcp/resources/registry.json) | Resource URIs → repo paths. |
| [`mcp/tools/registry.json`](mcp/tools/registry.json) | HTTP API tool index + per-tool JSON files. |
| [`mcp/env.reference.md`](mcp/env.reference.md) | Environment variables (no secrets). |
| [`mcp/manifest.json`](mcp/manifest.json) | Doc index manifest for tooling. |

These files are **not** auto-loaded by the IDE unless you wire MCP or copy snippets into your user config.
