import { useState, useRef, ChangeEvent } from "react";
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
  Filter,
  ArrowUpDown,
  File,
  X,
  Info,
  Check,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Mock Data
const files = [
  {
    id: "1",
    name: "Design Assets",
    type: "folder",
    size: null,
    items: 24,
    updated: "2 hours ago",
    updatedBy: "John Doe",
    version: null,
  },
  {
    id: "2",
    name: "Project Documentation",
    type: "folder",
    size: null,
    items: 12,
    updated: "Yesterday",
    updatedBy: "Sarah Smith",
    version: null,
  },
  {
    id: "3",
    name: "Homepage Mockup.fig",
    type: "design",
    size: "4.2 MB",
    items: null,
    updated: "3 hours ago",
    updatedBy: "John Doe",
    version: "v3",
  },
  {
    id: "4",
    name: "API Specification.md",
    type: "document",
    size: "128 KB",
    items: null,
    updated: "1 day ago",
    updatedBy: "Dev Team",
    version: "v2",
  },
  {
    id: "5",
    name: "Brand Guidelines.pdf",
    type: "document",
    size: "2.8 MB",
    items: null,
    updated: "3 days ago",
    updatedBy: "Marketing",
    version: "v1",
  },
  {
    id: "6",
    name: "hero-banner.png",
    type: "image",
    size: "1.2 MB",
    items: null,
    updated: "1 week ago",
    updatedBy: "Designer",
    version: "v1",
  },
];

const versions = [
  { id: 1, version: "v3", user: "John Doe", date: "Today, 2:30 PM", current: true },
  { id: 2, version: "v2", user: "Sarah Smith", date: "Yesterday, 4:15 PM", current: false },
  { id: 3, version: "v1", user: "John Doe", date: "Jan 10, 11:00 AM", current: false },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "folder": return Folder;
    case "image": return Image;
    case "code": return FileCode;
    case "design": return File; // Using File for design files generic
    default: return FileText;
  }
};

export default function Files() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<typeof files[0] | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  // Filter & Sort States (Mock)
  const [filterType, setFilterType] = useState<string[]>([]);

  const handleFileClick = (file: typeof files[0]) => {
    if (file.type === "folder") {
      // Navigate to folder (mock)
      toast({ description: `Navigating to ${file.name}...` });
    } else {
      setSelectedFile(file);
      setIsPreviewOpen(true);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const simulateUpload = (file: File) => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploadOpen(false);
            setUploadProgress(0);
            toast({
              title: "Upload Successful",
              description: `File "${file.name}" uploaded successfully.`,
              className: "bg-success text-white border-none"
            });
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateUpload(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };


  const copyShareLink = (file: typeof files[0]) => {
    navigator.clipboard.writeText(`https://venturemond.com/files/share/${file.id}`);
    toast({ title: "Link Copied!", description: "Share link copied to clipboard." });
  };

  const openDetails = (e: React.MouseEvent, file: typeof files[0]) => {
    e.stopPropagation();
    setSelectedFile(file);
    setIsDetailsOpen(true);
  };

  const filteredFiles = files.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span className="hover:text-foreground cursor-pointer">All Files</span>
              <span>/</span>
              <span className="text-foreground font-medium">Project Alpha</span>
            </div>
            <h1 className="text-2xl font-bold">Files & Collaboration</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                className="pl-9 w-48 lg:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Mobile Search */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon"><Search className="h-5 w-5" /></Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Documents</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Images</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Designs</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Newest First</DropdownMenuItem>
                <DropdownMenuItem>Oldest First</DropdownMenuItem>
                <DropdownMenuItem>Name A-Z</DropdownMenuItem>
                <DropdownMenuItem>Size</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-6 w-px bg-border hidden sm:block mx-1" />

            <div className="flex bg-secondary/50 rounded-lg p-0.5">
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="icon-sm"
                onClick={() => setView("grid")}
                className="h-8 w-8"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="icon-sm"
                onClick={() => setView("list")}
                className="h-8 w-8"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Button onClick={() => setIsUploadOpen(true)} className="ml-2">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredFiles.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <div className="p-4 rounded-full bg-secondary w-fit mx-auto mb-4">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No files found</h3>
          <p className="text-muted-foreground mb-6">Upload your first file to get started</p>
          <Button onClick={() => setIsUploadOpen(true)}>Upload Files</Button>
          <p className="text-xs text-muted-foreground mt-4">Accepted: PDF, PNG, JPG, FIG, DOCX</p>
        </div>
      ) : (
        <div className={cn(
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            : "space-y-2"
        )}>
          {filteredFiles.map((file) => {
            const Icon = getFileIcon(file.type);
            return (
              <div
                key={file.id}
                onClick={() => handleFileClick(file)}
                className={cn(
                  "group relative border rounded-xl p-4 transition-all hover:shadow-md cursor-pointer bg-card",
                  view === "list" && "flex items-center gap-4 p-3"
                )}
              >
                {/* Icon */}
                <div className={cn(
                  "rounded-lg flex items-center justify-center shrink-0",
                  file.type === "folder" ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary",
                  view === "grid" ? "w-12 h-12 mb-4" : "w-10 h-10"
                )}>
                  <Icon className={cn(view === "grid" ? "h-6 w-6" : "h-5 w-5")} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium truncate pr-4" title={file.name}>{file.name}</h3>
                    {view === "grid" && (
                      <Button variant="ghost" size="icon-sm" onClick={(e) => openDetails(e, file)}>
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{file.type === "folder" ? `${file.items} items` : file.size}</span>
                    <span>•</span>
                    <span>{file.updated}</span>
                  </div>
                </div>

                {/* List Actions */}
                {view === "list" && (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); copyShareLink(file); }}>
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); toast({ description: "Downloading..." }); }}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" onClick={(e) => openDetails(e, file)}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      {selectedFile && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded bg-secondary", selectedFile.type === 'folder' ? "text-warning" : "text-primary")}>
                  {selectedFile.type === 'folder' ? <Folder className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                </div>
                <div>
                  <h2 className="font-semibold">{selectedFile.name}</h2>
                  <p className="text-xs text-muted-foreground uppercase">{selectedFile.type} • {selectedFile.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => copyShareLink(selectedFile)}>
                  <LinkIcon className="h-4 w-4 mr-2" /> Copy Link
                </Button>
                <Button size="sm" onClick={() => toast({ description: "Downloading..." })}>
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </div>
            </div>

            <div className="flex-1 bg-secondary/20 flex items-center justify-center p-8 overflow-hidden">
              {/* Mock Preview Content */}
              <div className="text-center">
                <div className="mx-auto w-20 h-20 bg-background rounded-full flex items-center justify-center shadow-sm mb-4">
                  <File className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">Preview not available for this file type.</p>
                <Button variant="link" onClick={() => toast({ description: "Downloading..." })}>Download to view</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}


      {/* Details Sheet (Right Drawer) */}
      <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <SheetContent className="w-full sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>File Details</SheetTitle>
          </SheetHeader>

          {selectedFile && (
            <div className="py-6 space-y-6">
              {/* Main Info */}
              <div className="flex flex-col items-center text-center p-6 bg-secondary/30 rounded-xl border border-dashed">
                {selectedFile.type === 'folder' ? <Folder className="h-12 w-12 text-warning mb-3" /> : <FileText className="h-12 w-12 text-primary mb-3" />}
                <h3 className="font-semibold">{selectedFile.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedFile.size || `${selectedFile.items} items`}</p>
              </div>

              {/* Metadata */}
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">Type</span>
                  <span className="text-sm font-medium capitalize">{selectedFile.type}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">Uploaded by</span>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-accent text-[10px] flex items-center justify-center text-white">JD</div>
                    <span className="text-sm font-medium">{selectedFile.updatedBy}</span>
                  </div>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">Last Modified</span>
                  <span className="text-sm font-medium">{selectedFile.updated}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => copyShareLink(selectedFile)}>
                  <LinkIcon className="h-4 w-4 mr-2" /> Share
                </Button>
                <Button onClick={() => toast({ description: "Downloading..." })}>
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </div>

              {/* Version History (Read-only) */}
              {selectedFile.version && (
                <div className="space-y-3 pt-4">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Version History
                  </h4>
                  <ScrollArea className="h-[200px] rounded-md border p-4">
                    {versions.map((ver) => (
                      <div key={ver.id} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{ver.version}</span>
                            {ver.current && <Badge variant="secondary" className="text-[10px] h-5">Current</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground">{ver.date} by {ver.user}</p>
                        </div>
                        <Button variant="ghost" size="icon-sm" title="Download this version">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>
              Drag and drop files here or click to browse.
            </DialogDescription>
          </DialogHeader>

          <div
            className={cn(
              "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer",
              isDragging ? "border-primary bg-primary/10" : "bg-secondary/20 hover:bg-secondary/40"
            )}
            onClick={triggerFileInput}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileSelect}
            />
            {uploadProgress > 0 && uploadProgress < 100 ? (
              <div className="w-full max-w-xs space-y-2 text-center">
                <p className="text-sm font-medium">Uploading...</p>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 rounded-full bg-background shadow-sm mb-4">
                  <Upload className={cn("h-6 w-6", isDragging ? "text-primary" : "text-muted-foreground")} />
                </div>
                <p className="font-medium">Click to upload or drag & drop</p>
                <p className="text-xs text-muted-foreground mt-2">Max file size: 50MB</p>
              </>
            )}
          </div>

          <DialogFooter className="sm:justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Info className="h-3 w-3" />
              <span>Supported: JPG, PNG, PDF, DOCX</span>
            </div>
            <Button variant="ghost" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

