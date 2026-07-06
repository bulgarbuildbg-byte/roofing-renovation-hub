// Ambient types for the MCP tools which run under Deno in the emitted edge
// function. `process.env` is provided at runtime by Deno's Node-compat layer.
declare const process: { env: Record<string, string | undefined> };
