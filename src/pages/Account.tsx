import { useState } from "react";
import {
  Building2,
  MapPin,
  FileText,
  Download,
  Trash2,
  Clock,
  AlertTriangle,
  Globe,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const companyInfo = {
  name: "Acme Corporation",
  legalName: "Acme Corp Pvt Ltd",
  taxId: "GSTIN123456789",
  address: "123 Business Park, Tech City, TC 12345",
  country: "India",
  dataResidency: "India (Mumbai)",
};

const auditLogs = [
  {
    id: 1,
    action: "User invited",
    user: "John Doe",
    details: "Invited sarah@company.com as Editor",
    timestamp: "2024-01-15 14:30",
    ip: "192.168.1.1",
  },
  {
    id: 2,
    action: "Settings changed",
    user: "John Doe",
    details: "Updated billing email",
    timestamp: "2024-01-14 10:15",
    ip: "192.168.1.1",
  },
  {
    id: 3,
    action: "API key created",
    user: "John Doe",
    details: "Created Production API Key",
    timestamp: "2024-01-10 09:00",
    ip: "192.168.1.1",
  },
  {
    id: 4,
    action: "Plan upgraded",
    user: "John Doe",
    details: "Upgraded from Starter to Pro",
    timestamp: "2024-01-05 16:45",
    ip: "192.168.1.1",
  },
];

export default function Account() {
  const [exportOpen, setExportOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Account & Compliance</h1>
        <p className="text-muted-foreground mt-1">
          Manage company information and compliance settings
        </p>
      </div>

      {/* Company Information */}
      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Company Information</h2>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Company Name</Label>
              <p className="font-medium">{companyInfo.name}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Legal Name</Label>
              <p className="font-medium">{companyInfo.legalName}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Tax ID / GST</Label>
              <p className="font-medium">{companyInfo.taxId}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Address</Label>
              <p className="font-medium">{companyInfo.address}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Country</Label>
              <p className="font-medium">{companyInfo.country}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Residency */}
      <div className="dashboard-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-info/10 text-info">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h2 className="section-title">Data Residency</h2>
            <p className="text-sm text-muted-foreground">
              Your data is stored in: <strong>{companyInfo.dataResidency}</strong>
            </p>
          </div>
        </div>
        <div className="p-4 bg-secondary/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Data residency determines where your data is physically stored. 
            Contact support to request a region change (enterprise feature).
          </p>
        </div>
      </div>

      {/* Data Export */}
      <div className="dashboard-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <h2 className="section-title">Export Data (GDPR)</h2>
              <p className="text-sm text-muted-foreground">
                Download all your data in a machine-readable format
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setExportOpen(true)}>
            <Download className="h-4 w-4" />
            Request Export
          </Button>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10 text-warning">
              <Clock className="h-5 w-5" />
            </div>
            <h2 className="section-title">Audit Logs</h2>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export Logs
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.action}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell className="text-muted-foreground">{log.details}</TableCell>
                <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {log.ip}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Account */}
      <div className="dashboard-card border-destructive/30 bg-destructive/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
              <Trash2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="section-title">Delete Account</h2>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
          </div>
          <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="h-4 w-4" />
            Delete Account
          </Button>
        </div>
      </div>

      {/* Export Modal */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Your Data</DialogTitle>
            <DialogDescription>
              Request a complete export of all your data
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Export Format</Label>
              <Select defaultValue="json">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Include</Label>
              <div className="mt-2 space-y-2">
                {["Profile data", "Projects", "Files", "Activity logs", "Billing history"].map(
                  (item) => (
                    <label key={item} className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">{item}</span>
                    </label>
                  )
                )}
              </div>
            </div>
            <div className="p-4 bg-info/5 border border-info/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Your export will be ready within 24-48 hours. You'll receive an email with a download link.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setExportOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setExportOpen(false)}>
                Request Export
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete Account
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account,
              all projects, files, and data associated with your workspace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4">
            <Label>Type "DELETE" to confirm</Label>
            <Input placeholder="DELETE" className="mt-1" />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
