import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Shield, ArrowLeft, Headphones } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import logo from "@/assets/appmaster-logo.png";
import { useState, useEffect } from "react";
import { NotificationPanel } from "@/components/NotificationPanel";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const {
    user,
    signOut,
    userType,
    appmasterRole
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isProfilePage = location.pathname.startsWith("/profile");
  const isLoginPage = location.pathname === "/login";
  const [isScrolled, setIsScrolled] = useState(false);

  const isSuperAdmin = userType === 'appmaster_admin' || appmasterRole;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoginPage) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[var(--transition-base)] ${isScrolled ? "bg-background/95 backdrop-blur-lg shadow-sm border-b" : "bg-transparent"}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-1 items-center justify-between flex flex-row">
        <div className="flex items-center gap-2">
          <Link to="/helpdesk" className="flex items-center">
            <img 
              src={logo} 
              alt="RT-App" 
              className="h-7 w-auto"
            />
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="opacity-0 hover:opacity-100 transition-opacity duration-[var(--transition-base)]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex items-center gap-1">
          {user ? (
            <>
              {!isProfilePage && <NotificationPanel />}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {!isProfilePage && (
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/helpdesk" className="cursor-pointer">
                      <Headphones className="mr-2 h-4 w-4" />
                      Helpdesk
                    </Link>
                  </DropdownMenuItem>
                  {isSuperAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/super-admin" className="cursor-pointer">
                        <Shield className="mr-2 h-4 w-4" />
                        Super Admin
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={async () => {
                    try {
                      await signOut();
                      toast({
                        title: "Logged out successfully",
                        description: "You have been signed out of your account.",
                      });
                    } catch (error) {
                      toast({
                        title: "Logout completed",
                        description: "Session cleared. You have been logged out.",
                        variant: "default",
                      });
                    }
                  }} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/login">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
