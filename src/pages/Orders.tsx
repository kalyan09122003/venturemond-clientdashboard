import { useState } from "react";
import {
  Download,
  Eye,
  CreditCard,
  ChevronRight,
  CheckCircle2,
  Clock,
  Package,
  Rocket,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    items: ["Workspace Pro", "Priority Support"],
    total: 248,
    status: "active",
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-10",
    items: ["MVP Development"],
    total: 15000,
    status: "provisioning",
  },
  {
    id: "ORD-2024-003",
    date: "2023-12-20",
    items: ["Tech Strategy"],
    total: 3500,
    status: "completed",
  },
  {
    id: "ORD-2024-004",
    date: "2023-12-01",
    items: ["Workspace Starter"],
    total: 49,
    status: "cancelled",
  },
];

const subscription = {
  plan: "Workspace Pro",
  status: "active",
  nextBilling: "Feb 15, 2024",
  seats: { used: 12, total: 25 },
  storage: { used: 45, total: 100 },
  price: 149,
};

const timeline = [
  { status: "created", label: "Order Created", date: "Jan 10, 2024", done: true },
  { status: "paid", label: "Payment Received", date: "Jan 10, 2024", done: true },
  { status: "provisioning", label: "Provisioning", date: "Jan 11, 2024", done: true },
  { status: "kickoff", label: "Project Kickoff", date: "Jan 15, 2024", done: false },
  { status: "delivery", label: "Delivery", date: "TBD", done: false },
];

const statusConfig = {
  active: { label: "Active", color: "bg-success/10 text-success" },
  provisioning: { label: "Provisioning", color: "bg-info/10 text-info" },
  pending: { label: "Pending", color: "bg-warning/10 text-warning" },
  completed: { label: "Completed", color: "bg-muted text-muted-foreground" },
  cancelled: { label: "Cancelled", color: "bg-destructive/10 text-destructive" },
};

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Orders & Subscriptions</h1>
        <p className="text-muted-foreground mt-1">
          Manage your purchases and subscriptions
        </p>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <div className="dashboard-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <span className="text-sm">{order.items.join(", ")}</span>
                    </TableCell>
                    <TableCell>${order.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "font-normal",
                          statusConfig[order.status as keyof typeof statusConfig].color
                        )}
                      >
                        {statusConfig[order.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {order.status === "pending" && (
                          <Button size="sm" variant="accent">
                            <CreditCard className="h-4 w-4 mr-1" />
                            Pay Now
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedOrder(order.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="subscription">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Current Plan */}
            <div className="dashboard-card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="section-title">{subscription.plan}</h2>
                  <Badge className="mt-2 bg-success/10 text-success">
                    {subscription.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${subscription.price}</p>
                  <p className="text-sm text-muted-foreground">/month</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Next billing</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {subscription.nextBilling}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1">
                  Upgrade
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Usage */}
            <div className="dashboard-card">
              <h2 className="section-title mb-4">Usage</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Team Seats</span>
                    <span>
                      {subscription.seats.used} / {subscription.seats.total}
                    </span>
                  </div>
                  <Progress
                    value={(subscription.seats.used / subscription.seats.total) * 100}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Storage</span>
                    <span>
                      {subscription.storage.used} GB / {subscription.storage.total} GB
                    </span>
                  </div>
                  <Progress
                    value={(subscription.storage.used / subscription.storage.total) * 100}
                    className="h-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Order Detail Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order {selectedOrder}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Timeline */}
            <div>
              <h3 className="font-medium mb-4">Order Timeline</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                {timeline.map((step, index) => (
                  <div key={step.status} className="flex items-start gap-4 pb-6 relative">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center z-10",
                        step.done
                          ? "bg-success text-success-foreground"
                          : "bg-secondary text-muted-foreground"
                      )}
                    >
                      {step.status === "created" && <CheckCircle2 className="h-4 w-4" />}
                      {step.status === "paid" && <CreditCard className="h-4 w-4" />}
                      {step.status === "provisioning" && <Package className="h-4 w-4" />}
                      {step.status === "kickoff" && <Rocket className="h-4 w-4" />}
                      {step.status === "delivery" && <Clock className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium">{step.label}</p>
                      <p className="text-sm text-muted-foreground">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
