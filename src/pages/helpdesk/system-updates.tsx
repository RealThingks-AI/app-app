import { Card, CardContent } from "@/components/ui/card";
import { Server, Clock, RefreshCw, XCircle, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function SystemUpdates() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 pt-2 pb-3">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-2">
          <TabsList className="h-8">
            <TabsTrigger value="overview" className="gap-1.5 px-3 text-sm h-7">
              Overview
            </TabsTrigger>
            <TabsTrigger value="machines" className="gap-1.5 px-3 text-sm h-7">
              <Server className="h-3.5 w-3.5" />
              Machines
            </TabsTrigger>
            <TabsTrigger value="updates" className="gap-1.5 px-3 text-sm h-7">
              <Download className="h-3.5 w-3.5" />
              Updates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-3 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Server className="h-4 w-4 text-blue-600" />
                    <span className="text-2xl font-bold">0</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Active Machines</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-2xl font-bold">0</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Pending Updates</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <RefreshCw className="h-4 w-4 text-yellow-600" />
                    <span className="text-2xl font-bold">0</span>
                  </div>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-2xl font-bold">0</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Failed</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="machines" className="space-y-2 mt-2">
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                Active machines list - coming soon
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="updates" className="space-y-2 mt-2">
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                Updates management - coming soon
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
