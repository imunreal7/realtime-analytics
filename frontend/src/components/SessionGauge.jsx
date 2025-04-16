import React from 'react';
import {
  RadialBarChart, RadialBar, ResponsiveContainer,
} from 'recharts';

function SessionGauge({ value, maxMinutes = 1000 }) {
  // Validate the passed value to ensure it's a number.
  const isValid = typeof value === 'number' && !isNaN(value);

  // Convert the raw value into a percentage (0 - 100).
  // We use Math.min to restrict the value to at most 100%.
  const normalizedValue = isValid
    ? Math.min(100, Math.round((value / maxMinutes) * 100))
    : 0;

  // Choose a color based on performance range.
  const fillColor = normalizedValue > 80
    ? '#82ca9d'
    : normalizedValue > 30
      ? '#facc15'
      : '#f87171';

  // Data for the chart.
  const data = [{
    name: 'Avg Session (min)',
    value: normalizedValue,
    fill: fillColor,
  }];

  return (
    <div className="p-4 bg-white rounded shadow w-full max-w-md mx-auto">
      <h2 className="text-sm uppercase text-gray-500 mb-2 text-center">
        Avg. Session Duration
      </h2>
      {isValid ? (
        <figure aria-label={`Average session duration is ${value} minutes, which is ${normalizedValue}% of the target`}>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={data}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar
                minAngle={1}
                background
                clockWise
                dataKey="value"
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <figcaption className="text-center mt-2 text-xl font-bold text-gray-800">
            {value} min
          </figcaption>
        </figure>
      ) : (
        <p className="text-center text-gray-400">Loading...</p>
      )}
    </div>
  );
}
export default SessionGauge;
