
import React from "react";
import { AuthForm } from "@/components/AuthForm";
import { Activity, LineChart, BarChart, Server } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Animierter Gradient-Hintergrund */}
      <div className="gradient-background"></div>
      
      <div className="flex-1 flex flex-col md:flex-row z-10">
        {/* Linke Seite - Hero Bereich */}
        <div className="glass md:w-1/2 flex items-center justify-center p-8 md:p-12 border border-white/10">
          <div className="max-w-md mx-auto text-center md:text-left fade-in">
            <div className="flex items-center justify-center md:justify-start mb-6">
              <Activity className="h-10 w-10 text-primary mr-2 animate-pulse-slow" />
              <h1 className="text-3xl font-bold diekerit-gradient-text">ServMonitor</h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Die modernste Lösung für Website- und Server-Monitoring
            </h2>
            <p className="text-muted-foreground mb-6">
              Überwache deine Websites, DNS-Einträge und Server in Echtzeit. Erhalte sofortige Benachrichtigungen bei Ausfällen und behalte die Uptime im Blick.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="glass p-4 rounded-lg border border-white/10 hover-scale">
                <LineChart className="h-10 w-10 mb-3 diekerit-gradient-text" />
                <h3 className="font-bold mb-1">Echtzeit-Monitoring</h3>
                <p className="text-sm text-muted-foreground">Sekundengenaue Überwachung aller deiner Dienste</p>
              </div>
              
              <div className="glass p-4 rounded-lg border border-white/10 hover-scale">
                <BarChart className="h-10 w-10 mb-3 diekerit-gradient-text" />
                <h3 className="font-bold mb-1">Ausführliche Statistiken</h3>
                <p className="text-sm text-muted-foreground">Detaillierte Uptime-Berichte und Leistungsdaten</p>
              </div>
              
              <div className="glass p-4 rounded-lg border border-white/10 hover-scale">
                <Activity className="h-10 w-10 mb-3 diekerit-gradient-text" />
                <h3 className="font-bold mb-1">Statusbenachrichtigungen</h3>
                <p className="text-sm text-muted-foreground">Sofortige Alerts bei Ausfällen per E-Mail und SMS</p>
              </div>
              
              <div className="glass p-4 rounded-lg border border-white/10 hover-scale">
                <Server className="h-10 w-10 mb-3 diekerit-gradient-text" />
                <h3 className="font-bold mb-1">Server Ressourcen</h3>
                <p className="text-sm text-muted-foreground">CPU, RAM und Festplatten-Monitoring ohne Aufwand</p>
              </div>
            </div>
            
            <Link to="/dashboard" className="hidden md:inline-block">
              <Button className="diekerit-gradient-bg hover:opacity-90 glow-button">
                Demo ansehen
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Rechte Seite - Anmeldeformular */}
        <div className="md:w-1/2 flex items-center justify-center p-8 glass border-l-0 border border-white/10">
          <div className="w-full max-w-md fade-in">
            <AuthForm />
            <p className="text-center text-sm text-muted-foreground mt-6">
              Durch die Anmeldung oder Registrierung stimmst du unseren{" "}
              <a href="#" className="underline text-primary hover:text-primary/80 transition-colors">
                Nutzungsbedingungen
              </a>{" "}
              und{" "}
              <a href="#" className="underline text-primary hover:text-primary/80 transition-colors">
                Datenschutzrichtlinien
              </a>{" "}
              zu.
            </p>
          </div>
        </div>
      </div>
      
      <footer className="glass border-t border-white/10 py-4 z-10">
        <div className="container mx-auto px-4 text-center text-xs">
          <span className="diekerit-gradient-text font-semibold">ServMonitor</span> &copy; {new Date().getFullYear()} - <span className="opacity-70">DiekerIT Monitoring-Lösung</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
