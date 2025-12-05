import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  Calendar,
  Users,
  MoreHorizontal,
  Plus,
  Search,
  Grid3X3,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "proj-1",
    name: "Project Alpha",
    description: "E-commerce platform MVP development",
    status: "in-progress",
    progress: 65,
    dueDate: "Mar 15, 2024",
    team: 4,
    nextMeeting: "Tomorrow, 3 PM",
  },
  {
    id: "proj-2",
    name: "Project Beta",
    description: "Mobile app redesign and development",
    status: "in-progress",
    progress: 40,
    dueDate: "Apr 30, 2024",
    team: 3,
    nextMeeting: "Jan 20, 2 PM",
  },
  {
    id: "proj-3",
    name: "Project Gamma",
    description: "SaaS platform integration",
    status: "review",
    progress: 90,
    dueDate: "Jan 31, 2024",
    team: 2,
    nextMeeting: "Today, 5 PM",
  },
  {
    id: "proj-4",
    name: "Project Delta",
    description: "Data analytics dashboard",
    status: "planning",
    progress: 10,
    dueDate: "May 15, 2024",
    team: 5,
    nextMeeting: "Jan 25, 10 AM",
  },
];

const statusConfig = {
  planning: { label: "Planning", color: "bg-muted text-muted-foreground" },
  "in-progress": { label: "In Progress", color: "bg-info/10 text-info" },
  review: { label: "Review", color: "bg-warning/10 text-warning" },
  completed: { label: "Completed", color: "bg-success/10 text-success" },
};

export default function Projects() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your active projects and collaborations
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Filters & View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-9" />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "grid" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setView("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "list" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div
        className={cn(
          view === "grid"
            ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            : "space-y-4"
        )}
      >
        {projects.map((project, index) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className={cn(
              "dashboard-card group cursor-pointer animate-slide-up",
              `stagger-${index + 1}`
            )}
            style={{ opacity: 0 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <FolderKanban className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  <Badge
                    className={cn(
                      "font-normal mt-1",
                      statusConfig[project.status as keyof typeof statusConfig].color
                    )}
                  >
                    {statusConfig[project.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Project</DropdownMenuItem>
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {project.dueDate}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {project.team}
                </span>
              </div>
            </div>

            {/* Next Meeting */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Next meeting: <span className="text-foreground">{project.nextMeeting}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
