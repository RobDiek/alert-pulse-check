
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Copy, Check } from "lucide-react";

interface AgentConfigGeneratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AgentConfigGenerator({ open, onOpenChange }: AgentConfigGeneratorProps) {
  const [apiToken, setApiToken] = useState("");
  const [copied, setCopied] = useState<"linux" | "windows" | null>(null);
  const [generated, setGenerated] = useState(false);

  const generateApiToken = () => {
    // Im echten Szenario würde hier ein Token vom Server generiert
    const token = `srv_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiToken(token);
    setGenerated(true);
    
    toast({
      title: "API-Token generiert",
      description: "Dein Token wurde erfolgreich generiert. Verwende ihn für die Konfiguration des Monitoring-Agents.",
    });
  };

  const copyToClipboard = (text: string, type: "linux" | "windows") => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    
    setTimeout(() => setCopied(null), 2000);
    
    toast({
      title: "In Zwischenablage kopiert",
      description: "Der Befehl wurde in die Zwischenablage kopiert.",
    });
  };

  // Befehle mit Token
  const linuxCommand = `curl -sSL https://servmonitor.diekerit.de/install.sh | sudo bash -s -- --token=${apiToken || "API_TOKEN_HERE"}`;
  const windowsCommand = `Invoke-WebRequest -Uri "https://servmonitor.diekerit.de/install.ps1" -OutFile ".\\install.ps1"; .\\install.ps1 -ApiToken "${apiToken || "API_TOKEN_HERE"}"`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-white/10 sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Push-Monitor einrichten</DialogTitle>
          <DialogDescription>
            Konfiguriere den Server-Monitoring-Agent auf deinem Server, um detaillierte Metriken zu sammeln.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm">
              Der Monitoring-Agent ist ein leichtgewichtiger Dienst, der auf deinem Server läuft und regelmäßig Metriken sammelt. 
              Er verwendet minimale Ressourcen und überträgt die gesammelten Daten sicher an unser Dashboard.
            </p>
            
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium">API-Token</h3>
              
              {!generated && (
                <Button 
                  onClick={generateApiToken}
                  className="diekerit-gradient-bg hover:opacity-90"
                >
                  API-Token generieren
                </Button>
              )}
            </div>
            
            {generated && (
              <div className="mb-4">
                <Input 
                  value={apiToken} 
                  readOnly 
                  className="font-mono text-sm glass border-white/10" 
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Bewahre diesen Token sicher auf. Er wird für die Authentifizierung des Agents benötigt.
                </p>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <h3 className="text-md font-medium">Installation</h3>
            
            <div className="glass border-white/10 rounded-md p-3">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-mono text-muted-foreground">Linux/macOS Installation:</p>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 px-2"
                  onClick={() => copyToClipboard(linuxCommand, "linux")}
                >
                  {copied === "linux" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <code className="text-xs bg-black/20 p-2 rounded block w-full font-mono overflow-auto">
                {linuxCommand}
              </code>
            </div>
            
            <div className="glass border-white/10 rounded-md p-3">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-mono text-muted-foreground">Windows PowerShell:</p>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 px-2"
                  onClick={() => copyToClipboard(windowsCommand, "windows")}
                >
                  {copied === "windows" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <code className="text-xs bg-black/20 p-2 rounded block w-full font-mono overflow-auto">
                {windowsCommand}
              </code>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Nach der Installation wird der Agent automatisch gestartet und beginnt mit der Erfassung von Metriken. 
              Die ersten Daten sollten innerhalb von 1-2 Minuten im Dashboard erscheinen.
            </p>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              className="glass border-white/10 hover:bg-white/10"
              onClick={() => window.open("https://docs.diekerit.de/monitoring-agent", "_blank")}
            >
              Dokumentation
            </Button>
            <Button 
              className="diekerit-gradient-bg hover:opacity-90" 
              onClick={() => onOpenChange(false)}
            >
              Schließen
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
