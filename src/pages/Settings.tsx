import { useState } from "react";
import { User, Bell, Palette, Globe, Shield, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="flex-wrap">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="language">
            <Globe className="h-4 w-4 mr-2" />
            Language
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Shield className="h-4 w-4 mr-2" />
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="dashboard-card">
            <h2 className="section-title mb-6">Personal Information</h2>
            <div className="flex items-center gap-6 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>First Name</Label>
                <Input defaultValue="John" className="mt-1" />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input defaultValue="Doe" className="mt-1" />
              </div>
              <div>
                <Label>Email</Label>
                <Input defaultValue="john@company.com" className="mt-1" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input defaultValue="+1 234 567 8900" className="mt-1" />
              </div>
              <div className="sm:col-span-2">
                <Label>Job Title</Label>
                <Input defaultValue="Product Manager" className="mt-1" />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="dashboard-card">
            <h2 className="section-title mb-6">Notification Preferences</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  {[
                    { id: "project-updates", label: "Project updates", desc: "Get notified about project status changes" },
                    { id: "team-activity", label: "Team activity", desc: "When team members join or leave" },
                    { id: "billing", label: "Billing alerts", desc: "Invoice and payment notifications" },
                    { id: "security", label: "Security alerts", desc: "Important security notifications" },
                    { id: "marketing", label: "Product news", desc: "New features and updates" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch defaultChecked={item.id !== "marketing"} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-4">Push Notifications</h3>
                <div className="space-y-4">
                  {[
                    { id: "mentions", label: "Mentions", desc: "When someone mentions you" },
                    { id: "comments", label: "Comments", desc: "New comments on your work" },
                    { id: "approvals", label: "Approvals", desc: "Items requiring your approval" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <div className="dashboard-card">
            <h2 className="section-title mb-6">Appearance</h2>
            <div className="space-y-6">
              <div>
                <Label>Theme</Label>
                <Select defaultValue="system">
                  <SelectTrigger className="mt-1 w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Density</Label>
                <Select defaultValue="comfortable">
                  <SelectTrigger className="mt-1 w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Reduce motion</p>
                  <p className="text-xs text-muted-foreground">
                    Minimize animations throughout the interface
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="language">
          <div className="dashboard-card">
            <h2 className="section-title mb-6">Language & Region</h2>
            <div className="space-y-6">
              <div>
                <Label>Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="mt-1 w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Timezone</Label>
                <Select defaultValue="ist">
                  <SelectTrigger className="mt-1 w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                    <SelectItem value="est">Eastern Time (ET)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="gmt">GMT</SelectItem>
                    <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Date Format</Label>
                <Select defaultValue="mdy">
                  <SelectTrigger className="mt-1 w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="privacy">
          <div className="dashboard-card">
            <h2 className="section-title mb-6">Privacy Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Profile visibility</p>
                  <p className="text-xs text-muted-foreground">
                    Make your profile visible to other users
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Activity status</p>
                  <p className="text-xs text-muted-foreground">
                    Show when you're online
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Analytics tracking</p>
                  <p className="text-xs text-muted-foreground">
                    Help us improve by sharing usage data
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Marketing communications</p>
                  <p className="text-xs text-muted-foreground">
                    Receive promotional emails
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
