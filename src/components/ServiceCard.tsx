
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";

interface ServiceCardProps {
  name: string;
  url: string;
  status: "online" | "offline" | "warning";
  responseTime: number;
  lastChecked: string;
  uptime: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  url,
  status,
  responseTime,
  lastChecked,
  uptime,
}) => {
  return (
    <Card className="overflow-hidden border-muted">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-md font-semibold">{name}</CardTitle>
        <StatusBadge status={status} />
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-xs text-muted-foreground truncate">{url}</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs text-muted-foreground">Antwortzeit</p>
            <p className="text-xl font-semibold">
              {responseTime} <span className="text-sm text-muted-foreground">ms</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Uptime</p>
            <p className="text-xl font-semibold">
              {uptime}
              <span className="text-sm text-muted-foreground">%</span>
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t border-muted pt-2">
        Letzter Check: {lastChecked}
      </CardFooter>
    </Card>
  );
};
