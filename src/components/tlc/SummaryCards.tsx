import { useTranslation } from "react-i18next";
import type { Lead } from "@/lib/leads";

export function SummaryCards({ leads }: { leads: Lead[] }) {
  const { t } = useTranslation();
  const total = leads.length;
  const pct = (n: number) => (total ? `${Math.round((n / total) * 100)}%` : "0%");
  const rated = leads.filter((l) => l.nota !== null);
  const avg = rated.length
    ? (rated.reduce((a, l) => a + (l.nota ?? 0), 0) / rated.length).toFixed(1)
    : "—";

  const cards = [
    { label: t("totalLeads"), value: String(total) },
    { label: t("withInstagram"), value: pct(leads.filter((l) => l.instagram).length) },
    { label: t("withSite"), value: pct(leads.filter((l) => l.site).length) },
    { label: t("avgRating"), value: avg },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className="panel p-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{c.label}</p>
          <p className="gold-text mt-2 font-display text-3xl font-semibold">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
