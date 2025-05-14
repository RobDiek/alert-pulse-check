
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [interval, setInterval] = useState("5");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Hier würde die Supabase-Integration stattfinden
    
    // Simuliere die Erstellung
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Dienst hinzugefügt",
        description: `${name} wird jetzt alle ${interval} Minuten überwacht.`,
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 flex-1">
        <h1 className="text-2xl font-bold mb-6">Neuen Dienst hinzufügen</h1>
        
        <Card className="max-w-2xl mx-auto border-muted">
          <CardHeader>
            <CardTitle>Dienst-Details</CardTitle>
            <CardDescription>
              Gib die Informationen des zu überwachenden Dienstes ein.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name des Dienstes</Label>
                <Input
                  id="name"
                  placeholder="z.B. Hauptwebsite, API-Server"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Ein beschreibender Name für diesen Dienst
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="url">URL oder Host</Label>
                <Input
                  id="url"
                  placeholder="https://beispiel.de oder server.beispiel.de"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Die URL oder Hostadresse, die überwacht werden soll
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interval">Prüfintervall</Label>
                <Select
                  value={interval}
                  onValueChange={setInterval}
                >
                  <SelectTrigger id="interval">
                    <SelectValue placeholder="Wähle ein Intervall" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Minute</SelectItem>
                    <SelectItem value="5">5 Minuten</SelectItem>
                    <SelectItem value="10">10 Minuten</SelectItem>
                    <SelectItem value="30">30 Minuten</SelectItem>
                    <SelectItem value="60">60 Minuten</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Wie oft der Dienst überprüft werden soll
                </p>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Wird hinzugefügt..." : "Dienst hinzufügen"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      
      <footer className="bg-card border-t border-muted py-4">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          ServMonitor &copy; 2023 - Website & Serverüberwachung
        </div>
      </footer>
    </div>
  );
};

export default AddService;
