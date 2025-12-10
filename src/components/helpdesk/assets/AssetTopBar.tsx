import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Package, ChevronRight, Home } from "lucide-react";

export const AssetTopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Overview", path: "/helpdesk/assets" },
    { label: "All Assets", path: "/helpdesk/assets/allassets" },
    { label: "Reports", path: "/helpdesk/assets/reports" },
    { label: "Setup", path: "/helpdesk/assets/setup" },
    { label: "Tools", path: "/helpdesk/assets/tools" },
  ];

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b bg-background">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/helpdesk")}
        className="gap-1"
      >
        <Home className="h-4 w-4" />
      </Button>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
      <Package className="h-4 w-4 text-primary" />
      <span className="font-medium text-sm">Assets</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
      
      <div className="flex items-center gap-1 ml-2">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant={location.pathname === item.path ? "secondary" : "ghost"}
            size="sm"
            onClick={() => navigate(item.path)}
            className="h-7 text-xs"
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
