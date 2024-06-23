/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import { RemixServer } from "@remix-run/react";
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { I18nextProvider, initReactI18next } from "react-i18next";

import i18n from "@/i18n";
import i18next, { lngs } from "@/i18next.server";
import { getLangFromPathname } from "@/utils/i18n";

import type { EntryContext } from "@remix-run/cloudflare";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const instance = createInstance();
  const lng = await getLangFromPathname(request);
  const ns = i18next.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next)
    .use(resourcesToBackend(lngs))
    .init({
      ...i18n,
      lng, // The locale we detected from the request
      ns,
    });

  const body = await renderToReadableStream(
    <I18nextProvider i18n={instance}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>,
    {
      signal: request.signal,
      onError(error: unknown) {
        // Log streaming rendering errors from inside the shell
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );

  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
