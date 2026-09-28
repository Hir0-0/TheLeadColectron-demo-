import { useTranslation } from "react-i18next";
import { Instagram, Search } from "lucide-react";
import { CATEGORIES, REGIONS } from "@/lib/leads";
import { useLeadStore } from "@/store/useLeadStore";

export function SearchBar() {
  const { t } = useTranslation();
  const s = useLeadStore();

  return (
    <section className="panel p-4">
      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]">
        <input
          className="field w-full"
          placeholder={t("keywordPh")}
          value={s.keyword}
          onChange={(e) => s.set("keyword", e.target.value)}
          aria-label={t("keyword")}
        />
        <select
          className="field w-full"
          value={s.niche}
          onChange={(e) => s.set("niche", e.target.value)}
          aria-label={t("niche")}
        >
          <option value="all">{t("niche")}: {t("all")}</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {t(`cat.${c}`)}
            </option>
          ))}
        </select>
        <select
          className="field w-full"
          value={s.region}
          onChange={(e) => s.set("region", e.target.value)}
          aria-label={t("region")}
        >
          <option value="all">{t("region")}: {t("all")}</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button className="btn-gold px-5 py-2 text-sm">
          <Search className="mr-1.5 inline h-4 w-4" />
          {t("search")}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-border pt-3">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            className="h-4 w-4 accent-[var(--gold)]"
            checked={s.igEnabled}
            onChange={(e) => s.set("igEnabled", e.target.checked)}
          />
          {t("searchInstagram")}
        </label>
        <button
          disabled={!s.igEnabled}
          onClick={() => s.set("fInstagram", true)}
          className="btn-ghost-gold px-3 py-1.5 text-xs"
        >
          <Instagram className="mr-1.5 inline h-3.5 w-3.5" />
          {t("searchInstagram")}
        </button>
      </div>
    </section>
  );
}
