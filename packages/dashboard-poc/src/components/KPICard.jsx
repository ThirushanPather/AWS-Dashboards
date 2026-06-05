// Displays a single KPI metric with a coloured top border accent.
import React from 'react';

function formatValue(value) {
  if (typeof value === 'number' && value > 1000) {
    return value.toLocaleString('en-ZA');
  }
  return value;
}

export default function KPICard({ title, value, subtitle, color }) {
  return (
    <div
      className="bg-white rounded-xl shadow-sm p-6"
      style={{ borderTop: `4px solid ${color}` }}
    >
      <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{formatValue(value)}</p>
      {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}
