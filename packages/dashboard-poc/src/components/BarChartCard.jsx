// Displays a categorical bar chart inside a glassmorphism card.
import React from 'react';
import {
  ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import Card from './Card';

export default function BarChartCard({ title, data, xKey, yKey, color, formatValue }) {
  const tooltipFormatter = formatValue ? (val) => [formatValue(val), ''] : undefined;

  return (
    <Card className="p-6">
      <p className="text-sm font-semibold text-gray-200 mb-4">{title}</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
          <XAxis dataKey={xKey} interval={0} tick={{ fontSize: 11, fill: '#A0AEC0' }} />
          <YAxis tick={{ fontSize: 11, fill: '#A0AEC0' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: '#fff',
            }}
            itemStyle={{ color: '#fff' }}
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
          />
          <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
