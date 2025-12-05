import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  HardDrive,
  Activity,
  Download,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const storageData = [
  { month: "Jan", used: 35 },
  { month: "Feb", used: 38 },
  { month: "Mar", used: 42 },
  { month: "Apr", used: 45 },
  { month: "May", used: 48 },
  { month: "Jun", used: 52 },
];

const activeUsersData = [
  { day: "Mon", users: 18 },
  { day: "Tue", users: 22 },
  { day: "Wed", users: 20 },
  { day: "Thu", users: 24 },
  { day: "Fri", users: 19 },
  { day: "Sat", users: 8 },
  { day: "Sun", users: 5 },
];

const fileActivityData = [
  { month: "Jan", uploads: 145, downloads: 230 },
  { month: "Feb", uploads: 180, downloads: 290 },
  { month: "Mar", uploads: 165, downloads: 310 },
  { month: "Apr", uploads: 210, downloads: 340 },
  { month: "May", uploads: 195, downloads: 320 },
  { month: "Jun", uploads: 240, downloads: 380 },
];

const projectStatusData = [
  { name: "Completed", value: 8, color: "hsl(142, 71%, 45%)" },
  { name: "In Progress", value: 3, color: "hsl(199, 89%, 48%)" },
  { name: "Planning", value: 2, color: "hsl(38, 92%, 50%)" },
];

const slaData = [
  { month: "Jan", response: 2.1 },
  { month: "Feb", response: 1.8 },
  { month: "Mar", response: 2.3 },
  { month: "Apr", response: 1.9 },
  { month: "May", response: 1.5 },
  { month: "Jun", response: 1.4 },
];

const kpis = [
  {
    title: "Storage Used",
    value: "52 GB",
    change: "+8%",
    trend: "up",
    icon: HardDrive,
    color: "accent",
  },
  {
    title: "Active Users (MAU)",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "success",
  },
  {
    title: "DAU/MAU Ratio",
    value: "68%",
    change: "+5%",
    trend: "up",
    icon: Activity,
    color: "info",
  },
  {
    title: "Avg Response Time",
    value: "1.4h",
    change: "-15%",
    trend: "down",
    icon: TrendingUp,
    color: "warning",
  },
];

export default function Analytics() {
  const [period, setPeriod] = useState("6m");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Usage</h1>
          <p className="text-muted-foreground mt-1">
            Track your workspace usage and performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <div
            key={kpi.title}
            className={cn("dashboard-card animate-slide-up", `stagger-${index + 1}`)}
            style={{ opacity: 0 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <p className="text-2xl font-bold mt-1">{kpi.value}</p>
              </div>
              <div
                className={cn(
                  "p-2 rounded-lg",
                  kpi.color === "accent" && "bg-accent/10 text-accent",
                  kpi.color === "success" && "bg-success/10 text-success",
                  kpi.color === "info" && "bg-info/10 text-info",
                  kpi.color === "warning" && "bg-warning/10 text-warning"
                )}
              >
                <kpi.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <span
                className={cn(
                  "text-xs font-medium",
                  kpi.trend === "up" ? "text-success" : "text-warning"
                )}
              >
                {kpi.change}
              </span>
              <span className="text-xs text-muted-foreground">vs last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="dashboard-card">
          <h3 className="section-title mb-4">Storage Usage</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={storageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit=" GB" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="used"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--accent))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="section-title mb-4">Active Users (Weekly)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeUsersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="users" fill="hsl(var(--info))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="dashboard-card lg:col-span-2">
          <h3 className="section-title mb-4">File Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fileActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="uploads" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="downloads" fill="hsl(var(--info))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">Uploads</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-info" />
              <span className="text-sm text-muted-foreground">Downloads</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="section-title mb-4">Project Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {projectStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SLA Chart */}
      <div className="dashboard-card">
        <h3 className="section-title mb-4">SLA Response Time (Hours)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={slaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="h" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="response"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--success))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
