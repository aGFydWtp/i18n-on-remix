import { LoaderFunction } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";

import { getLang } from "@/utils/i18n";

export const loader = (async ({ params }) => {
  getLang(params);
  return null;
}) satisfies LoaderFunction;

export default function Base() {
  return <Outlet />;
}
