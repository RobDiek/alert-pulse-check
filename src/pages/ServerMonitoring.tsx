import React, { useState } from "react";
import { DiekerLayout } from "@/components/DiekerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { 
  Cpu, 
  HardDrive, 
  Network, 
  Activity, 
  Download, 
  Upload,
  Server,
  Database,
  Globe
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { toast } from "@/components/ui/use-toast";
import { AddServerForm, ServerFormValues } from "@/components/AddServerForm";
import { AddDnsServerForm, DnsServerFormValues } from "@/components/AddDnsServerForm";
import { AddDomainMonitorForm, DomainMonitorFormValues } from "@/components/AddDomainMonitorForm";
import { AgentConfigGenerator } from "@/components/AgentConfigGenerator";

// Mock-Daten für Server-Metriken
const generateMockServerData = (hours = 24, baseValue = 50, fluctuation = 20) => {
  const now = new Date();
  const data = [];
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(time.getHours() - i);
    
    data.push({
      timestamp: time.toISOString(),
      time: `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`,
      cpu: Math.min(100, Math.max(5, baseValue + Math.floor(Math.random() * fluctuation * 2) - fluctuation)),
      memory: Math.min(100, Math.max(10, (baseValue + 10) + Math.floor(Math.random() * fluctuation * 1.5) - fluctuation)),
      disk: Math.min(100, Math.max(20, (baseValue + 15) + Math.floor(Math.random() * fluctuation / 2) - fluctuation / 4)),
      network: Math.floor(Math.random() * 100 + 50),
      networkIn: Math.floor(Math.random() * 80 + 20),
      networkOut: Math.floor(Math.random() * 40 + 10),
    });
  }
  
  return data;
};

// Mock-Daten für DNS-Metriken
const generateMockDnsData = (hours = 24) => {
  const now = new Date();
  const data = [];
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(time.getHours() - i);
    
    data.push({
      timestamp: time.toISOString(),
      time: `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`,
      queryTime: Math.floor(Math.random() * 50 + 10),
      queries: Math.floor(Math.random() * 500 + 100),
      success: Math.floor(Math.random() * 100),
    });
  }
  
  return data;
};

const mockServers = [
  {
    id: "server1",
    name: "Webserver 1",
    hostname: "web1.example.com",
    ip: "192.168.1.10",
    status: "online",
    data: generateMockServerData(24, 40, 30)
  },
  {
    id: "server2",
    name: "Datenbankserver",
    hostname: "db.example.com",
    ip: "192.168.1.20",
    status: "warning",
    data: generateMockServerData(24, 75, 15)
  },
  {
    id: "server3",
    name: "Fileserver",
    hostname: "files.example.com",
    ip: "192.168.1.30",
    status: "online",
    data: generateMockServerData(24, 30, 10)
  }
];

const mockDnsServers = [
  {
    id: "dns1",
    name: "Primary DNS",
    hostname: "ns1.example.com",
    ip: "192.168.1.5",
    status: "online",
    data: generateMockDnsData(24)
  },
  {
    id: "dns2",
    name: "Secondary DNS",
    hostname: "ns2.example.com",
    ip: "192.168.1.6",
    status: "online",
    data: generateMockDnsData(24)
  }
];

const statusColors = {
  online: "bg-emerald-500",
  warning: "bg-amber-500",
  offline: "bg-rose-500"
};

const ServerMonitoring: React.FC = () => {
  const [activeServer, setActiveServer] = useState(mockServers[0]);
  const [activeDns, setActiveDns] = useState(mockDnsServers[0]);
  const [timeRange, setTimeRange] = useState<"6h" | "24h" | "7d">("24h");
  
  // State für Dialoge
  const [addServerDialogOpen, setAddServerDialogOpen] = useState(false);
  const [addDnsServerDialogOpen, setAddDnsServerDialogOpen] = useState(false);
  const [addDomainDialogOpen, setAddDomainDialogOpen] = useState(false);

  // State für Server-Listen
  const [servers, setServers] = useState(mockServers);
  const [dnsServers, setDnsServers] = useState(mockDnsServers);
  const [monitoredDomains, setMonitoredDomains] = useState([
    { domain: "example.com", status: "active" },
    { domain: "test-domain.de", status: "active" }
  ]);

  // Füge state für den API-Config-Generator hinzu
  const [agentConfigOpen, setAgentConfigOpen] = useState(false);

  // Handler für das Hinzufügen eines neuen Servers
  const handleAddServer = async (data: ServerFormValues) => {
    // In einer echten App würdest du hier eine API-Anfrage senden
    console.log("Adding server:", data);
    
    // Simuliere eine Netzwerkanfrage
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Erstelle einen neuen Server mit Mock-Daten
    const newServer = {
      id: `server${servers.length + 1}`,
      name: data.name,
      hostname: data.hostname,
      ip: data.ip,
      status: "online" as const,
      data: generateMockServerData(24, 40, 30)
    };
    
    // Füge den Server zur Liste hinzu
    setServers([...servers, newServer]);
    
    // Zeige eine Erfolgsmeldung
    toast({
      title: "Server hinzugefügt",
      description: `${data.name} wurde erfolgreich zur Überwachung hinzugefügt.`,
    });
  };

  // Handler für das Hinzufügen eines neuen DNS-Servers
  const handleAddDnsServer = async (data: DnsServerFormValues) => {
    // In einer echten App würdest du hier eine API-Anfrage senden
    console.log("Adding DNS server:", data);
    
    // Simuliere eine Netzwerkanfrage
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Erstelle einen neuen DNS-Server mit Mock-Daten
    const newDnsServer = {
      id: `dns${dnsServers.length + 1}`,
      name: data.name,
      hostname: data.hostname,
      ip: data.ip,
      status: "online" as const,
      data: generateMockDnsData(24)
    };
    
    // Füge den DNS-Server zur Liste hinzu
    setDnsServers([...dnsServers, newDnsServer]);
  };

  // Handler für das Hinzufügen einer neuen Domain zur Überwachung
  const handleAddDomain = async (data: DomainMonitorFormValues) => {
    // In einer echten App würdest du hier eine API-Anfrage senden
    console.log("Adding domain monitoring:", data);
    
    // Simuliere eine Netzwerkanfrage
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Füge die Domain zur Liste hinzu
    setMonitoredDomains([...monitoredDomains, { 
      domain: data.domain, 
      status: "active" 
    }]);
  };

  return (
    <DiekerLayout>
      <div className="flex flex-col gap-6 fade-in">
        <div>
          <h1 className="text-3xl font-bold diekerit-gradient-text mb-1">Server & DNS Monitoring</h1>
          <p className="text-muted-foreground text-sm">
            Detaillierte Performance-Überwachung deiner Server und DNS-Dienste
          </p>
        </div>

        <Tabs defaultValue="server">
          <TabsList className="glass border-white/10">
            <TabsTrigger value="server">Server-Monitoring</TabsTrigger>
            <TabsTrigger value="dns">DNS-Monitoring</TabsTrigger>
          </TabsList>
          
          <TabsContent value="server" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Server-Liste */}
              <div className="lg:col-span-1">
                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Server</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {servers.map((server) => (
                      <button
                        key={server.id}
                        className={`w-full text-left p-3 rounded-md transition-all flex items-center justify-between ${
                          activeServer.id === server.id 
                            ? 'diekerit-gradient-bg' 
                            : 'glass hover:bg-white/5'
                        }`}
                        onClick={() => setActiveServer(server)}
                      >
                        <div className="flex items-center gap-2">
                          <Server className="h-4 w-4" />
                          <span>{server.name}</span>
                        </div>
                        <Badge className={`${statusColors[server.status]} border-0`}>
                          {server.status === "online" ? "Online" : server.status === "warning" ? "Warnung" : "Offline"}
                        </Badge>
                      </button>
                    ))}
                    
                    <Button 
                      className="w-full mt-4 glass border-white/10 hover:bg-white/10"
                      onClick={() => setAddServerDialogOpen(true)}
                    >
                      Server hinzufügen
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              {/* Server-Details */}
              <div className="lg:col-span-3 space-y-4">
                <Card className="glass border-white/10">
                  <CardHeader className="flex flex-row justify-between items-center pb-2">
                    <div>
                      <CardTitle className="text-lg font-medium">{activeServer.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {activeServer.hostname} ({activeServer.ip})
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" variant="outline" 
                        className={timeRange === "6h" ? "diekerit-gradient-bg" : "glass border-white/10"}
                        onClick={() => setTimeRange("6h")}
                      >
                        6h
                      </Button>
                      <Button 
                        size="sm" variant="outline" 
                        className={timeRange === "24h" ? "diekerit-gradient-bg" : "glass border-white/10"}
                        onClick={() => setTimeRange("24h")}
                      >
                        24h
                      </Button>
                      <Button 
                        size="sm" variant="outline" 
                        className={timeRange === "7d" ? "diekerit-gradient-bg" : "glass border-white/10"}
                        onClick={() => setTimeRange("7d")}
                      >
                        7d
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex flex-col p-3 glass rounded-md">
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                          <Cpu className="h-3.5 w-3.5 mr-1" />
                          <span>CPU</span>
                        </div>
                        <div className="text-2xl font-bold">
                          {activeServer.data[activeServer.data.length - 1].cpu}%
                        </div>
                      </div>
                      <div className="flex flex-col p-3 glass rounded-md">
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                          <Server className="h-3.5 w-3.5 mr-1" />
                          <span>RAM</span>
                        </div>
                        <div className="text-2xl font-bold">
                          {activeServer.data[activeServer.data.length - 1].memory}%
                        </div>
                      </div>
                      <div className="flex flex-col p-3 glass rounded-md">
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                          <HardDrive className="h-3.5 w-3.5 mr-1" />
                          <span>Disk</span>
                        </div>
                        <div className="text-2xl font-bold">
                          {activeServer.data[activeServer.data.length - 1].disk}%
                        </div>
                      </div>
                      <div className="flex flex-col p-3 glass rounded-md">
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                          <Network className="h-3.5 w-3.5 mr-1" />
                          <span>Network</span>
                        </div>
                        <div className="text-2xl font-bold">
                          {activeServer.data[activeServer.data.length - 1].network} MB/s
                        </div>
                      </div>
                    </div>
                    
                    {/* CPU-Auslastung Grafik */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium mb-2">CPU-Auslastung</h3>
                      <div className="h-64">
                        <ChartContainer config={{ cpu: { color: "#0072C6" } }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                              data={activeServer.data.slice(-24)}
                              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                            >
                              <defs>
                                <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#0072C6" stopOpacity={0.4} />
                                  <stop offset="95%" stopColor="#0072C6" stopOpacity={0.05} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                              <XAxis
                                dataKey="time"
                                stroke="rgba(255,255,255,0.3)"
                                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                              />
                              <YAxis
                                stroke="rgba(255,255,255,0.3)"
                                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                                domain={[0, 100]}
                                unit="%"
                              />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Area
                                type="monotone"
                                dataKey="cpu"
                                stroke="#0072C6"
                                strokeWidth={2}
                                fill="url(#cpuGradient)"
                                activeDot={{ r: 6 }}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                    </div>
                    
                    {/* Speicher & Netzwerk Grafik */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">RAM & Disk</h3>
                        <div className="h-48">
                          <ChartContainer
                            config={{
                              memory: { color: "#29F49A" },
                              disk: { color: "#f4a829" },
                            }}
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={activeServer.data.slice(-24)}
                                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis
                                  dataKey="time"
                                  stroke="rgba(255,255,255,0.3)"
                                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                                />
                                <YAxis
                                  stroke="rgba(255,255,255,0.3)"
                                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                                  domain={[0, 100]}
                                  unit="%"
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Line
                                  type="monotone"
                                  dataKey="memory"
                                  stroke="#29F49A"
                                  strokeWidth={2}
                                  dot={false}
                                  activeDot={{ r: 4 }}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="disk"
                                  stroke="#f4a829"
                                  strokeWidth={2}
                                  dot={false}
                                  activeDot={{ r: 4 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Netzwerk (MB/s)</h3>
                        <div className="h-48">
                          <ChartContainer
                            config={{
                              networkIn: { color: "#0072C6" },
                              networkOut: { color: "#29F49A" },
                            }}
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={activeServer.data.slice(-24)}
                                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis
                                  dataKey="time"
                                  stroke="rgba(255,255,255,0.3)"
                                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                                />
                                <YAxis
                                  stroke="rgba(255,255,255,0.3)"
                                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Line
                                  type="monotone"
                                  name="Eingehend"
                                  dataKey="networkIn"
                                  stroke="#0072C6"
                                  strokeWidth={2}
                                  dot={false}
                                  activeDot={{ r: 4 }}
                                />
                                <Line
                                  type="monotone"
                                  name="Ausgehend"
                                  dataKey="networkOut"
                                  stroke="#29F49A"
                                  strokeWidth={2}
                                  dot={false}
                                  activeDot={{ r: 4 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Server Push Monitor Setup */}
                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Push-Monitor einrichten</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm">
                        Installiere unseren leichtgewichtigen Agent, um detaillierte System-Metriken zu sammeln und in Echtzeit an ServMonitor zu senden.
                      </p>
                      
                      <div className="flex gap-2">
                        <Button 
                          className="diekerit-gradient-bg hover:opacity-90 glow-button"
                          onClick={() => setAgentConfigOpen(true)}
                        >
                          Agent konfigurieren
                        </Button>
                        <Button 
                          variant="outline" 
                          className="glass border-white/10 hover:bg-white/10"
                          onClick={() => window.open("https://docs.diekerit.de/monitoring-agent", "_blank")}
                        >
                          Dokumentation
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="dns" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* DNS-Liste */}
              <div className="lg:col-span-1">
                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">DNS-Server</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {dnsServers.map((dns) => (
                      <button
                        key={dns.id}
                        className={`w-full text-left p-3 rounded-md transition-all flex items-center justify-between ${
                          activeDns.id === dns.id 
                            ? 'diekerit-gradient-bg' 
                            : 'glass hover:bg-white/5'
                        }`}
                        onClick={() => setActiveDns(dns)}
                      >
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <span>{dns.name}</span>
                        </div>
                        <Badge className={`${statusColors[dns.status]} border-0`}>
                          {dns.status === "online" ? "Online" : dns.status === "warning" ? "Warnung" : "Offline"}
                        </Badge>
                      </button>
                    ))}
                    
                    <Button 
                      className="w-full mt-4 glass border-white/10 hover:bg-white/10"
                      onClick={() => setAddDnsServerDialogOpen(true)}
                    >
                      DNS-Server hinzufügen
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="glass border-white/10 mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">DNS-Änderungen überwachen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm">
                        Füge Domains hinzu, deren DNS-Einträge überwacht werden sollen:
                      </p>
                      
                      <div className="glass border-white/10 rounded-md p-3">
                        {monitoredDomains.map((domain, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border-b border-white/10 last:border-b-0">
                            <div className="text-sm">{domain.domain}</div>
                            <Badge className="bg-emerald-500 border-0">Aktiv</Badge>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full diekerit-gradient-bg hover:opacity-90 glow-button"
                        onClick={() => setAddDomainDialogOpen(true)}
                      >
                        Domain hinzufügen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* DNS-Details */}
              <div className="lg:col-span-3 space-y-4">
                <Card className="glass border-white/10">
                  <CardHeader className="flex flex-row justify-between items-center pb-2">
                    <div>
                      <CardTitle className="text-lg font-medium">{activeDns.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {activeDns.hostname} ({activeDns.ip})
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" variant="outline" 
                        className={timeRange === "6h" ? "diekerit-gradient-bg" : "glass border-white/10"}
                        onClick={() => setTimeRange("6h")}
                      >
                        6h
                      </Button>
                      <Button 
                        size="sm" variant="outline" 
                        className={timeRange === "24h" ? "diekerit-gradient-bg" : "glass border-white/10"}
                        onClick={() => setTimeRange("24h")}
                      >
                        24h
                      </Button>
                      <Button 
                        size="sm" variant="outline" 
                        className={timeRange === "7d" ? "diekerit-gradient-bg" : "glass border-white/10"}
                        onClick={() => setTimeRange("7d")}
                      >
                        7d
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex flex-col p-3 glass rounded-md">
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                          <Activity className="h-3.5 w-3.5 mr-1" />
                          <span>Antwortzeit</span>
                        </div>
                        <div className="text-2xl font-bold">
                          {activeDns.data[activeDns.data.length - 1].queryTime} ms
                        </div>
                      </div>
                      <div className="flex flex-col p-3 glass rounded-md">
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                          <Database className="h-3.5 w-3.5 mr-1" />
                          <span>Abfragen/h</span>
                        </div>
                        <div className="text-2xl font-bold">
                          {activeDns.data[activeDns.data.length - 1].queries}
                        </div>
                      </div>
                      <div className="flex flex-col p-3 glass rounded-md">
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                          <Network className="h-3.5 w-3.5 mr-1" />
                          <span>Erfolgsrate</span>
                        </div>
                        <div className="text-2xl font-bold">
                          {activeDns.data[activeDns.data.length - 1].success}%
                        </div>
                      </div>
                    </div>
                    
                    {/* DNS-Antwortzeit Grafik */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium mb-2">DNS-Antwortzeit (ms)</h3>
                      <div className="h-64">
                        <ChartContainer config={{ queryTime: { color: "#0072C6" } }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                              data={activeDns.data.slice(-24)}
                              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                            >
                              <defs>
                                <linearGradient id="dnsGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#0072C6" stopOpacity={0.4} />
                                  <stop offset="95%" stopColor="#0072C6" stopOpacity={0.05} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                              <XAxis
                                dataKey="time"
                                stroke="rgba(255,255,255,0.3)"
                                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                              />
                              <YAxis
                                stroke="rgba(255,255,255,0.3)"
                                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                              />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Area
                                type="monotone"
                                dataKey="queryTime"
                                stroke="#0072C6"
                                strokeWidth={2}
                                fill="url(#dnsGradient)"
                                activeDot={{ r: 6 }}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                    </div>
                    
                    {/* DNS-Abfragen Grafik */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">DNS-Abfragen</h3>
                      <div className="h-48">
                        <ChartContainer
                          config={{
                            queries: { color: "#29F49A" },
                          }}
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                              data={activeDns.data.slice(-24)}
                              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                            >
                              <defs>
                                <linearGradient id="queriesGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#29F49A" stopOpacity={0.4} />
                                  <stop offset="95%" stopColor="#29F49A" stopOpacity={0.05} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                              <XAxis
                                dataKey="time"
                                stroke="rgba(255,255,255,0.3)"
                                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                              />
                              <YAxis
                                stroke="rgba(255,255,255,0.3)"
                                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                              />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Area
                                type="monotone"
                                dataKey="queries"
                                stroke="#29F49A"
                                strokeWidth={2}
                                fill="url(#queriesGradient)"
                                activeDot={{ r: 4 }}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* DNS-Einträge */}
                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">DNS-Änderungen überwachen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm mb-4">
                        Überwache Änderungen an DNS-Einträgen für deine Domains:
                      </p>
                      
                      <div className="glass border-white/10 rounded-md p-4">
                        <h4 className="text-md font-medium mb-2">example.com</h4>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-2 glass rounded-md">
                            <div className="flex-1">
                              <div className="text-xs text-muted-foreground">Typ</div>
                              <div>A</div>
                            </div>
                            <div className="flex-1">
                              <div className="text-xs text-muted-foreground">Name</div>
                              <div>@</div>
                            </div>
                            <div className="flex-2">
                              <div className="text-xs text-muted-foreground">Wert</div>
                              <div>192.168.1.100</div>
                            </div>
                            <div className="flex-1">
                              <Badge className="bg-emerald-500 border-0">Unverändert</Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-2 glass rounded-md">
                            <div className="flex-1">
                              <div className="text-xs text-muted-foreground">Typ</div>
                              <div>MX</div>
                            </div>
                            <div className="flex-1">
                              <div className="text-xs text-muted-foreground">Name</div>
                              <div>@</div>
                            </div>
                            <div className="flex-2">
                              <div className="text-xs text-muted-foreground">Wert</div>
                              <div>mail.example.com</div>
                            </div>
                            <div className="flex-1">
                              <Badge className="bg-amber-500 border-0">Geändert</Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-2 glass rounded-md">
                            <div className="flex-1">
                              <div className="text-xs text-muted-foreground">Typ</div>
                              <div>CNAME</div>
                            </div>
                            <div className="flex-1">
                              <div className="text-xs text-muted-foreground">Name</div>
                              <div>www</div>
                            </div>
                            <div className="flex-2">
                              <div className="text-xs text-muted-foreground">Wert</div>
                              <div>@</div>
                            </div>
                            <div className="flex-1">
                              <Badge className="bg-emerald-500 border-0">Unverändert</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <Button className="mt-4 glass border-white/10 hover:bg-white/10">
                          Verlauf anzeigen
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialoge für das Hinzufügen von Servern und Domains */}
      <AddServerForm 
        open={addServerDialogOpen} 
        onOpenChange={setAddServerDialogOpen}
        onAddServer={handleAddServer}
      />
      
      <AddDnsServerForm 
        open={addDnsServerDialogOpen} 
        onOpenChange={setAddDnsServerDialogOpen}
        onAddDnsServer={handleAddDnsServer}
      />
      
      <AddDomainMonitorForm 
        open={addDomainDialogOpen} 
        onOpenChange={setAddDomainDialogOpen}
        onAddDomain={handleAddDomain}
      />
      
      <AgentConfigGenerator
        open={agentConfigOpen}
        onOpenChange={setAgentConfigOpen}
      />
    </DiekerLayout>
  );
};

export default ServerMonitoring;
