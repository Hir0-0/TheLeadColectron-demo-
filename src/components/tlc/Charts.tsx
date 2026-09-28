import { useTranslation } from "react-i18next";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Lead } from "@/lib/leads";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--gold-soft)",
  "var(--muted-foreground)",
];

const tooltipStyle = {
  backgroundColor: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  color: "var(--popover-foreground)",
  fontSize: 12,
};

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="panel p-4">
      <h3 className="mb-3 text-sm font-semibold text-foreground">{title}</h3>
      <div className="h-56">{children}</div>
    </div>
  );
}

export function Charts({ leads }: { leads: Lead[] }) {
  const { t } = useTranslation();
  const hasRatings = leads.some((l) => l.nota !== null);

  const byCategory = Object.entries(
    leads.reduce<Record<string, number>>((acc, l) => {
      acc[l.categoria] = (acc[l.categoria] ?? 0) + 1;
      return acc;
    }, {}),
  ).map(([k, v]) => ({ name: t(`cat.${k}`), value: v }));

  const ratingBuckets = [0, 1, 2, 3, 4, 5].map((n) => ({
    name: String(n),
    value: leads.filter((l) => l.nota !== null && Math.floor(l.nota) === n).length,
  }));

  const top5 = [...byCategory].sort((a, b) => b.value - a.value).slice(0, 5);

  return (
    <div className="grid gap-3 xl:grid-cols-3">
      <Panel title={hasRatings ? t("ratingDistribution") : t("byCategory")}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hasRatings ? ratingBuckets : byCategory}>
            <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
            <YAxis stroke="var(--muted-foreground)" fontSize={11} allowDecimals={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--surface-2)" }} />
            <Bar dataKey="value" fill="var(--gold)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title={t("categoryShare")}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={42} outerRadius={78} paddingAngle={3}>
              {byCategory.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="var(--background)" />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title={t("topCategories")}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={top5} layout="vertical" margin={{ left: 18 }}>
            <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} allowDecimals={false} />
            <YAxis type="category" dataKey="name" stroke="var(--muted-foreground)" fontSize={11} width={80} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--surface-2)" }} />
            <Bar dataKey="value" fill="var(--gold-soft)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  );
}
