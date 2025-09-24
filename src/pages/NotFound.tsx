import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center animate-fade-in">
        <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 animate-glow">
          <AlertCircle className="w-12 h-12 text-white" />
        </div>
        <h1 className="mb-4 text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">404</h1>
        <p className="mb-8 text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
          Oops! The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Button 
          size="lg" 
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300 group"
          onClick={() => window.location.href = "/"}
        >
          <Home className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
