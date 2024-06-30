import { useParams } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import { Header } from "@/components/header";
import { css } from "@/styled-system/css";
import { stack } from "@/styled-system/patterns";

export default function About() {
  const { lang = "" } = useParams();
  const { t } = useTranslation("about");

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
