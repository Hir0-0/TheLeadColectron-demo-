import { useTranslation } from "react-i18next";
import { Download, X } from "lucide-react";
import type { Lead } from "@/lib/leads";
import { CATEGORIES } from "@/lib/leads";
import { downloadPdf } from "@/lib/export";

export function PdfModal({ leads, onClose }: { leads: Lead[]; onClose: () => void }) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language.startsWith("en") ? "en-US" : "pt-BR";

  const handle = () => {
    const labels: Record<string, string> = {
      tagline: t("tagline"),
      name: t("name"),
      address: t("address"),
      instagram: t("instagram"),
      site: t("site"),
      phone: t("phone"),
      rating: t("rating"),
      category: t("category"),
      generatedAt: t("generatedAt"),
      leads: t("leads"),
      locale,
    };
    for (const c of CATEGORIES) labels[`cat_${c}`] = t(`cat.${c}`);
    void downloadPdf(leads, labels);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm">
      <div className="panel flex max-h-[88vh] w-full max-w-5xl flex-col">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <h3 className="text-base font-semibold">{t("pdfPreview")}</h3>
          <button onClick={onClose} aria-label={t("cancel")} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-5">
          {leads.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">{t("pdfEmpty")}</p>
          ) : (
            <div className="rounded-lg bg-secondary p-6">
              <div className="border-b border-gold/40 pb-3">
                <p className="font-display text-xl font-semibold text-foreground">TheLeadColectron</p>
                <p className="text-xs text-gold-soft">{t("tagline")}</p>
              </div>
              <table className="mt-4 w-full text-left text-xs">
                <thead>
                  <tr className="text-[11px] uppercase tracking-[0.1em] text-gold">
                    <th className="py-2 pr-3">{t("name")}</th>
                    <th className="py-2 pr-3">{t("address")}</th>
                    <th className="py-2 pr-3">{t("instagram")}</th>
                    <th className="py-2 pr-3">{t("site")}</th>
                    <th className="py-2 pr-3">{t("phone")}</th>
                    <th className="py-2 pr-3">{t("rating")}</th>
                    <th className="py-2">{t("category")}</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} className="border-t border-border/70">
                      <td className="py-2 pr-3 font-medium">{l.nome}</td>
                      <td className="py-2 pr-3 text-muted-foreground">{l.endereco}</td>
                      <td className="py-2 pr-3 text-muted-foreground">
                        {l.instagram?.replace(/^https?:\/\/(www\.)?/, "") ?? "—"}
                      </td>
                      <td className="py-2 pr-3 text-muted-foreground">
                        {l.site?.replace(/^https?:\/\/(www\.)?/, "") ?? "—"}
                      </td>
                      <td className="py-2 pr-3 text-muted-foreground">{l.telefone ?? "—"}</td>
                      <td className="py-2 pr-3">{l.nota === null ? "—" : l.nota.toFixed(1)}</td>
                      <td className="py-2">{t(`cat.${l.categoria}`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-5 border-t border-border pt-3 text-[11px] text-muted-foreground">
                {t("generatedAt")} {new Date().toLocaleDateString(locale)} · {leads.length} {t("leads")}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t border-border px-5 py-3">
          <button onClick={onClose} className="btn-ghost-gold px-3 py-2 text-xs">
            {t("cancel")}
          </button>
          <button onClick={handle} disabled={leads.length === 0} className="btn-gold px-4 py-2 text-xs">
            <Download className="mr-1.5 inline h-3.5 w-3.5" />
            {t("download")}
          </button>
        </div>
      </div>
    </div>
  );
}
