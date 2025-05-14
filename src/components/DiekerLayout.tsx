
import React, { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Toaster } from "@/components/ui/toaster";

interface DiekerLayoutProps {
  children: ReactNode;
}

export const DiekerLayout: React.FC<DiekerLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Animierter Gradient-Hintergrund */}
      <div className="gradient-background"></div>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 flex-1 z-10 fade-in">
        {children}
      </main>
      
      <footer className="glass border-t border-white/10 py-4 z-10">
        <div className="container mx-auto px-4 text-center text-xs">
          <span className="diekerit-gradient-text font-semibold">ServMonitor</span> &copy; {new Date().getFullYear()} - <span className="opacity-70">DiekerIT Monitoring-Lösung</span>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};
