import { useTranslation } from "react-i18next";
import { ArrowDown, ArrowUp, ExternalLink } from "lucide-react";
import type { Lead } from "@/lib/leads";
import { useLeadStore } from "@/store/useLeadStore";

const COLS = [
  { key: "nome", label: "name" },
  { key: "endereco", label: "address" },
  { key: "instagram", label: "instagram" },
  { key: "site", label: "site" },
  { key: "telefone", label: "phone" },
  { key: "nota", label: "rating" },
  { key: "categoria", label: "category" },
] as const;

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const { t } = useTranslation();
  const { sortKey, sortAsc, toggleSort, selected, toggleSelect, setSelection } = useLeadStore();
  const allSelected = leads.length > 0 && leads.every((l) => selected.includes(l.id));

  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold">
          {leads.length} {t("leads")}
        </h3>
        <span className="text-xs text-muted-foreground">
          {selected.length} {t("selected")}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2/60">
              <th className="w-10 px-3 py-2.5">
                <input
                  type="checkbox"
                  aria-label={t("selectAll")}
                  className="h-4 w-4 accent-[var(--gold)]"
                  checked={allSelected}
                  onChange={(e) => setSelection(e.target.checked ? leads.map((l) => l.id) : [])}
                />
              </th>
              {COLS.map((c) => (
                <th
                  key={c.key}
                  onClick={() => toggleSort(c.key)}
                  className="cursor-pointer whitespace-nowrap px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-gold"
                >
                  {t(c.label)}
                  {sortKey === c.key &&
                    (sortAsc ? (
                      <ArrowUp className="ml-1 inline h-3 w-3 text-gold" />
                    ) : (
                      <ArrowDown className="ml-1 inline h-3 w-3 text-gold" />
                    ))}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-b border-border/60 transition-colors hover:bg-surface-2/50">
                <td className="px-3 py-2.5">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[var(--gold)]"
                    checked={selected.includes(l.id)}
                    onChange={() => toggleSelect(l.id)}
                  />
                </td>
                <td className="px-3 py-2.5 font-medium">{l.nome}</td>
                <td className="px-3 py-2.5 text-xs text-muted-foreground">{l.endereco}</td>
                <td className="px-3 py-2.5">
                  {l.instagram ? (
                    <a href={l.instagram} target="_blank" rel="noreferrer" className="text-gold hover:underline">
                      {t("open")} <ExternalLink className="inline h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-3 py-2.5">
                  {l.site ? (
                    <a href={l.site} target="_blank" rel="noreferrer" className="text-gold hover:underline">
                      {t("open")} <ExternalLink className="inline h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 text-muted-foreground">{l.telefone ?? "—"}</td>
                <td className="px-3 py-2.5">{l.nota === null ? "—" : l.nota.toFixed(1)}</td>
                <td className="px-3 py-2.5">
                  <span className="rounded-full border border-gold/30 px-2 py-0.5 text-[11px] text-gold">
                    {t(`cat.${l.categoria}`)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {leads.length === 0 && (
        <p className="px-4 py-10 text-center text-sm text-muted-foreground">{t("noResults")}</p>
      )}
    </div>
  );
}
