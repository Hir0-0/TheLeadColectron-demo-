import { create } from "zustand";
import type { Lead } from "@/lib/leads";

export type SavedList = {
  id: string;
  name: string;
  niche: string;
  tags: string[];
  createdAt: string;
};

const STORAGE_KEY = "tlc.saved-lists";

type SortKey = "nome" | "endereco" | "instagram" | "site" | "telefone" | "nota" | "categoria";

type State = {
  leads: Lead[];
  loading: boolean;
  keyword: string;
  niche: string;
  region: string;
  igEnabled: boolean;
  minRating: number;
  fInstagram: boolean;
  fSite: boolean;
  fPhone: boolean;
  fCategory: string;
  sortKey: SortKey;
  sortAsc: boolean;
  selected: string[];
  savedLists: SavedList[];
  setLeads: (l: Lead[]) => void;
  setLoading: (v: boolean) => void;
  set: <K extends keyof State>(key: K, value: State[K]) => void;
  clearFilters: () => void;
  toggleSort: (key: SortKey) => void;
  toggleSelect: (id: string) => void;
  setSelection: (ids: string[]) => void;
  loadLists: () => void;
  addList: (l: Omit<SavedList, "id" | "createdAt">) => void;
  removeList: (id: string) => void;
};

export const useLeadStore = create<State>((set, get) => ({
  leads: [],
  loading: true,
  keyword: "",
  niche: "all",
  region: "all",
  igEnabled: false,
  minRating: 0,
  fInstagram: false,
  fSite: false,
  fPhone: false,
  fCategory: "all",
  sortKey: "nome",
  sortAsc: true,
  selected: [],
  savedLists: [],
  setLeads: (leads) => set({ leads }),
  setLoading: (loading) => set({ loading }),
  set: (key, value) => set({ [key]: value } as never),
  clearFilters: () =>
    set({
      minRating: 0,
      fInstagram: false,
      fSite: false,
      fPhone: false,
      fCategory: "all",
      keyword: "",
      niche: "all",
      region: "all",
    }),
  toggleSort: (key) =>
    set((s) => (s.sortKey === key ? { sortAsc: !s.sortAsc } : { sortKey: key, sortAsc: true })),
  toggleSelect: (id) =>
    set((s) => ({
      selected: s.selected.includes(id)
        ? s.selected.filter((x) => x !== id)
        : [...s.selected, id],
    })),
  setSelection: (selected) => set({ selected }),
  loadLists: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      set({ savedLists: raw ? (JSON.parse(raw) as SavedList[]) : [] });
    } catch {
      set({ savedLists: [] });
    }
  },
  addList: (l) => {
    const next = [
      ...get().savedLists,
      { ...l, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
    ];
    set({ savedLists: next });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  },
  removeList: (id) => {
    const next = get().savedLists.filter((l) => l.id !== id);
    set({ savedLists: next });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  },
}));

export function filterLeads(s: State): Lead[] {
  const kw = s.keyword.trim().toLowerCase();
  const out = s.leads.filter((l) => {
    if (kw && !`${l.nome} ${l.endereco} ${l.categoria}`.toLowerCase().includes(kw)) return false;
    if (s.niche !== "all" && l.categoria !== s.niche) return false;
    if (s.region !== "all" && !l.endereco.toUpperCase().includes(`- ${s.region}`)) return false;
    if (s.fCategory !== "all" && l.categoria !== s.fCategory) return false;
    if (s.fInstagram && !l.instagram) return false;
    if (s.fSite && !l.site) return false;
    if (s.fPhone && !l.telefone) return false;
    if (s.minRating > 0 && (l.nota ?? -1) < s.minRating) return false;
    return true;
  });
  const dir = s.sortAsc ? 1 : -1;
  return out.sort((a, b) => {
    const av = a[s.sortKey];
    const bv = b[s.sortKey];
    if (av === null) return 1;
    if (bv === null) return -1;
    if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
    return String(av).localeCompare(String(bv), "pt-BR") * dir;
  });
}
