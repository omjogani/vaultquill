import { createServerFileRoute } from "@tanstack/react-start/server";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

import { server, transports } from "@/utils/demo.sse";

export const ServerRoute = createServerFileRoute("/api/sse").methods({
  // @ts-ignore
  GET: async ({}) => {
    let body = "";
    const headers: Record<string, string> = {};
    const statusCode = 200;
    const resp = {
      on: (event: string, callback: () => void) => {
        if (event === "close") {
          callback();
        }
      },
      writeHead: (statusCode: number, headers: Record<string, string>) => {
        headers = headers;
        statusCode = statusCode;
      },
      write: (data: string) => {
        body += data + "\n";
      },
    };
    const transport = new SSEServerTransport("/api/messages", resp as any);
    transports[transport.sessionId] = transport;
    transport.onerror = (error) => {
      console.error(error);
    };
    resp.on("close", () => {
      delete transports[transport.sessionId];
    });
    await server.connect(transport);
    const response = new Response(body, {
      status: statusCode,
      headers: headers,
    });
    return response;
  },
});
