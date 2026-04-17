"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Text", value: 30, color: "#8B5CF6" }, 
  { name: "Call", value: 45, color: "#1F4D36" },
  { name: "Video", value: 25, color: "#34A853" }, 
];

const InteractionChart = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-50 w-full max-w-4xl">
      <h3 className="text-emerald-900 font-semibold text-sm mb-4">By Interaction Type</h3>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom" 
              align="center"
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span className="text-slate-500 text-xs ml-1">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InteractionChart;