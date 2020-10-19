import { serve } from "./deps.ts";

const PORT = 1993;
const s = serve(`0.0.0.0:${PORT}`);
const body = new TextEncoder().encode("Hello World\n");

console.log(`Server started on port ${PORT}`);
//for await (const req of s) {
//  req.respond({ body });
//}

import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Hello World!
app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: PORT });
