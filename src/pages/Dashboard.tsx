import { KPICards } from "@/components/dashboard/KPICards";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { NotificationsPanel } from "@/components/dashboard/NotificationsPanel";
import { HealthStatus } from "@/components/dashboard/HealthStatus";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Health Status */}
      <HealthStatus />

      {/* KPI Cards */}
      <KPICards />

      {/* Quick Actions */}
      <QuickActions />

      {/* Activity & Notifications */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentActivity />
        <NotificationsPanel />
      </div>
    </div>
  );
}
