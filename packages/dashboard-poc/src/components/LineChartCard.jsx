// Displays a time-series line chart inside a glassmorphism card.
import React from 'react';
import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import Card from './Card';

export default function LineChartCard({ title, data, xKey, yKey, color, formatValue }) {
  const tooltipFormatter = formatValue ? (val) => [formatValue(val), ''] : undefined;

  return (
    <Card className="p-6">
      <p className="text-sm font-semibold text-gray-200 mb-4">{title}</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
          <XAxis dataKey={xKey} interval={1} tick={{ fontSize: 11, fill: '#A0AEC0' }} />
          <YAxis tick={{ fontSize: 11, fill: '#A0AEC0' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: '#fff',
            }}
            itemStyle={{ color: '#fff' }}
            cursor={{ stroke: 'rgba(255, 255, 255, 0.1)', strokeWidth: 2 }}
          />
          <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
