import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, Mail, Clock, Shield, Palette, Users } from "lucide-react";

export default function SettingsModule() {
  return (
    <div className="w-full h-full space-y-4">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="sla">SLA</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-3 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <CardTitle>User Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-muted-foreground">User management - coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-3 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Organization Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div className="space-y-1.5">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" placeholder="Your Company" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-3 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between py-2">
                <Label>Ticket Created</Label>
                <Switch />
              </div>
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-3 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <CardTitle>Email Configuration</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div className="space-y-1.5">
                <Label htmlFor="smtp-host">SMTP Host</Label>
                <Input id="smtp-host" placeholder="smtp.gmail.com" />
              </div>
              <Button>Test Connection</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sla" className="space-y-3 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <CardTitle>SLA Policies</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <Button>Add New SLA Policy</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-3 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>Security Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between py-2">
                <Label>Two-Factor Authentication</Label>
                <Switch />
              </div>
              <Button>Update Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
