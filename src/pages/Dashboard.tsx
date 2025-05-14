
import React, { useState, useEffect } from "react";
import { DiekerLayout } from "@/components/DiekerLayout";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

// Typdefinition für einen Dienst
type ServiceStatus = "online" | "offline" | "warning";
type ServiceType = "website" | "server" | "dns" | "database" | "api";

interface Service {
  id: string;
  name: string;
  url: string;
  status: ServiceStatus;
  responseTime: number;
  lastChecked: string;
  uptime: number;
  type: ServiceType;
}

// Erweiterte Platzhalterdaten für das Dashboard
const mockServices: Service[] = [
  {
    id: "1",
    name: "Hauptwebsite",
    url: "https://example.com",
    status: "online",
    responseTime: 187,
    lastChecked: "2023-05-14 15:45:21",
    uptime: 99.98,
    type: "website"
  },
  {
    id: "2",
    name: "API Server",
    url: "https://api.example.com",
    status: "warning",
    responseTime: 432,
    lastChecked: "2023-05-14 15:45:10",
    uptime: 98.75,
    type: "api"
  },
  {
    id: "3",
    name: "E-Mail Server",
    url: "smtp://mail.example.com:25",
    status: "offline",
    responseTime: 0,
    lastChecked: "2023-05-14 15:44:59",
    uptime: 95.42,
    type: "server"
  },
  {
    id: "4",
    name: "Datenbank",
    url: "db.example.com:5432",
    status: "online",
    responseTime: 67,
    lastChecked: "2023-05-14 15:45:05",
    uptime: 99.99,
    type: "database"
  },
  {
    id: "5",
    name: "Dashboard",
    url: "https://dashboard.example.com",
    status: "online",
    responseTime: 205,
    lastChecked: "2023-05-14 15:45:12",
    uptime: 99.95,
    type: "website"
  },
  {
    id: "6",
    name: "DNS Server",
    url: "ns1.example.com",
    status: "online",
    responseTime: 42,
    lastChecked: "2023-05-14 15:45:18",
    uptime: 99.999,
    type: "dns"
  },
  {
    id: "7",
    name: "Webserver (CPU)",
    url: "webserver1.example.com",
    status: "warning",
    responseTime: 0,
    lastChecked: "2023-05-14 15:45:22",
    uptime: 99.7,
    type: "server"
  },
  {
    id: "8",
    name: "CDN Service",
    url: "cdn.example.com",
    status: "online",
    responseTime: 123,
    lastChecked: "2023-05-14 15:45:30",
    uptime: 99.95,
    type: "website"
  }
];

const Dashboard = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<"all" | ServiceType>("all");

  // Simuliere API-Abruf
  useEffect(() => {
    const loadData = () => {
      setTimeout(() => {
        setServices(mockServices);
        setLoading(false);
        toast({
          title: "Daten geladen",
          description: "Dashboard wurde aktualisiert",
        });
      }, 1000);
    };
    
    loadData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      // Simuliere Statusänderungen bei Aktualisierung
      const updatedServices = mockServices.map(service => ({
        ...service,
        lastChecked: new Date().toISOString().replace('T', ' ').substring(0, 19),
        responseTime: service.status !== 'offline' ? 
          Math.floor(service.responseTime * (0.9 + Math.random() * 0.2)) : 0
      }));
      
      setServices(updatedServices);
      setLoading(false);
      toast({
        title: "Aktualisiert",
        description: "Die neuesten Statusdaten wurden geladen",
      });
    }, 1500);
  };

  const filteredServices = filter === "all" 
    ? services 
    : services.filter(service => service.type === filter);

  const stats = {
    total: services.length,
    online: services.filter(s => s.status === "online").length,
    warning: services.filter(s => s.status === "warning").length,
    offline: services.filter(s => s.status === "offline").length,
  };

  return (
    <DiekerLayout>
      <div className="flex flex-col gap-6 fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold diekerit-gradient-text mb-1">Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              Überwache den Status deiner Dienste und Server in Echtzeit
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleRefresh} className="glass border-white/10 hover:bg-white/10">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Aktualisieren
            </Button>
            
            <Link to="/add-service">
              <Button className="diekerit-gradient-bg hover:opacity-90 glow-button">
                <PlusCircle className="h-4 w-4 mr-2" />
                Neuer Dienst
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Status-Übersicht */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass border-white/10 rounded-xl p-4">
            <p className="text-xs text-muted-foreground">Gesamt</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="glass border-white/10 rounded-xl p-4">
            <p className="text-xs text-muted-foreground">Online</p>
            <p className="text-3xl font-bold text-emerald-500">{stats.online}</p>
          </div>
          <div className="glass border-white/10 rounded-xl p-4">
            <p className="text-xs text-muted-foreground">Warnung</p>
            <p className="text-3xl font-bold text-amber-500">{stats.warning}</p>
          </div>
          <div className="glass border-white/10 rounded-xl p-4">
            <p className="text-xs text-muted-foreground">Offline</p>
            <p className="text-3xl font-bold text-rose-500">{stats.offline}</p>
          </div>
        </div>
        
        {/* Filteroptionen */}
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            onClick={() => setFilter("all")}
            className={filter === "all" ? "diekerit-gradient-bg" : "glass border-white/10"}
            size="sm"
          >
            Alle
          </Button>
          <Button 
            variant={filter === "website" ? "default" : "outline"} 
            onClick={() => setFilter("website")}
            className={filter === "website" ? "diekerit-gradient-bg" : "glass border-white/10"}
            size="sm"
          >
            Websites
          </Button>
          <Button 
            variant={filter === "server" ? "default" : "outline"} 
            onClick={() => setFilter("server")}
            className={filter === "server" ? "diekerit-gradient-bg" : "glass border-white/10"}
            size="sm"
          >
            Server
          </Button>
          <Button 
            variant={filter === "dns" ? "default" : "outline"} 
            onClick={() => setFilter("dns")}
            className={filter === "dns" ? "diekerit-gradient-bg" : "glass border-white/10"}
            size="sm"
          >
            DNS
          </Button>
          <Button 
            variant={filter === "database" ? "default" : "outline"} 
            onClick={() => setFilter("database")}
            className={filter === "database" ? "diekerit-gradient-bg" : "glass border-white/10"}
            size="sm"
          >
            Datenbanken
          </Button>
          <Button 
            variant={filter === "api" ? "default" : "outline"} 
            onClick={() => setFilter("api")}
            className={filter === "api" ? "diekerit-gradient-bg" : "glass border-white/10"}
            size="sm"
          >
            APIs
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading ? (
            // Ladezustand mit Skelett-Cards
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="glass border-white/10 rounded-xl p-4 animate-pulse-slow">
                <div className="flex justify-between items-center">
                  <div className="h-5 bg-white/10 animate-pulse rounded w-1/3"></div>
                  <div className="h-6 bg-white/10 animate-pulse rounded-full w-1/4"></div>
                </div>
                <div className="mt-4 h-4 bg-white/10 animate-pulse rounded w-full"></div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="h-3 bg-white/10 animate-pulse rounded w-2/3"></div>
                    <div className="h-6 bg-white/10 animate-pulse rounded w-1/2 mt-1"></div>
                  </div>
                  <div>
                    <div className="h-3 bg-white/10 animate-pulse rounded w-2/3"></div>
                    <div className="h-6 bg-white/10 animate-pulse rounded w-1/2 mt-1"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                name={service.name}
                url={service.url}
                status={service.status}
                responseTime={service.responseTime}
                lastChecked={service.lastChecked}
                uptime={service.uptime}
                type={service.type}
              />
            ))
          )}
        </div>
        
        {!loading && filteredServices.length === 0 && (
          <div className="text-center py-16 glass rounded-xl border-white/10">
            <h2 className="text-xl font-semibold mb-2 diekerit-gradient-text">Keine Dienste gefunden</h2>
            <p className="text-muted-foreground mb-6">
              {filter === "all" 
                ? "Du hast noch keine Dienste zur Überwachung hinzugefügt." 
                : `Es wurden keine ${filter}-Dienste gefunden.`}
            </p>
            <Link to="/add-service">
              <Button className="diekerit-gradient-bg hover:opacity-90 glow-button">
                <PlusCircle className="h-4 w-4 mr-2" />
                {filter === "all" ? "Ersten Dienst hinzufügen" : `${filter}-Dienst hinzufügen`}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </DiekerLayout>
  );
};

export default Dashboard;
