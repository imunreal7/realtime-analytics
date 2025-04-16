// src/components/SessionGauge.jsx
import React from 'react';
import {
  RadialBarChart, RadialBar, Legend, ResponsiveContainer
} from 'recharts';

export function SessionGauge({ value }) {
  // Recharts RadialBarChart expects an array
  const data = [{ name: 'Avg Session (min)', value, fill: '#82ca9d' }];
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-sm uppercase text-gray-500 mb-2">Avg. Session Duration</h2>
      <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="value"
          />
          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={{ right: 0, top: 20 }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <p className="text-center mt-2 text-xl font-bold">{value} min</p>
    </div>
  );
}
