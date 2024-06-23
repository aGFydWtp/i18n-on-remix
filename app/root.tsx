import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next/react";

import styles from "@/index.css";
import { getLangFromPathname } from "@/utils/i18n";

import type { LinksFunction, LoaderFunction } from "@remix-run/cloudflare";

export interface Env {
  ENV: string;
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
];

export const loader = (async ({ request }) => {
  const locale = await getLangFromPathname(request);
  return { locale };
}) satisfies LoaderFunction;

export default function App() {
  const { locale } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const { t, i18n } = useTranslation();
  const error = useRouteError();

  const message = useMemo(() => {
    if (error instanceof Error) {
      return error.message;
    }
    return undefined;
  }, [error]);

  return (
    <html lang={i18n.language} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div>
          <h1>{t("errorMessage")}</h1>
          {message && <p>{message}</p>}
        </div>
        <Scripts />
      </body>
    </html>
  );
}
