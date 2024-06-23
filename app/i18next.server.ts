import resourcesToBackend from "i18next-resources-to-backend";
import { RemixI18Next } from "remix-i18next/server";

import i18n from "@/i18n";

import enAbout from "public/locales/en/about.json";
import enCommon from "public/locales/en/common.json";
import enTop from "public/locales/en/top.json";
import jaAbout from "public/locales/ja/about.json";
import jaCommon from "public/locales/ja/common.json";
import jaTop from "public/locales/ja/top.json";

export const lngs = {
  en: {
    common: enCommon,
    top: enTop,
    about: enAbout,
  },
  ja: {
    common: jaCommon,
    top: jaTop,
    about: jaAbout,
  },
};

const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
  },
  i18next: {
    ...i18n,
  },
  backend: resourcesToBackend(lngs),
});

export default i18next;
