// Displays a time-series line chart inside a white card.
import React from 'react';
import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';

export default function LineChartCard({ title, data, xKey, yKey, color, formatValue }) {
  const tooltipFormatter = formatValue ? (val) => [formatValue(val), ''] : undefined;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <p className="text-sm font-semibold text-gray-700 mb-4">{title}</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey={xKey} interval={1} tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip formatter={tooltipFormatter} />
          <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
