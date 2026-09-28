import { useTranslation } from "react-i18next";
import { RotateCcw } from "lucide-react";
import { CATEGORIES } from "@/lib/leads";
import { useLeadStore } from "@/store/useLeadStore";

export function FiltersSidebar({ hasRatings }: { hasRatings: boolean }) {
  const { t } = useTranslation();
  const s = useLeadStore();

  const toggles = [
    { key: "fInstagram", label: t("hasInstagram") },
    { key: "fSite", label: t("hasSite") },
    { key: "fPhone", label: t("hasPhone") },
  ] as const;

  return (
    <aside className="panel h-fit p-4 lg:sticky lg:top-24">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-gold">
        {t("filters")}
      </h2>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{t("minRating")}</span>
          <span className="text-foreground">{s.minRating.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          disabled={!hasRatings}
          value={s.minRating}
          onChange={(e) => s.set("minRating", Number(e.target.value))}
          className="w-full accent-[var(--gold)] disabled:opacity-40"
        />
      </div>

      <div className="mt-5 space-y-2.5">
        {toggles.map((tg) => (
          <label key={tg.key} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 accent-[var(--gold)]"
              checked={s[tg.key]}
              onChange={(e) => s.set(tg.key, e.target.checked)}
            />
            {tg.label}
          </label>
        ))}
      </div>

      <div className="mt-5">
        <label className="mb-1.5 block text-xs text-muted-foreground">{t("category")}</label>
        <select
          className="field w-full"
          value={s.fCategory}
          onChange={(e) => s.set("fCategory", e.target.value)}
        >
          <option value="all">{t("all")}</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {t(`cat.${c}`)}
            </option>
          ))}
        </select>
      </div>

      <button onClick={s.clearFilters} className="btn-ghost-gold mt-5 w-full px-3 py-2 text-xs">
        <RotateCcw className="mr-1.5 inline h-3.5 w-3.5" />
        {t("clearFilters")}
      </button>
    </aside>
  );
}
