import { LoaderFunction } from "@remix-run/cloudflare";
import { useParams } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import { Header } from "@/components/header";
import { css } from "@/styled-system/css";
import { stack } from "@/styled-system/patterns";
import { getLang } from "@/utils/i18n";

export const loader = (async ({ params }) => {
  getLang(params);
  return null;
}) satisfies LoaderFunction;

export default function About() {
  const { lang = "" } = useParams();
  const { t, ready } = useTranslation("about");

  if (!ready) {
    return null;
  }
  return (
    <>
      <Header />
      <div className={stack({ p: 4, gap: 4 })}>
        <h1 className={css({ fontSize: "1.2rem", fontWeight: "medium" })}>
          {t("title")}
        </h1>
        <a className={css({ textDecoration: "underline" })} href={`/${lang}`}>
          {t("gotoTopPage")}
        </a>
      </div>
    </>
  );
}
