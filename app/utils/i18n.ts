import { Params } from "@remix-run/react";

import i18next from "@/i18next.server";

function getPathPrefix(pathname: string) {
  return pathname.match(new RegExp("^/([^/]+)/?"))?.at(1);
}

export function getPathLang(pathname: string) {
  const pathPrefix = getPathPrefix(pathname);
  if (pathPrefix !== "ja" && pathPrefix !== "en") {
    return undefined;
  }
  return pathPrefix;
}

export function getLang(params: Params<string>, defaultLang = "ja") {
  const lang = params.lang ?? defaultLang;
  if (lang !== "ja" && lang !== "en") {
    throw new Response(null, {
      status: 404,
      statusText: `Not Found: Invalid language ${lang}`,
    });
  }
  return lang;
}

export async function getLangFromPathname(request: Request) {
  const url = new URL(request.url);
  const paramsLang = getPathLang(url.pathname);
  const locale = await i18next.getLocale(request);
  return getLang({ lang: paramsLang }, locale);
}
