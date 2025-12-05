import { useState } from "react";
import {
  CreditCard,
  Download,
  Plus,
  Building2,
  AlertCircle,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const billingInfo = {
  currentBalance: 248,
  nextInvoice: "Feb 15, 2024",
  nextAmount: 248,
};

const invoices = [
  {
    id: "INV-2024-001",
    date: "Jan 15, 2024",
    amount: 248,
    status: "paid",
  },
  {
    id: "INV-2023-012",
    date: "Dec 15, 2023",
    amount: 248,
    status: "paid",
  },
  {
    id: "INV-2023-011",
    date: "Nov 15, 2023",
    amount: 199,
    status: "paid",
  },
  {
    id: "INV-2023-010",
    date: "Oct 15, 2023",
    amount: 199,
    status: "refunded",
  },
];

const paymentMethods = [
  {
    id: 1,
    type: "card",
    last4: "4242",
    brand: "Visa",
    expiry: "12/25",
    default: true,
  },
  {
    id: 2,
    type: "card",
    last4: "1234",
    brand: "Mastercard",
    expiry: "08/24",
    default: false,
  },
];

const usage = {
  storage: { used: 45, total: 100, unit: "GB" },
  seats: { used: 12, total: 25, unit: "seats" },
  apiCalls: { used: 8500, total: 10000, unit: "calls" },
};

export default function Billing() {
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Billing & Invoices</h1>
        <p className="text-muted-foreground mt-1">
          Manage your billing information and view invoices
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="text-sm text-muted-foreground">Current Balance</span>
          </div>
          <p className="text-2xl font-bold">${billingInfo.currentBalance}</p>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-info/10 text-info">
              <Building2 className="h-5 w-5" />
            </div>
            <span className="text-sm text-muted-foreground">Next Invoice</span>
          </div>
          <p className="text-2xl font-bold">${billingInfo.nextAmount}</p>
          <p className="text-sm text-muted-foreground">Due {billingInfo.nextInvoice}</p>
        </div>
        <div className="dashboard-card border-warning/30 bg-warning/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-warning/10 text-warning">
              <AlertCircle className="h-5 w-5" />
            </div>
            <span className="text-sm text-muted-foreground">Action Required</span>
          </div>
          <p className="text-sm">Update payment method expiring soon</p>
          <Button size="sm" variant="warning" className="mt-2">
            Update Now
          </Button>
        </div>
      </div>

      {/* Usage */}
      <div className="dashboard-card">
        <h2 className="section-title mb-4">Usage This Period</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {Object.entries(usage).map(([key, value]) => (
            <div key={key}>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                <span>
                  {value.used.toLocaleString()} / {value.total.toLocaleString()} {value.unit}
                </span>
              </div>
              <Progress
                value={(value.used / value.total) * 100}
                className={cn(
                  "h-2",
                  (value.used / value.total) > 0.8 && "[&>div]:bg-warning"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Payment Methods</h2>
          <Button size="sm" variant="outline" onClick={() => setAddPaymentOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Method
          </Button>
        </div>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border",
                method.default && "border-accent bg-accent/5"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">
                    {method.brand} •••• {method.last4}
                  </p>
                  <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {method.default && (
                  <Badge className="bg-accent/10 text-accent">Default</Badge>
                )}
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices */}
      <div className="dashboard-card">
        <h2 className="section-title mb-4">Invoice History</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>${invoice.amount}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "font-normal",
                      invoice.status === "paid" && "bg-success/10 text-success",
                      invoice.status === "refunded" && "bg-muted text-muted-foreground"
                    )}
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Refund Request */}
      <div className="dashboard-card border-dashed">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Need a refund or have a billing dispute?</p>
            <p className="text-sm text-muted-foreground">
              Contact our billing support team
            </p>
          </div>
          <Button variant="outline">Request Refund</Button>
        </div>
      </div>

      {/* Add Payment Modal */}
      <Dialog open={addPaymentOpen} onOpenChange={setAddPaymentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Add a new credit or debit card
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Card Number</Label>
              <Input placeholder="1234 5678 9012 3456" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Expiry</Label>
                <Input placeholder="MM/YY" className="mt-1" />
              </div>
              <div>
                <Label>CVV</Label>
                <Input placeholder="123" className="mt-1" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="default" />
              <Label htmlFor="default">Set as default payment method</Label>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setAddPaymentOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setAddPaymentOpen(false)}>
                <Check className="h-4 w-4" />
                Add Card
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
