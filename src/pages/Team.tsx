import { useState } from "react";
import {
  UserPlus,
  MoreHorizontal,
  Shield,
  Mail,
  Clock,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@company.com",
    role: "Admin",
    status: "active",
    lastActive: "Just now",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: 2,
    name: "Sarah Kim",
    email: "sarah@company.com",
    role: "Editor",
    status: "active",
    lastActive: "5 min ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike@company.com",
    role: "Viewer",
    status: "active",
    lastActive: "1 hour ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  },
  {
    id: 4,
    name: "Emily Johnson",
    email: "emily@company.com",
    role: "Editor",
    status: "pending",
    lastActive: "Invited",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: 5,
    name: "Alex Brown",
    email: "alex@company.com",
    role: "Viewer",
    status: "inactive",
    lastActive: "2 weeks ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
];

const seats = { used: 5, total: 25 };

export default function Team() {
  const [inviteOpen, setInviteOpen] = useState(false);

  const statusColors = {
    active: "bg-success/10 text-success",
    pending: "bg-warning/10 text-warning",
    inactive: "bg-muted text-muted-foreground",
  };

  const roleColors = {
    Admin: "bg-destructive/10 text-destructive",
    Editor: "bg-info/10 text-info",
    Viewer: "bg-muted text-muted-foreground",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Team & Users</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team members and permissions
          </p>
        </div>
        <Button onClick={() => setInviteOpen(true)}>
          <UserPlus className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Seat Usage</p>
              <p className="text-xl font-bold">
                {seats.used} / {seats.total}
              </p>
            </div>
          </div>
          <Progress value={(seats.used / seats.total) * 100} className="h-2 mt-3" />
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10 text-success">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-xl font-bold">
                {teamMembers.filter((m) => m.status === "active").length}
              </p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10 text-warning">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Invites</p>
              <p className="text-xl font-bold">
                {teamMembers.filter((m) => m.status === "pending").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SSO Card */}
      <div className="dashboard-card border-dashed">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Single Sign-On (SSO)</p>
              <p className="text-sm text-muted-foreground">
                Enable SSO for your organization
              </p>
            </div>
          </div>
          <Button variant="outline">Configure</Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search team members..." className="pl-9" />
      </div>

      {/* Team Table */}
      <div className="dashboard-card p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "font-normal",
                      roleColors[member.role as keyof typeof roleColors]
                    )}
                  >
                    {member.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "font-normal",
                      statusColors[member.status as keyof typeof statusColors]
                    )}
                  >
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {member.lastActive}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Role</DropdownMenuItem>
                      {member.status === "pending" && (
                        <DropdownMenuItem>Resend Invite</DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive">
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Invite Modal */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invitation to join your workspace
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Email Address</Label>
              <Input placeholder="colleague@company.com" className="mt-1" />
            </div>
            <div>
              <Label>Role</Label>
              <Select defaultValue="viewer">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Admins have full access. Editors can modify content. Viewers have read-only access.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setInviteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setInviteOpen(false)}>Send Invite</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
