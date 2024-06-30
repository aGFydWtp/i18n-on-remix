import { createRequestHandler, logDevReady } from "@remix-run/cloudflare";
import * as build from "@remix-run/dev/server-build";
import { Hono } from "hono";
import { handle, serveStatic } from "hono/cloudflare-pages";
import { csrf } from "hono/csrf";

export type Env = {
  Bindings: {
    ENV: string;
  };
};

const remixHandler = createRequestHandler(build, process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  logDevReady(build);
}

const server = new Hono<Env>();

server.use(csrf());

// get locale files
server.get("/locales/*", serveStatic());

server.mount("/", remixHandler, (c) => ({ env: c.env }));

export const onRequest = handle(server);
