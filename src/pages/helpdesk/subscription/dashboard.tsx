import { Card, CardContent } from "@/components/ui/card";
import { Package, Calendar, AlertTriangle, Users, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SubscriptionOverview() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/helpdesk/subscription/tools")}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Package className="h-4 w-4 text-primary" />
              <span className="text-2xl font-bold">0</span>
            </div>
            <p className="text-xs text-muted-foreground">Active Subscriptions</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-2xl font-bold">0</span>
            </div>
            <p className="text-xs text-muted-foreground">Pending Renewals</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-4 w-4 text-green-600" />
              <span className="text-2xl font-bold">0</span>
            </div>
            <p className="text-xs text-muted-foreground">Total Licenses</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-4 w-4 text-purple-600" />
              <span className="text-2xl font-bold">0</span>
            </div>
            <p className="text-xs text-muted-foreground">Vendors</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          Subscription management dashboard - coming soon
        </CardContent>
      </Card>
    </div>
  );
}
