
import React from "react";
import { cn } from "@/lib/utils";

type StatusType = "online" | "offline" | "warning";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusConfig = {
    online: {
      color: "bg-status-online",
      label: "Online",
    },
    offline: {
      color: "bg-status-offline",
      label: "Offline",
    },
    warning: {
      color: "bg-status-warning",
      label: "Warnung",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
        config.color,
        className
      )}
    >
      <span className={cn("w-2 h-2 rounded-full", status === "online" ? "animate-pulse-slow" : "")}></span>
      {config.label}
    </span>
  );
};
