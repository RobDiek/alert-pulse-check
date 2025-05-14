
import React from "react";
import { AuthForm } from "@/components/AuthForm";
import { Activity } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Linke Seite - Hero Bereich */}
        <div className="bg-secondary md:w-1/2 flex items-center justify-center p-8 md:p-12">
          <div className="max-w-md mx-auto text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-6">
              <Activity className="h-10 w-10 text-primary mr-2" />
              <h1 className="text-3xl font-bold">ServMonitor</h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Die einfachste Lösung für Website- und Server-Monitoring
            </h2>
            <p className="text-muted-foreground mb-6">
              Überwache deine Websites und Server in Echtzeit. Erhalte sofortige Benachrichtigungen bei Ausfällen und behalte die Uptime im Blick.
            </p>
            <ul className="text-left space-y-2 mb-6">
              <li className="flex items-start">
                <span className="bg-primary rounded-full p-1 mr-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                24/7 Überwachung aller deiner Dienste
              </li>
              <li className="flex items-start">
                <span className="bg-primary rounded-full p-1 mr-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Sofortige Benachrichtigungen bei Ausfällen
              </li>
              <li className="flex items-start">
                <span className="bg-primary rounded-full p-1 mr-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Detaillierte Uptime-Berichte und Statistiken
              </li>
              <li className="flex items-start">
                <span className="bg-primary rounded-full p-1 mr-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Einfache Einrichtung in weniger als 5 Minuten
              </li>
            </ul>
          </div>
        </div>
        
        {/* Rechte Seite - Anmeldeformular */}
        <div className="md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <AuthForm />
            <p className="text-center text-sm text-muted-foreground mt-6">
              Durch die Anmeldung oder Registrierung stimmst du unseren{" "}
              <a href="#" className="underline text-primary">
                Nutzungsbedingungen
              </a>{" "}
              und{" "}
              <a href="#" className="underline text-primary">
                Datenschutzrichtlinien
              </a>{" "}
              zu.
            </p>
          </div>
        </div>
      </div>
      
      <footer className="bg-card border-t border-muted py-4">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          ServMonitor &copy; 2023 - Website & Serverüberwachung
        </div>
      </footer>
    </div>
  );
};

export default Index;
