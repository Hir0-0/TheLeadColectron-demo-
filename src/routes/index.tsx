import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";
import { IS_DEMO, loadLeads } from "@/lib/leads";
import { filterLeads, useLeadStore } from "@/store/useLeadStore";
import { downloadCsv } from "@/lib/export";
import { Header } from "@/components/tlc/Header";
import { SearchBar } from "@/components/tlc/SearchBar";
import { SummaryCards } from "@/components/tlc/SummaryCards";
import { Charts } from "@/components/tlc/Charts";
import { FiltersSidebar } from "@/components/tlc/FiltersSidebar";
import { LeadsTable } from "@/components/tlc/LeadsTable";
import { SavedListsPanel } from "@/components/tlc/SavedListsPanel";
import { PdfModal } from "@/components/tlc/PdfModal";

export default function Index() {
  const { t } = useTranslation();
  const store = useLeadStore();
  const [pdfOpen, setPdfOpen] = useState(false);

  useEffect(() => {
    store.loadLists();
    void loadLeads().then((leads) => {
      store.setLeads(leads);
      store.setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => filterLeads(store), [store]);
  const hasRatings = store.leads.some((l) => l.nota !== null);
  const exportRows = useMemo(() => {
    const sel = filtered.filter((l) => store.selected.includes(l.id));
    return sel.length ? sel : filtered;
  }, [filtered, store.selected]);
  
  const pdfRows = useMemo(
    () => filtered.filter((l) => store.selected.includes(l.id)),
    [filtered, store.selected],
  );

  return (
    <div className="min-h-screen">
      {IS_DEMO && (
        <div className="bg-gold/15 px-4 py-1.5 text-center text-[11px] tracking-wide text-gold">
          {t("demoBanner")}
        </div>
      )}
      <Header onCsv={() => downloadCsv(exportRows)} onPdf={() => setPdfOpen(true)} />

      <main className="mx-auto max-w-[1600px] space-y-4 px-5 py-6">
        <SearchBar />
        <SummaryCards leads={filtered} />
        <Charts leads={filtered} />

        <div className="grid gap-4 lg:grid-cols-[230px_minmax(0,1fr)_260px]">
          <FiltersSidebar hasRatings={hasRatings} />
          <LeadsTable leads={filtered} />
          <SavedListsPanel />
        </div>
      </main>

      {pdfOpen && <PdfModal leads={pdfRows} onClose={() => setPdfOpen(false)} />}
    </div>
  );
}
