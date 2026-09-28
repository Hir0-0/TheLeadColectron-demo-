export const IS_DEMO = true;

export type Lead = {
  id: string;
  nome: string;
  endereco: string;
  instagram: string | null;
  site: string | null;
  telefone: string | null;
  nota: number | null;
  categoria: string;
};

export const CATEGORIES = [
  "moda",
  "alimentacao",
  "beleza",
  "fitness",
  "pets",
  "servicos",
  "outros",
] as const;

export const REGIONS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

export const MOCK_LEADS: Lead[] = [
  {
    id: "m1",
    nome: "Ateliê Marina Vasques",
    endereco: "Rua Trinta e Três, 120 - Vila Santa Cecília, Volta Redonda - RJ",
    instagram: "https://instagram.com/atelie.marinavasques",
    site: "https://ateliemarinavasques.com.br",
    telefone: "(24) 3348-2210",
    nota: 4.7,
    categoria: "moda",
  },
  {
    id: "m2",
    nome: "Cantina Nonna Rosa",
    endereco: "Av. Paulo de Frontin, 845 - Aterrado, Volta Redonda - RJ",
    instagram: "https://instagram.com/cantinanonnarosa",
    site: "https://nonnarosavr.com.br",
    telefone: "(24) 3342-7781",
    nota: 4.5,
    categoria: "alimentacao",
  },
  {
    id: "m3",
    nome: "Studio Bella Pelle Estética",
    endereco: "Rua Simão da Cunha Gago, 57 - Jardim Amália, Volta Redonda - RJ",
    instagram: "https://instagram.com/bellapelle.studio",
    site: null,
    telefone: "(24) 99871-4402",
    nota: 4.9,
    categoria: "beleza",
  },
  {
    id: "m4",
    nome: "Iron House Training Center",
    endereco: "Rua Quinhentos e Vinte, 310 - Retiro, Volta Redonda - RJ",
    instagram: "https://instagram.com/ironhouse.vr",
    site: "https://ironhousevr.com.br",
    telefone: "(24) 3345-0091",
    nota: 4.3,
    categoria: "fitness",
  },
  {
    id: "m5",
    nome: "Pet Cariocando Banho & Tosa",
    endereco: "Rua Décima, 402 - Niterói, Volta Redonda - RJ",
    instagram: "https://instagram.com/petcariocando",
    site: null,
    telefone: "(24) 98812-6677",
    nota: 4.1,
    categoria: "pets",
  },
  {
    id: "m6",
    nome: "Contábil Siderúrgica Assessoria",
    endereco: "Rua Sessenta e Um, 88 - Sessenta, Volta Redonda - RJ",
    instagram: null,
    site: "https://contabilsiderurgica.com.br",
    telefone: "(24) 3339-1145",
    nota: 3.8,
    categoria: "servicos",
  },
  {
    id: "m7",
    nome: "Boutique Laço & Linho",
    endereco: "Rua Vinte, 233 - Vila Santa Cecília, Volta Redonda - RJ",
    instagram: "https://instagram.com/lacoelinho",
    site: "https://lacoelinho.com.br",
    telefone: null,
    nota: 4.6,
    categoria: "moda",
  },
  {
    id: "m8",
    nome: "Padaria Grão Dourado",
    endereco: "Rua Oito, 91 - Conforto, Volta Redonda - RJ",
    instagram: "https://instagram.com/graodouradopadaria",
    site: null,
    telefone: "(24) 3346-3312",
    nota: 4.4,
    categoria: "alimentacao",
  },
  {
    id: "m9",
    nome: "Barbearia Velho Aço",
    endereco: "Av. Amaral Peixoto, 1020 - Aterrado, Volta Redonda - RJ",
    instagram: "https://instagram.com/barbeariavelhoaco",
    site: "https://velhoaco.com.br",
    telefone: "(24) 99745-8890",
    nota: 4.8,
    categoria: "beleza",
  },
  {
    id: "m10",
    nome: "Clínica Vida Animal",
    endereco: "Rua Trinta e Cinco, 640 - Laranjal, Volta Redonda - RJ",
    instagram: null,
    site: "https://clinicavidaanimalvr.com.br",
    telefone: "(24) 3350-2244",
    nota: 4.2,
    categoria: "pets",
  },
  {
    id: "m11",
    nome: "CrossBox Volta Redonda",
    endereco: "Rua Quarenta e Dois, 15 - São Geraldo, Volta Redonda - RJ",
    instagram: "https://instagram.com/crossbox.vr",
    site: null,
    telefone: "(24) 98890-3321",
    nota: 4.0,
    categoria: "fitness",
  },
  {
    id: "m12",
    nome: "Marcenaria Serra & Cedro",
    endereco: "Rua Cento e Quatro, 507 - Santo Agostinho, Volta Redonda - RJ",
    instagram: "https://instagram.com/serraecedro",
    site: "https://serraecedro.com.br",
    telefone: "(24) 3341-9987",
    nota: 3.9,
    categoria: "outros",
  },
];

export async function loadLeads(): Promise<Lead[]> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}dados.json`, { cache: "no-store" });
    if (!res.ok) throw new Error("not found");
    const data = (await res.json()) as Lead[];
    if (!Array.isArray(data) || data.length === 0) throw new Error("empty");
    return data.map((d, i) => ({ ...d, id: String(d.id ?? i) }));
  } catch {
    return MOCK_LEADS;
  }
}
