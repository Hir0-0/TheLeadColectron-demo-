import type { Lead } from "@/lib/leads";

export function downloadCsv(leads: Lead[], filename = "theleadcolectron-leads.csv") {
  const headers = ["Nome", "Endereco", "Instagram", "Site", "Telefone", "Nota", "Categoria"];
  const esc = (v: string | number | null) =>
    `"${String(v ?? "").replace(/"/g, '""')}"`;
  const rows = leads.map((l) =>
    [l.nome, l.endereco, l.instagram, l.site, l.telefone, l.nota, l.categoria].map(esc).join(","),
  );
  const csv = "\uFEFF" + [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function downloadPdf(leads: Lead[], labels: Record<string, string>) {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const width = doc.internal.pageSize.getWidth();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(20, 20, 20);
  doc.text("TheLeadColectron", 40, 46);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(140, 120, 60);
  doc.text(labels.tagline, 40, 62);
  doc.setDrawColor(190, 160, 80);
  doc.line(40, 74, width - 40, 74);

  autoTable(doc, {
    startY: 90,
    head: [[
      labels.name,
      labels.address,
      labels.instagram,
      labels.site,
      labels.phone,
      labels.rating,
      labels.category,
    ]],
    body: leads.map((l) => [
      l.nome,
      l.endereco,
      l.instagram?.replace(/^https?:\/\/(www\.)?/, "") ?? "—",
      l.site?.replace(/^https?:\/\/(www\.)?/, "") ?? "—",
      l.telefone ?? "—",
      l.nota === null ? "—" : l.nota.toFixed(1),
      labels[`cat_${l.categoria}`] ?? l.categoria,
    ]),
    styles: { fontSize: 8, cellPadding: 6, textColor: [40, 40, 40], lineColor: [225, 225, 225], lineWidth: 0.5 },
    headStyles: { fillColor: [24, 24, 24], textColor: [214, 178, 96], fontStyle: "bold" },
    alternateRowStyles: { fillColor: [249, 247, 242] },
    margin: { left: 40, right: 40 },
  });

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    const h = doc.internal.pageSize.getHeight();
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `${labels.generatedAt} ${new Date().toLocaleDateString(labels.locale)} · ${leads.length} ${labels.leads}`,
      40,
      h - 24,
    );
    doc.text(`${i}/${pages}`, width - 40, h - 24, { align: "right" });
  }

  doc.save("theleadcolectron-leads.pdf");
}
