import { useState } from "react";
import {
  Plus,
  Search,
  Clock,
  MessageSquare,
  ChevronRight,
  Paperclip,
  Send,
  HelpCircle,
  Book,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const tickets = [
  {
    id: "TKT-001",
    subject: "Cannot access project files",
    category: "Technical",
    priority: "high",
    status: "open",
    created: "2 hours ago",
    slaRemaining: "6h 30m",
  },
  {
    id: "TKT-002",
    subject: "Billing inquiry - duplicate charge",
    category: "Billing",
    priority: "medium",
    status: "in-progress",
    created: "1 day ago",
    slaRemaining: "2h 15m",
  },
  {
    id: "TKT-003",
    subject: "Feature request - calendar integration",
    category: "Feature",
    priority: "low",
    status: "pending",
    created: "3 days ago",
    slaRemaining: "24h",
  },
  {
    id: "TKT-004",
    subject: "Team member access issue",
    category: "Technical",
    priority: "medium",
    status: "resolved",
    created: "1 week ago",
    slaRemaining: null,
  },
];

const faqs = [
  {
    question: "How do I invite team members?",
    answer:
      "Go to Team & Users page, click 'Invite Member', enter their email and select a role. They'll receive an invitation email to join your workspace.",
  },
  {
    question: "How do I change my subscription plan?",
    answer:
      "Navigate to Billing, click on your current plan, and select 'Upgrade' or 'Downgrade'. Changes take effect at your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit/debit cards (Visa, Mastercard, Amex), UPI for Indian customers, and bank transfers for enterprise accounts.",
  },
  {
    question: "How do I export my data?",
    answer:
      "Go to Account settings, find the 'Export Data' section, and click 'Request Export'. You'll receive a download link within 24 hours.",
  },
  {
    question: "What's your SLA for support tickets?",
    answer:
      "High priority: 8 hours, Medium priority: 24 hours, Low priority: 72 hours. Priority support add-on reduces these by 50%.",
  },
];

const statusConfig = {
  open: { label: "Open", color: "bg-destructive/10 text-destructive" },
  "in-progress": { label: "In Progress", color: "bg-info/10 text-info" },
  pending: { label: "Pending", color: "bg-warning/10 text-warning" },
  resolved: { label: "Resolved", color: "bg-success/10 text-success" },
};

const priorityConfig = {
  high: { label: "High", color: "bg-destructive/10 text-destructive" },
  medium: { label: "Medium", color: "bg-warning/10 text-warning" },
  low: { label: "Low", color: "bg-muted text-muted-foreground" },
};

export default function Support() {
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Support</h1>
          <p className="text-muted-foreground mt-1">
            Get help and manage support tickets
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4" />
          Create Ticket
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="dashboard-card cursor-pointer hover:border-accent transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Live Chat</p>
              <p className="text-sm text-muted-foreground">Chat with our team</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card cursor-pointer hover:border-accent transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-info/10 text-info">
              <Book className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Documentation</p>
              <p className="text-sm text-muted-foreground">Browse our guides</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card cursor-pointer hover:border-accent transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10 text-warning">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">System Status</p>
              <p className="text-sm text-success">All systems operational</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Tickets */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search tickets..." className="pl-9" />
      </div>

      <div className="dashboard-card">
        <h2 className="section-title mb-4">Your Tickets</h2>
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
              onClick={() => setSelectedTicket(ticket.id)}
            >
              <div className="flex items-start gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{ticket.subject}</span>
                    <Badge
                      className={cn(
                        "font-normal text-xs",
                        priorityConfig[ticket.priority as keyof typeof priorityConfig].color
                      )}
                    >
                      {priorityConfig[ticket.priority as keyof typeof priorityConfig].label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span>{ticket.id}</span>
                    <span>•</span>
                    <span>{ticket.category}</span>
                    <span>•</span>
                    <span>{ticket.created}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {ticket.slaRemaining && (
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className={cn(
                      ticket.slaRemaining.includes("h") && !ticket.slaRemaining.includes("24h")
                        ? "text-warning"
                        : "text-muted-foreground"
                    )}>
                      {ticket.slaRemaining}
                    </span>
                  </div>
                )}
                <Badge
                  className={cn(
                    "font-normal",
                    statusConfig[ticket.status as keyof typeof statusConfig].color
                  )}
                >
                  {statusConfig[ticket.status as keyof typeof statusConfig].label}
                </Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="dashboard-card">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-accent" />
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Create Ticket Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Support Ticket</DialogTitle>
            <DialogDescription>
              Describe your issue and we'll get back to you soon
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Subject</Label>
              <Input placeholder="Brief description of your issue" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select defaultValue="technical">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Priority</Label>
                <Select defaultValue="medium">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Please provide as much detail as possible..."
                className="mt-1 min-h-[120px]"
              />
            </div>
            <div>
              <Label>Attachments</Label>
              <div className="mt-1 border-2 border-dashed rounded-lg p-4 text-center">
                <Paperclip className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop or click to upload
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setCreateOpen(false)}>
                <Send className="h-4 w-4" />
                Submit Ticket
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ticket Detail Modal */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ticket {selectedTicket}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-secondary/30 rounded-lg">
              <h3 className="font-medium">Cannot access project files</h3>
              <p className="text-sm text-muted-foreground mt-2">
                I'm trying to access the files in Project Alpha but getting a permission error.
                This started happening after the recent update.
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                Submitted 2 hours ago
              </p>
            </div>
            <div className="border-l-2 border-accent pl-4 py-2">
              <p className="text-sm font-medium">Support Agent</p>
              <p className="text-sm text-muted-foreground mt-1">
                Hi, thanks for reporting this. We're looking into it and will update you shortly.
              </p>
              <p className="text-xs text-muted-foreground mt-2">1 hour ago</p>
            </div>
            <div>
              <Label>Add Reply</Label>
              <Textarea placeholder="Type your message..." className="mt-1" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Close Ticket</Button>
              <Button>Send Reply</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
