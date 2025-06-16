import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createServerFileRoute } from "@tanstack/react-start/server";
import { trpcRouter } from "@/trpc/router";

function handler({ request }: { request: Request }) {
  return fetchRequestHandler({
    req: request,
    router: trpcRouter,
    endpoint: "/api/trpc",
  });
}

export const ServerRoute = createServerFileRoute("/api/trpc/$").methods({
  GET: handler,
  POST: handler,
});
