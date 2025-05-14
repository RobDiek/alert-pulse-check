
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Activity, Clock, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MonitorDetailProps {
  monitor: {
    id: string;
    name: string;
    url: string;
    status: "online" | "offline" | "warning";
    responseTime: number;
    lastChecked: string;
    uptime: number;
    type: "website" | "server" | "dns" | "database" | "api";
  };
  onClose: () => void;
}

export const MonitorDetail = ({ monitor, onClose }: MonitorDetailProps) => {
  // Beispieldaten für die Graphen
  const responseTimeData = Array(24).fill(0).map((_, i) => ({
    time: `${i}:00`,
    value: Math.floor(monitor.responseTime * (0.8 + Math.random() * 0.4)),
  }));

  const uptimeData = Array(30).fill(0).map((_, i) => ({
    day: `Tag ${i+1}`,
    value: 99.5 + Math.random() * 0.5,
  }));

  const statusHistory = Array(48).fill(0).map((_, i) => {
    const rand = Math.random();
    const status = rand > 0.9 ? "offline" : rand > 0.8 ? "warning" : "online";
    return {
      time: `${Math.floor(i/2)}:${i%2 ? "30" : "00"}`,
      status
    };
  });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 fade-in">
      <div className="glass relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl border border-white/10 shadow-xl">
        <div className="sticky top-0 z-10 flex justify-between items-center p-4 glass border-b border-white/10">
          <div className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-primary" />
            <h2 className="text-xl font-bold">{monitor.name}</h2>
            <StatusBadge status={monitor.status} className="ml-3" />
          </div>
          <Button variant="ghost" className="text-muted-foreground" onClick={onClose}>
            Schließen
          </Button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="glass border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Aktuelle Antwortzeit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monitor.responseTime} ms</div>
              </CardContent>
            </Card>
            
            <Card className="glass border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Uptime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monitor.uptime}%</div>
              </CardContent>
            </Card>
            
            <Card className="glass border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Letzter Check</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg">{monitor.lastChecked}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="response-time" className="w-full mb-6">
            <TabsList className="w-full justify-start glass">
              <TabsTrigger value="response-time">Antwortzeit</TabsTrigger>
              <TabsTrigger value="uptime">Uptime</TabsTrigger>
              <TabsTrigger value="status">Status-Historie</TabsTrigger>
            </TabsList>
            
            <TabsContent value="response-time" className="mt-4">
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle>Antwortzeit (ms) - 24 Stunden</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={responseTimeData}>
                        <defs>
                          <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0072C6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#29F49A" stopOpacity={0.2}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="time" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "rgba(15, 23, 42, 0.8)", 
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "0.5rem"
                          }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#0072C6" 
                          strokeWidth={2}
                          fill="url(#colorResponse)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="uptime" className="mt-4">
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle>Uptime (%) - 30 Tage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={uptimeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="day" stroke="#888" />
                        <YAxis stroke="#888" domain={[99, 100]} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "rgba(15, 23, 42, 0.8)", 
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "0.5rem"
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#29F49A" 
                          strokeWidth={2}
                          dot={{ r: 3, fill: "#29F49A" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="status" className="mt-4">
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle>Status-Historie - 24 Stunden</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 h-[300px] overflow-y-auto p-4">
                    {statusHistory.map((item, index) => (
                      <div key={index} className="flex flex-col items-center mb-3 mr-3">
                        <div className="text-xs text-muted-foreground mb-1">{item.time}</div>
                        <div className={`rounded-full h-6 w-6 flex items-center justify-center ${
                          item.status === 'online' 
                            ? 'bg-emerald-500/30 text-emerald-500' 
                            : item.status === 'warning' 
                              ? 'bg-amber-500/30 text-amber-500' 
                              : 'bg-rose-500/30 text-rose-500'
                        }`}>
                          {item.status === 'online' 
                            ? <CheckCircle size={14} /> 
                            : item.status === 'warning' 
                              ? <AlertTriangle size={14} /> 
                              : <XCircle size={14} />
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-lg">Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3">
                  <div className="flex justify-between items-center">
                    <dt className="text-muted-foreground">URL</dt>
                    <dd className="font-mono text-sm">{monitor.url}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-muted-foreground">Typ</dt>
                    <dd className="capitalize">{monitor.type}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-muted-foreground">Monitoring-ID</dt>
                    <dd className="font-mono text-sm">{monitor.id}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-lg">Aktionen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start glass border-white/10">
                    <Clock className="mr-2 h-4 w-4" />
                    Manuellen Check ausführen
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass border-white/10">
                    <Activity className="mr-2 h-4 w-4" />
                    Benachrichtigungen einrichten
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    <XCircle className="mr-2 h-4 w-4" />
                    Monitoring pausieren
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
