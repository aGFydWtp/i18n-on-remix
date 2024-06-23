/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */
import { RemixBrowser } from "@remix-run/react";
import { use } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { initReactI18next } from "react-i18next";
import { getInitialNamespaces } from "remix-i18next/client";

import i18n from "@/i18n";

use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    ...i18n,
    ns: getInitialNamespaces(),
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: ["htmlTag"],
      caches: [],
    },
  })
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .then(() => {
    startTransition(() => {
      hydrateRoot(
        document,
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
      );
    });
  });
