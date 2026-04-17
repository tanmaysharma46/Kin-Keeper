"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const colors = {
  Text: "#8B5CF6",
  Call: "#1F4D36",
  Video: "#34A853",
};

const InteractionChart = ({ interactions = [] }) => {
  const counts = {};

  interactions.forEach((interaction) => {
    const type = interaction.type?.trim();
    if (!type) return;

    counts[type] = (counts[type] || 0) + 1;
  });

  const chartData = Object.entries(counts).map(([name, value]) => ({
    name,
    value,
    color: colors[name] ?? "#64748B",
  }));

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-50 w-full max-w-4xl">
        <h3 className="text-emerald-900 font-semibold text-sm mb-4">By Interaction Type</h3>
        <div className="h-75 w-full flex items-center justify-center text-slate-500">
          No interactions yet. Start connecting with your friends!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-50 w-full max-w-4xl">
      <h3 className="text-emerald-900 font-semibold text-sm mb-4">By Interaction Type</h3>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
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
