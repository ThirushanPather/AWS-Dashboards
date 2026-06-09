// Displays a single KPI metric with a modern, glassmorphism-inspired design.
import React from 'react';
import Card from './Card';

function formatValue(value) {
  if (typeof value === 'number' && value > 1000) {
    return value.toLocaleString('en-ZA');
  }
  return value;
}

export default function KPICard({ title, value, subtitle }) {
  return (
    <Card className="p-6">
      <p className="text-sm text-gray-300 uppercase tracking-wide mb-2">{title}</p>
      <p className="text-3xl font-bold text-white">{formatValue(value)}</p>
      {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
    </Card>
  );
}
