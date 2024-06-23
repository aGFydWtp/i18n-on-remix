import { useLocation, useNavigate } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/button";
import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";
import { getPathLang } from "@/utils/i18n";

export function Header(): JSX.Element {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header
      className={flex({
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        py: 2,
        backgroundColor: "white",
        boxShadow: "md",
      })}
    >
      <h1 className={css({ fontSize: "1.5rem", fontWeight: "bold" })}>
        i18n on Remix Sample App
      </h1>
      <div className={flex({ alignItems: "center", gap: 4 })}>
        <Button
          onClick={() => {
            if (i18n.language === "ja") return;
            i18n.changeLanguage("ja");
            navigate(
              getPathLang(pathname) === "en"
                ? pathname.replace(/^\/en/, "/ja")
                : `/ja${pathname}`
            );
          }}
        >
          <span>{t("ja")}</span>
        </Button>
        <Button
          onClick={() => {
            if (i18n.language === "en") return;
            i18n.changeLanguage("en");
            navigate(
              getPathLang(pathname) === "ja"
                ? pathname.replace(/^\/ja/, "/en")
                : `/en${pathname}`
            );
          }}
        >
          <span>{t("en")}</span>
        </Button>
      </div>
    </header>
  );
}
