import { useTranslation } from "react-i18next";
import { Download, FileText, Gem } from "lucide-react";

export function Header({
  onCsv,
  onPdf,
}: {
  onCsv: () => void;
  onPdf: () => void;
}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "pt";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/40 bg-surface-2">
            <Gem className="h-4 w-4 text-gold" />
          </span>
          <div className="leading-tight">
            <h1 className="gold-text text-lg font-semibold">{t("brand")}</h1>
            <p className="text-[11px] text-muted-foreground">{t("tagline")}</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button onClick={onCsv} className="btn-ghost-gold px-3 py-2 text-xs sm:text-sm">
            <Download className="mr-1.5 inline h-3.5 w-3.5" />
            {t("exportCsv")}
          </button>
          <button onClick={onPdf} className="btn-gold px-3 py-2 text-xs sm:text-sm">
            <FileText className="mr-1.5 inline h-3.5 w-3.5" />
            {t("exportPdf")}
          </button>
          <div className="flex overflow-hidden rounded-md border border-border">
            {(["pt", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => void i18n.changeLanguage(l)}
                className={`px-2.5 py-1.5 text-xs font-semibold uppercase transition-colors ${
                  lang === l
                    ? "bg-gold text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
