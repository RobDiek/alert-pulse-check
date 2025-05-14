
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

// Type definition for a service
type ServiceStatus = "online" | "offline" | "warning";

interface Service {
  id: string;
  name: string;
  url: string;
  status: ServiceStatus;
  responseTime: number;
  lastChecked: string;
  uptime: number;
}

// Platzhalterdaten für das Dashboard
const mockServices: Service[] = [
  {
    id: "1",
    name: "Hauptwebsite",
    url: "https://example.com",
    status: "online",
    responseTime: 187,
    lastChecked: "2023-05-14 15:45:21",
    uptime: 99.98,
  },
  {
    id: "2",
    name: "API Server",
    url: "https://api.example.com",
    status: "warning",
    responseTime: 432,
    lastChecked: "2023-05-14 15:45:10",
    uptime: 98.75,
  },
  {
    id: "3",
    name: "E-Mail Server",
    url: "https://mail.example.com",
    status: "offline",
    responseTime: 0,
    lastChecked: "2023-05-14 15:44:59",
    uptime: 95.42,
  },
  {
    id: "4",
    name: "Datenbank",
    url: "db.example.com:5432",
    status: "online",
    responseTime: 67,
    lastChecked: "2023-05-14 15:45:05",
    uptime: 99.99,
  },
  {
    id: "5",
    name: "Dashboard",
    url: "https://dashboard.example.com",
    status: "online",
    responseTime: 205,
    lastChecked: "2023-05-14 15:45:12",
    uptime: 99.95,
  }
];

const Dashboard = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Simuliere API-Abruf
  useEffect(() => {
    setTimeout(() => {
      setServices(mockServices);
      setLoading(false);
      toast({
        title: "Daten geladen",
        description: "Dashboard wurde aktualisiert",
      });
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Link to="/add-service">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Neuer Dienst
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading ? (
            // Ladezustand mit Skelett-Cards
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="border rounded-md p-4 border-muted">
                <div className="flex justify-between items-center">
                  <div className="h-5 bg-muted animate-pulse rounded w-1/3"></div>
                  <div className="h-6 bg-muted animate-pulse rounded-full w-1/4"></div>
                </div>
                <div className="mt-4 h-4 bg-muted animate-pulse rounded w-full"></div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="h-3 bg-muted animate-pulse rounded w-2/3"></div>
                    <div className="h-6 bg-muted animate-pulse rounded w-1/2 mt-1"></div>
                  </div>
                  <div>
                    <div className="h-3 bg-muted animate-pulse rounded w-2/3"></div>
                    <div className="h-6 bg-muted animate-pulse rounded w-1/2 mt-1"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            services.map((service) => (
              <ServiceCard
                key={service.id}
                name={service.name}
                url={service.url}
                status={service.status}
                responseTime={service.responseTime}
                lastChecked={service.lastChecked}
                uptime={service.uptime}
              />
            ))
          )}
        </div>
        
        {!loading && services.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold mb-2">Keine Dienste gefunden</h2>
            <p className="text-muted-foreground mb-6">
              Du hast noch keine Dienste zur Überwachung hinzugefügt.
            </p>
            <Link to="/add-service">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Ersten Dienst hinzufügen
              </Button>
            </Link>
          </div>
        )}
      </main>
      
      <footer className="bg-card border-t border-muted py-4">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          ServMonitor &copy; 2023 - Website & Serverüberwachung
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
