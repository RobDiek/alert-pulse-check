
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, PlusCircle, History, Settings } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-card border-b border-muted">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">ServMonitor</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link to="/history">
            <Button variant="ghost">
              <History className="h-4 w-4 mr-2" />
              Verlauf
            </Button>
          </Link>
          <Link to="/add-service">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Neuer Dienst
            </Button>
          </Link>
        </div>
        
        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
