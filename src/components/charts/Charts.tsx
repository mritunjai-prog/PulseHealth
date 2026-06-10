import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

const tooltipStyle = {
  backgroundColor: "var(--color-surface)",
  border: "1px solid var(--color-divider)",
  borderRadius: 14,
  fontFamily: "Poppins, sans-serif",
  fontSize: 12,
  padding: "8px 12px",
  boxShadow: "0 8px 24px -8px oklch(0.7 0.05 180 / 0.2)",
};

const axisStyle = { fill: "var(--color-muted-foreground)", fontSize: 11, fontFamily: "Poppins" };

interface SeriesProps<T> {
  data: T[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
}

export function MiniBarChart<T>({ data, xKey, yKey, color = CHART_COLORS[0], height = 260 }: SeriesProps<T>) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data as any} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-divider)" vertical={false} opacity={0.4} />
        <XAxis dataKey={xKey} tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-primary-highlight)", opacity: 0.5 }} />
        <Bar dataKey={yKey} fill={color} radius={[8, 8, 0, 0]} animationDuration={700} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MiniLineChart<T>({ data, xKey, yKey, color = CHART_COLORS[0], height = 260 }: SeriesProps<T>) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data as any} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id={`grad-${yKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-divider)" vertical={false} opacity={0.4} />
        <XAxis dataKey={xKey} tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey={yKey} stroke={color} strokeWidth={3} fill={`url(#grad-${yKey})`} animationDuration={700} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface DonutProps {
  data: { name: string; value: number }[];
  height?: number;
}
export function MiniDonut({ data, height = 260 }: DonutProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          animationDuration={800}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} stroke="var(--color-surface)" strokeWidth={3} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontFamily: "Poppins", fontSize: 12, color: "var(--color-muted-foreground)" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
