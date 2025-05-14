import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiekerLayout } from "@/components/DiekerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AddServerForm, ServerFormValues } from "@/components/AddServerForm";
import { AddDnsServerForm, DnsServerFormValues } from "@/components/AddDnsServerForm";
import { AddDomainMonitorForm, DomainMonitorFormValues } from "@/components/AddDomainMonitorForm";
import { Service } from "./Dashboard";

// Import ServiceType from Dashboard or define it here
type ServiceType = "website" | "server" | "dns" | "database" | "api";

// Existing storage key to keep consistency
const SERVICES_STORAGE_KEY = "diekerit-monitor-services";

const AddService = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("website");

  // Function to generate a unique ID for new services
  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  // Helper for timestamp generation
  const getCurrentTimestamp = () => {
    return new Date().toISOString().replace('T', ' ').substring(0, 19);
  };

  // Handle adding a new server
  const handleAddServer = async (data: ServerFormValues) => {
    console.log("Adding server:", data);
    
    // Generate service data with proper typing
    const newService: Service = {
      id: generateId(),
      name: data.name,
      url: `${data.hostname}:${data.port || 80}`,
      status: "online", // Default status
      responseTime: Math.floor(Math.random() * 150 + 50), // Random response time
      lastChecked: getCurrentTimestamp(),
      uptime: 99.99, // Default high uptime
      type: data.type === "web" ? "website" : (data.type as ServiceType)
    };
    
    // Get existing services from localStorage
    const savedServices = localStorage.getItem(SERVICES_STORAGE_KEY);
    const services = savedServices ? JSON.parse(savedServices) : [];
    
    // Add new service and save back to localStorage
    services.push(newService);
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
    
    // Redirect back to dashboard with success state
    navigate("/dashboard", { 
      state: { 
        newServiceAdded: true,
        serviceName: data.name
      }
    });
  };

  // Handle adding a new DNS server
  const handleAddDnsServer = async (data: DnsServerFormValues) => {
    console.log("Adding DNS server:", data);
    
    // Generate service data
    const newService: Service = {
      id: generateId(),
      name: data.name,
      url: data.hostname,
      status: "online", // Default status
      responseTime: Math.floor(Math.random() * 30 + 20), // Random response time (typically DNS is fast)
      lastChecked: getCurrentTimestamp(),
      uptime: 99.999, // Default high uptime for DNS
      type: "dns"
    };
    
    // Get existing services from localStorage
    const savedServices = localStorage.getItem(SERVICES_STORAGE_KEY);
    const services = savedServices ? JSON.parse(savedServices) : [];
    
    // Add new service and save back to localStorage
    services.push(newService);
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
    
    // Redirect back to dashboard with success state
    navigate("/dashboard", { 
      state: { 
        newServiceAdded: true,
        serviceName: data.name
      }
    });
  };

  // Handle adding a new domain monitor
  const handleAddDomain = async (data: DomainMonitorFormValues) => {
    console.log("Adding domain monitoring:", data);
    
    // Generate service data
    const newService: Service = {
      id: generateId(),
      name: data.domain,
      url: `https://${data.domain}`,
      status: "online", // Default status
      responseTime: Math.floor(Math.random() * 200 + 100), // Random response time
      lastChecked: getCurrentTimestamp(),
      uptime: 99.95, // Default high uptime
      type: "website"
    };
    
    // Get existing services from localStorage
    const savedServices = localStorage.getItem(SERVICES_STORAGE_KEY);
    const services = savedServices ? JSON.parse(savedServices) : [];
    
    // Add new service and save back to localStorage
    services.push(newService);
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
    
    // Redirect back to dashboard with success state
    navigate("/dashboard", { 
      state: { 
        newServiceAdded: true,
        serviceName: data.domain
      }
    });
  };

  return (
    <DiekerLayout>
      <div className="flex flex-col gap-6 fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold diekerit-gradient-text mb-1">Neuen Dienst hinzufügen</h1>
            <p className="text-muted-foreground text-sm">
              Füge einen neuen Dienst zum Monitoring hinzu
            </p>
          </div>
          
          <Button variant="outline" onClick={() => navigate(-1)} className="glass border-white/10 hover:bg-white/10">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zum Dashboard
          </Button>
        </div>
        
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-xl">Wähle den Dienst-Typ</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 glass border-white/10 mb-6">
                <TabsTrigger value="website">Website</TabsTrigger>
                <TabsTrigger value="server">Server</TabsTrigger>
                <TabsTrigger value="dns">DNS</TabsTrigger>
              </TabsList>
              
              <TabsContent value="website" className="space-y-4 mt-2">
                <AddDomainMonitorForm
                  open={true}
                  onOpenChange={() => {}}
                  onAddDomain={handleAddDomain}
                />
              </TabsContent>
              
              <TabsContent value="server" className="space-y-4 mt-2">
                <AddServerForm 
                  open={true}
                  onOpenChange={() => {}}
                  onAddServer={handleAddServer}
                />
              </TabsContent>
              
              <TabsContent value="dns" className="space-y-4 mt-2">
                <AddDnsServerForm
                  open={true}
                  onOpenChange={() => {}}
                  onAddDnsServer={handleAddDnsServer}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DiekerLayout>
  );
};

export default AddService;
