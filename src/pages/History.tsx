
import React from "react";
import { Navbar } from "@/components/Navbar";
import { HistoryChart } from "@/components/HistoryChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Platzhalterdaten für die Verlaufsdiagramme
const generateMockData = (hours: number, baseResponseTime = 100, fluctuation = 50) => {
  const now = new Date();
  const data = [];
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(time.getHours() - i);
    
    // Zufällige Antwortzeit mit Fluktuationen
    let responseTime = baseResponseTime + Math.floor(Math.random() * fluctuation * 2) - fluctuation;
    
    // Manchmal Ausfälle simulieren (ca. 5% Chance)
    const isOffline = Math.random() < 0.05;
    
    data.push({
      timestamp: time.toISOString(),
      responseTime: isOffline ? 0 : responseTime,
      status: isOffline ? "offline" : "online",
    });
  }
  
  return data;
};

const mockHistoryData = {
  "1": generateMockData(24, 187),
  "2": generateMockData(24, 432),
  "3": generateMockData(24, 300),
  "4": generateMockData(24, 67),
  "5": generateMockData(24, 205),
};

// Servicenamen für die Diagramme
const serviceNames = {
  "1": "Hauptwebsite",
  "2": "API Server",
  "3": "E-Mail Server",
  "4": "Datenbank",
  "5": "Dashboard",
};

const History = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 flex-1">
        <h1 className="text-2xl font-bold mb-6">Verlauf</h1>
        
        <Tabs defaultValue="24h" className="mb-6">
          <TabsList>
            <TabsTrigger value="24h">Letzte 24 Stunden</TabsTrigger>
            <TabsTrigger value="7d">Letzte 7 Tage</TabsTrigger>
            <TabsTrigger value="30d">Letzte 30 Tage</TabsTrigger>
          </TabsList>
          
          <TabsContent value="24h" className="mt-4">
            <div className="space-y-6">
              {Object.entries(mockHistoryData).map(([serviceId, data]) => (
                <HistoryChart 
                  key={serviceId}
                  serviceId={serviceId}
                  serviceName={serviceNames[serviceId as keyof typeof serviceNames]}
                  data={data}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="7d" className="mt-4">
            <div className="text-center py-16 text-muted-foreground">
              Hier werden in der vollständigen Version die 7-Tage-Daten angezeigt.
            </div>
          </TabsContent>
          
          <TabsContent value="30d" className="mt-4">
            <div className="text-center py-16 text-muted-foreground">
              Hier werden in der vollständigen Version die 30-Tage-Daten angezeigt.
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-card border-t border-muted py-4">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          ServMonitor &copy; 2023 - Website & Serverüberwachung
        </div>
      </footer>
    </div>
  );
};

export default History;
