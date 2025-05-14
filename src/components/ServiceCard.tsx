
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { Cpu, Globe, Server, Database, Activity } from "lucide-react";

interface ServiceCardProps {
  name: string;
  url: string;
  status: "online" | "offline" | "warning";
  responseTime: number;
  lastChecked: string;
  uptime: number;
  type?: "website" | "server" | "dns" | "database" | "api";
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  url,
  status,
  responseTime,
  lastChecked,
  uptime,
  type = "website"
}) => {
  // Icon basierend auf Typ auswählen
  const getIcon = () => {
    switch (type) {
      case "server": return <Server className="h-5 w-5" />;
      case "dns": return <Globe className="h-5 w-5" />;
      case "database": return <Database className="h-5 w-5" />;
      case "api": return <Activity className="h-5 w-5" />;
      default: return <Globe className="h-5 w-5" />;
    }
  };

  return (
    <Card className="monitor-card border-0 hover-scale">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center space-x-2">
          <div className={`p-1.5 rounded ${status === 'online' ? 'bg-emerald-500/20' : status === 'warning' ? 'bg-amber-500/20' : 'bg-rose-500/20'}`}>
            {getIcon()}
          </div>
          <CardTitle className="text-md font-semibold">{name}</CardTitle>
        </div>
        <StatusBadge status={status} />
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-xs text-muted-foreground truncate mb-4">{url}</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Antwortzeit</p>
            <p className="text-xl font-semibold flex items-end gap-1">
              {responseTime} 
              <span className="text-sm text-muted-foreground">ms</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Uptime</p>
            <p className="text-xl font-semibold flex items-end gap-1">
              {uptime}
              <span className="text-sm text-muted-foreground">%</span>
            </p>
          </div>
        </div>
        
        <div className="mt-4 pt-2 border-t border-white/10 flex justify-between items-center">
          <p className="text-xs text-muted-foreground">Letzter Check: {lastChecked}</p>
          
          <div className={`h-1.5 w-1.5 rounded-full ${status === 'online' ? 'bg-emerald-500 animate-pulse' : status === 'warning' ? 'bg-amber-500 animate-pulse' : 'bg-rose-500'}`}></div>
        </div>
      </CardContent>
    </Card>
  );
};
