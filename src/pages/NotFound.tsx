
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <Activity className="h-10 w-10 text-primary mr-2" />
          <h1 className="text-3xl font-bold">ServMonitor</h1>
        </div>
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Diese Seite konnte nicht gefunden werden
        </p>
        <Link to="/">
          <Button>Zurück zur Startseite</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
