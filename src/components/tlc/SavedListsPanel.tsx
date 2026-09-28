import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Bookmark, Trash2 } from "lucide-react";
import { CATEGORIES } from "@/lib/leads";
import { useLeadStore } from "@/store/useLeadStore";

export function SavedListsPanel() {
  const { t } = useTranslation();
  const { savedLists, addList, removeList, set } = useLeadStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [niche, setNiche] = useState<string>(CATEGORIES[0]);
  const [tags, setTags] = useState("");

  const grouped = savedLists.reduce<Record<string, typeof savedLists>>((acc, l) => {
    (acc[l.niche] ??= []).push(l);
    return acc;
  }, {});

  const save = () => {
    if (!name.trim()) return;
    addList({
      name: name.trim(),
      niche,
      tags: tags.split(",").map((s) => s.trim()).filter(Boolean),
    });
    setName("");
    setTags("");
    setOpen(false);
  };

  return (
    <aside className="panel h-fit p-4 lg:sticky lg:top-24">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
          {t("savedLists")}
        </h2>
        <button onClick={() => setOpen(true)} className="btn-ghost-gold px-2.5 py-1.5 text-[11px]">
          <Bookmark className="mr-1 inline h-3 w-3" />
          {t("saveList")}
        </button>
      </div>

      {savedLists.length === 0 && (
        <p className="text-xs text-muted-foreground">{t("noLists")}</p>
      )}

      <div className="space-y-4">
        {Object.entries(grouped).map(([n, lists]) => (
          <div key={n}>
            <p className="mb-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              {t(`cat.${n}`)}
            </p>
            <div className="space-y-1.5">
              {lists.map((l) => (
                <div
                  key={l.id}
                  className="group flex items-start justify-between gap-2 rounded-lg border border-border bg-surface-2 px-2.5 py-2"
                >
                  <button
                    className="text-left"
                    onClick={() => {
                      set("keyword", l.tags[0] ?? "");
                      set("niche", l.niche);
                    }}
                  >
                    <span className="block text-xs font-medium">{l.name}</span>
                    <span className="block text-[11px] text-muted-foreground">
                      {l.tags.join(", ") || "—"}
                    </span>
                  </button>
                  <button
                    onClick={() => removeList(l.id)}
                    aria-label={t("delete")}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <div className="panel w-full max-w-md p-5">
            <h3 className="mb-4 text-base font-semibold">{t("saveList")}</h3>
            <div className="space-y-3">
              <input
                className="field w-full"
                placeholder={t("listName")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <select className="field w-full" value={niche} onChange={(e) => setNiche(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {t(`cat.${c}`)}
                  </option>
                ))}
              </select>
              <input
                className="field w-full"
                placeholder={t("tags")}
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="btn-ghost-gold px-3 py-2 text-xs">
                {t("cancel")}
              </button>
              <button onClick={save} className="btn-gold px-4 py-2 text-xs">
                {t("save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
