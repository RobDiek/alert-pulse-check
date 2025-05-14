
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, LayoutDashboard, History as HistoryIcon, PlusCircle, Server, Network } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="glass border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto py-3 px-4">
        <div className="flex justify-between items-center">
          {/* Logo und Titel */}
          <div className="flex items-center">
            <Activity className="h-6 w-6 text-diekerit-green mr-2" />
            <span className="text-xl font-bold diekerit-gradient-text">ServMonitor</span>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            <NavButton 
              to="/dashboard" 
              icon={<LayoutDashboard className="h-4 w-4" />} 
              label="Dashboard" 
              active={currentPath === "/dashboard"} 
            />
            <NavButton 
              to="/server-monitoring" 
              icon={<Server className="h-4 w-4" />} 
              label="Server & DNS" 
              active={currentPath === "/server-monitoring"} 
            />
            <NavButton 
              to="/history" 
              icon={<HistoryIcon className="h-4 w-4" />} 
              label="Verlauf" 
              active={currentPath === "/history"} 
            />
            <NavButton 
              to="/add-service" 
              icon={<PlusCircle className="h-4 w-4" />} 
              label="Hinzufügen" 
              active={currentPath === "/add-service"} 
            />
          </nav>
          
          {/* Mobile-Ansicht anpassen */}
          <div className="md:hidden flex space-x-1">
            <NavButton 
              to="/dashboard" 
              icon={<LayoutDashboard className="h-4 w-4" />} 
              active={currentPath === "/dashboard"} 
            />
            <NavButton 
              to="/server-monitoring" 
              icon={<Server className="h-4 w-4" />} 
              active={currentPath === "/server-monitoring"} 
            />
            <NavButton 
              to="/history" 
              icon={<HistoryIcon className="h-4 w-4" />} 
              active={currentPath === "/history"} 
            />
            <NavButton 
              to="/add-service" 
              icon={<PlusCircle className="h-4 w-4" />} 
              active={currentPath === "/add-service"} 
            />
          </div>
        </div>
      </div>
    </header>
  );
};

// Hilfsfunktion für die Navigationsbuttons
const NavButton = ({ to, icon, label, active }: { 
  to: string; 
  icon: React.ReactNode;
  label?: string;
  active: boolean;
}) => {
  return (
    <Link to={to}>
      <Button
        variant={active ? "default" : "ghost"}
        className={active 
          ? "diekerit-gradient-bg hover:opacity-90" 
          : "hover:bg-white/5 text-foreground/70 hover:text-foreground"
        }
        size={label ? "default" : "icon"}
      >
        {icon}
        {label && <span className="ml-2">{label}</span>}
      </Button>
    </Link>
  );
};
