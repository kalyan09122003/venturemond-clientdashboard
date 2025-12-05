import { FolderKanban, Clock, LifeBuoy, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

const kpis = [
  {
    title: "Active Projects",
    value: "3",
    change: "+1 this month",
    trend: "up",
    icon: FolderKanban,
    variant: "accent" as const,
  },
  {
    title: "Pending Actions",
    value: "7",
    change: "2 urgent",
    trend: "neutral",
    icon: Clock,
    variant: "warning" as const,
  },
  {
    title: "Open Tickets",
    value: "2",
    change: "-3 from last week",
    trend: "down",
    icon: LifeBuoy,
    variant: "info" as const,
  },
  {
    title: "Current MRR",
    value: "$4,250",
    change: "+12% growth",
    trend: "up",
    icon: DollarSign,
    variant: "success" as const,
  },
];

export function KPICards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => (
        <div
          key={kpi.title}
          className={cn(
            "kpi-card cursor-pointer group",
            `kpi-card-${kpi.variant}`,
            "animate-slide-up",
            `stagger-${index + 1}`
          )}
          style={{ opacity: 0 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{kpi.title}</p>
              <p className="text-2xl font-bold mt-1 group-hover:text-accent transition-colors">
                {kpi.value}
              </p>
            </div>
            <div className={cn(
              "p-2 rounded-lg",
              kpi.variant === "accent" && "bg-accent/10 text-accent",
              kpi.variant === "warning" && "bg-warning/10 text-warning",
              kpi.variant === "info" && "bg-info/10 text-info",
              kpi.variant === "success" && "bg-success/10 text-success",
            )}>
              <kpi.icon className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3">
            {kpi.trend === "up" && <TrendingUp className="h-3 w-3 text-success" />}
            {kpi.trend === "down" && <TrendingDown className="h-3 w-3 text-success" />}
            <span className="text-xs text-muted-foreground">{kpi.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
