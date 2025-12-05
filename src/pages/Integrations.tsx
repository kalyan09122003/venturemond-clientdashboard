import { useState } from "react";
import {
  Slack,
  Calendar,
  Mail,
  Webhook,
  Key,
  Shield,
  Check,
  Plus,
  Settings,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const integrations = [
  {
    id: "slack",
    name: "Slack",
    description: "Get notifications and updates in Slack channels",
    icon: Slack,
    connected: true,
    workspace: "Acme Corp",
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    description: "Integrate with MS Teams for collaboration",
    icon: Mail,
    connected: false,
  },
  {
    id: "gcal",
    name: "Google Calendar",
    description: "Sync meetings and deadlines",
    icon: Calendar,
    connected: true,
    account: "john@company.com",
  },
  {
    id: "outlook",
    name: "Outlook Calendar",
    description: "Connect your Outlook calendar",
    icon: Mail,
    connected: false,
  },
];

const webhooks = [
  {
    id: 1,
    url: "https://api.example.com/webhook/projects",
    events: ["project.created", "project.updated"],
    active: true,
  },
  {
    id: 2,
    url: "https://api.example.com/webhook/files",
    events: ["file.uploaded", "file.deleted"],
    active: false,
  },
];

const apiKeys = [
  {
    id: 1,
    name: "Production API Key",
    key: "sk_live_****************************1234",
    created: "Jan 1, 2024",
    lastUsed: "2 hours ago",
  },
  {
    id: 2,
    name: "Development API Key",
    key: "sk_test_****************************5678",
    created: "Dec 15, 2023",
    lastUsed: "1 day ago",
  },
];

export default function Integrations() {
  const [webhookOpen, setWebhookOpen] = useState(false);
  const [apiKeyOpen, setApiKeyOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Integrations & Settings</h1>
        <p className="text-muted-foreground mt-1">
          Connect third-party services and manage API access
        </p>
      </div>

      <Tabs defaultValue="integrations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations">
          <div className="grid gap-4 sm:grid-cols-2">
            {integrations.map((integration, index) => (
              <div
                key={integration.id}
                className={cn(
                  "dashboard-card animate-slide-up",
                  `stagger-${index + 1}`
                )}
                style={{ opacity: 0 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary">
                      <integration.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{integration.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  {integration.connected && (
                    <Badge className="bg-success/10 text-success">
                      <Check className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  {integration.connected ? (
                    <>
                      <span className="text-sm text-muted-foreground">
                        {integration.workspace || integration.account}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          Disconnect
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Button className="w-full">
                      <Plus className="h-4 w-4" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webhooks">
          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Webhook Endpoints</h2>
              <Button size="sm" onClick={() => setWebhookOpen(true)}>
                <Plus className="h-4 w-4" />
                Add Webhook
              </Button>
            </div>
            <div className="space-y-3">
              {webhooks.map((webhook) => (
                <div
                  key={webhook.id}
                  className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent">
                      <Webhook className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm font-mono">{webhook.url}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Events: {webhook.events.join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={webhook.active} />
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="api">
          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">API Keys</h2>
              <Button size="sm" onClick={() => setApiKeyOpen(true)}>
                <Plus className="h-4 w-4" />
                Generate Key
              </Button>
            </div>
            <div className="space-y-3">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-warning/10 text-warning">
                      <Key className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{apiKey.name}</p>
                      <p className="text-sm font-mono text-muted-foreground">
                        {apiKey.key}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm text-muted-foreground">
                      <p>Created: {apiKey.created}</p>
                      <p>Last used: {apiKey.lastUsed}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Revoke
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-warning/5 border border-warning/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> API keys provide full access to your account.
                Keep them secure and never share them publicly.
              </p>
            </div>
          </div>
          <div className="dashboard-card mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info/10 text-info">
                  <ExternalLink className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">API Documentation</p>
                  <p className="text-sm text-muted-foreground">
                    Learn how to integrate with our API
                  </p>
                </div>
              </div>
              <Button variant="outline">
                View Docs
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            <div className="dashboard-card">
              <h2 className="section-title mb-4">Multi-Factor Authentication</h2>
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10 text-success">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">MFA Enabled</p>
                    <p className="text-sm text-muted-foreground">
                      Your account is protected with 2FA
                    </p>
                  </div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </div>

            <div className="dashboard-card">
              <h2 className="section-title mb-4">Session Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Session Timeout</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after inactivity
                    </p>
                  </div>
                  <Input type="number" defaultValue="30" className="w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Remember Device</p>
                    <p className="text-sm text-muted-foreground">
                      Skip 2FA on trusted devices
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <h2 className="section-title mb-4">IP Whitelist</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Restrict access to specific IP addresses (enterprise feature)
              </p>
              <div className="flex gap-2">
                <Input placeholder="Enter IP address (e.g., 192.168.1.0/24)" />
                <Button variant="outline">Add IP</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Webhook Modal */}
      <Dialog open={webhookOpen} onOpenChange={setWebhookOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Webhook</DialogTitle>
            <DialogDescription>
              Create a new webhook endpoint to receive events
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Endpoint URL</Label>
              <Input placeholder="https://your-server.com/webhook" className="mt-1" />
            </div>
            <div>
              <Label>Events</Label>
              <div className="mt-2 space-y-2">
                {["project.created", "project.updated", "file.uploaded", "task.completed"].map(
                  (event) => (
                    <label key={event} className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">{event}</span>
                    </label>
                  )
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setWebhookOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setWebhookOpen(false)}>Create Webhook</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Generate API Key Modal */}
      <Dialog open={apiKeyOpen} onOpenChange={setApiKeyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate API Key</DialogTitle>
            <DialogDescription>
              Create a new API key for programmatic access
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Key Name</Label>
              <Input placeholder="e.g., Production Server" className="mt-1" />
            </div>
            <div>
              <Label>Permissions</Label>
              <div className="mt-2 space-y-2">
                {["Read", "Write", "Delete", "Admin"].map((perm) => (
                  <label key={perm} className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked={perm === "Read"} />
                    <span className="text-sm">{perm}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setApiKeyOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setApiKeyOpen(false)}>Generate Key</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
