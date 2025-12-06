import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function WelcomeBanner() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-card bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-primary-foreground/5 rounded-full translate-y-1/2" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-primary-foreground/80 max-w-xl">
              Your dashboard shows 3 active projects with 2 pending approvals.
              Let's make progress today!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
