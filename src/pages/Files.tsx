import { useState } from "react";
import {
  Folder,
  FileText,
  Image,
  FileCode,
  MoreHorizontal,
  Upload,
  Grid3X3,
  List,
  Search,
  Clock,
  Download,
  Link as LinkIcon,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const files = [
  {
    id: 1,
    name: "Design Assets",
    type: "folder",
    items: 24,
    modified: "2 hours ago",
  },
  {
    id: 2,
    name: "Project Documentation",
    type: "folder",
    items: 12,
    modified: "Yesterday",
  },
  {
    id: 3,
    name: "Homepage Mockup.fig",
    type: "design",
    size: "4.2 MB",
    modified: "3 hours ago",
  },
  {
    id: 4,
    name: "API Specification.md",
    type: "document",
    size: "128 KB",
    modified: "1 day ago",
  },
  {
    id: 5,
    name: "Brand Guidelines.pdf",
    type: "document",
    size: "2.8 MB",
    modified: "3 days ago",
  },
  {
    id: 6,
    name: "hero-banner.png",
    type: "image",
    size: "1.2 MB",
    modified: "1 week ago",
  },
  {
    id: 7,
    name: "config.json",
    type: "code",
    size: "4 KB",
    modified: "2 weeks ago",
  },
];

const versions = [
  { id: 1, version: "v3", user: "John D.", date: "Today, 2:30 PM", current: true },
  { id: 2, version: "v2", user: "Sarah K.", date: "Yesterday, 4:15 PM", current: false },
  { id: 3, version: "v1", user: "John D.", date: "Jan 10, 11:00 AM", current: false },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "folder":
      return Folder;
    case "image":
      return Image;
    case "code":
      return FileCode;
    default:
      return FileText;
  }
};

export default function Files() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [shareOpen, setShareOpen] = useState(false);
  const [versionOpen, setVersionOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Files</h1>
          <p className="text-muted-foreground mt-1">
            Manage and collaborate on project files
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4" />
          Upload Files
        </Button>
      </div>

      {/* Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 text-sm">
          <button className="text-accent hover:underline">All Files</button>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">Project Alpha</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search files..." className="pl-9 w-48" />
          </div>
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

      {/* Files Grid/List */}
      <div
        className={cn(
          view === "grid"
            ? "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "space-y-2"
        )}
      >
        {files.map((file, index) => {
          const Icon = getFileIcon(file.type);
          return (
            <div
              key={file.id}
              className={cn(
                "dashboard-card group cursor-pointer animate-slide-up",
                view === "list" && "flex items-center gap-4 p-4",
                `stagger-${Math.min(index + 1, 5)}`
              )}
              style={{ opacity: 0 }}
            >
              <div
                className={cn(
                  view === "grid" && "flex flex-col items-center text-center"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg flex items-center justify-center",
                    view === "grid" ? "w-16 h-16 mb-3" : "w-10 h-10",
                    file.type === "folder"
                      ? "bg-warning/10 text-warning"
                      : "bg-accent/10 text-accent"
                  )}
                >
                  <Icon className={cn(view === "grid" ? "h-8 w-8" : "h-5 w-5")} />
                </div>
                <div className={cn(view === "list" && "flex-1")}>
                  <p
                    className={cn(
                      "font-medium truncate group-hover:text-accent transition-colors",
                      view === "grid" && "text-sm"
                    )}
                  >
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {file.type === "folder" ? `${file.items} items` : file.size}
                    {view === "list" && ` • Modified ${file.modified}`}
                  </p>
                </div>
              </div>
              {view === "grid" && (
                <div className="flex items-center justify-between mt-3 pt-3 border-t text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {file.modified}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="opacity-0 group-hover:opacity-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setShareOpen(true)}>
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Share Link
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setVersionOpen(true)}>
                        <Clock className="h-4 w-4 mr-2" />
                        Version History
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              {view === "list" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShareOpen(true)}>
                      Share Link
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setVersionOpen(true)}>
                      Version History
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          );
        })}
      </div>

      {/* Share Link Modal */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Link</DialogTitle>
            <DialogDescription>Create a shareable link for this file</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Link URL</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  value="https://app.venturemond.com/files/share/abc123"
                  readOnly
                  className="flex-1"
                />
                <Button variant="outline">Copy</Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Password Protection</Label>
                <p className="text-xs text-muted-foreground">Require password to access</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Expiry</Label>
                <p className="text-xs text-muted-foreground">Link expires after 7 days</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Version History Modal */}
      <Dialog open={versionOpen} onOpenChange={setVersionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Version History</DialogTitle>
            <DialogDescription>View and restore previous versions</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {versions.map((version) => (
              <div
                key={version.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg",
                  version.current ? "bg-accent/10 border border-accent/20" : "bg-secondary/30"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-secondary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {version.version}
                      {version.current && (
                        <span className="text-accent ml-2 text-xs">(Current)</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {version.user} • {version.date}
                    </p>
                  </div>
                </div>
                {!version.current && (
                  <Button size="sm" variant="outline">
                    Restore
                  </Button>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
