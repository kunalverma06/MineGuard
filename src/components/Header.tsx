import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mountain, Menu, X, User, LogOut, Activity, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (session?.user) checkAdminRole(session.user.id);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user || null);
        if (session?.user) {
          checkAdminRole(session.user.id);
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .single();

      setIsAdmin(data?.role === "admin");
    } catch (error) {
      console.error("Error checking admin role:", error);
      setIsAdmin(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Mountain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MineSafe AI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-[2.2rem] ">
            <a href="/" className="text-foreground hover:text-primary transition-smooth">
              Home
            </a>
            <a href="/dashboard" className="text-foreground hover:text-primary transition-smooth">
              Dashboard
            </a>
            <a href="/risk-map" className="text-foreground hover:text-primary transition-smooth">
              Risk Map
            </a>
            <a href="/forecasts" className="text-foreground hover:text-primary transition-smooth">
              Forecasts
            </a>
            <a href="/alerts" className="text-foreground hover:text-primary transition-smooth">
              Alerts
            </a>
            {isAdmin && (
              <a href="/admin" className="text-foreground hover:text-primary transition-smooth">
                Admin
              </a>
            )}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm text-foreground">
                    {user.email?.split("@")[0]}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <a href="/auth">Sign In</a>
                </Button>
                <Button size="sm" asChild>
                  <a href="/auth">Get Started</a>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-foreground hover:text-primary transition-smooth py-2" onClick={() => setIsMenuOpen(false)}>
                Home
              </a>
              <a href="/dashboard" className="text-foreground hover:text-primary transition-smooth py-2" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </a>
              <a href="/risk-map" className="text-foreground hover:text-primary transition-smooth py-2" onClick={() => setIsMenuOpen(false)}>
                Risk Map
              </a>
              <a href="/forecasts" className="text-foreground hover:text-primary transition-smooth py-2" onClick={() => setIsMenuOpen(false)}>
                Forecasts
              </a>
              <a href="/alerts" className="text-foreground hover:text-primary transition-smooth py-2" onClick={() => setIsMenuOpen(false)}>
                Alerts
              </a>
              {isAdmin && (
                <a href="/admin" className="text-foreground hover:text-primary transition-smooth py-2" onClick={() => setIsMenuOpen(false)}>
                  Admin Panel
                </a>
              )}

              {/* Mobile Auth */}
              <div className="pt-4 border-t border-border">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 py-2">
                      <User className="h-4 w-4" />
                      <span className="text-sm text-foreground">{user.email?.split("@")[0]}</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleSignOut} className="w-full flex items-center justify-center space-x-1">
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" size="sm" asChild className="justify-start">
                      <a href="/auth" onClick={() => setIsMenuOpen(false)}>Sign In</a>
                    </Button>
                    <Button size="sm" asChild className="justify-start">
                      <a href="/auth" onClick={() => setIsMenuOpen(false)}>Get Started</a>
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
