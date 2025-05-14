
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface HistoryChartProps {
  serviceId: string;
  serviceName: string;
  data: {
    timestamp: string;
    responseTime: number;
    status: string;
  }[];
}

export const HistoryChart: React.FC<HistoryChartProps> = ({ serviceId, serviceName, data }) => {
  return (
    <Card className="border-muted">
      <CardHeader>
        <CardTitle>{serviceName} - Antwortzeit (ms)</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis 
              dataKey="timestamp" 
              stroke="#888" 
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleTimeString()} 
            />
            <YAxis stroke="#888" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(224, 71%, 4%)", 
                border: "1px solid hsl(240, 3.7%, 15.9%)",
                borderRadius: "0.5rem" 
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="responseTime"
              stroke="#3B82F6"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
