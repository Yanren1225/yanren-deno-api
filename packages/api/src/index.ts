import { kirby } from "./kirby.ts";
import { Hono } from "$hono/mod.ts";
import { logger } from "$hono/middleware.ts";
import { bing } from "./bing.ts";
import { basic } from "./basic.ts";
import { sms } from "./sms.ts";

const hono = new Hono();

// Logger
hono.use("*", logger());

hono.use("/", (c) => {
  return c.redirect("https://doc.deno-api.imyan.ren");
});

// 404
hono.notFound((c) => {
  const path = c.req.path;
  return c.text(`Not Found ${path}`, 404);
});

kirby(hono);
bing(hono);
basic(hono);
sms(hono);

Deno.serve({ port: 8000 }, hono.fetch);
console.log("Listening on port 8000");
