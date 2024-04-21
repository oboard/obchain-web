import { kv } from "@vercel/kv";
import { getTranslations } from "next-intl/server";

export default async function NowHeight() {
  const height = Number(await kv.get("height") ?? 0);

  const t = await getTranslations("common");

  return (
    <p className="text-sm text-gray-500">
      {t("height")} {Intl.NumberFormat("en-us").format(height)}
    </p>
  );
}
