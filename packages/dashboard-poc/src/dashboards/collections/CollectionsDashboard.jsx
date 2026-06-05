// Collections team KPI dashboard showing arrears, collection rates, and agent performance.
import React from 'react';
import data from '../../data/collections.json';
import KPICard from '../../components/KPICard';
import LineChartCard from '../../components/LineChartCard';
import BarChartCard from '../../components/BarChartCard';

const zarFmt = (n) => 'R ' + n.toLocaleString('en-ZA');
const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const barColor = (r) => r >= 70 ? 'bg-green-500' : r >= 40 ? 'bg-amber-500' : 'bg-red-500';

export default function CollectionsDashboard() {
  const { summary, daily_collected, collection_by_bucket, top_agents } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 px-8 py-4 flex justify-between items-center">
        <span className="text-white text-xl font-bold">Collections Dashboard</span>
        <span className="text-gray-400 text-sm">{today}</span>
      </div>

      <div className="px-8 py-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-4">
          <KPICard title="Total Outstanding" value={zarFmt(summary.total_outstanding_balance)} subtitle="ZAR" color="#EF4444" />
          <KPICard title="Accounts in Arrears" value={summary.accounts_in_arrears} subtitle="Active accounts" color="#F59E0B" />
          <KPICard title="Collection Rate" value={summary.collection_rate + '%'} subtitle="Month to date" color="#10B981" />
          <KPICard title="Roll Rate" value={summary.roll_rate + '%'} subtitle="30 to 60 day" color="#3B82F6" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <LineChartCard
            title="Daily Collections (ZAR)"
            data={daily_collected}
            xKey="date"
            yKey="amount"
            color="#10B981"
            formatValue={zarFmt}
          />
          <BarChartCard
            title="Collection Rate by Bucket (%)"
            data={collection_by_bucket}
            xKey="bucket"
            yKey="rate"
            color="#3B82F6"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm font-semibold text-gray-700 mb-4">Top Performing Agents</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="pb-2 font-medium">Agent</th>
                  <th className="pb-2 font-medium text-right">Amount Collected</th>
                </tr>
              </thead>
              <tbody>
                {top_agents.map((agent, i) => (
                  <tr key={agent.name} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-2 px-1">{agent.name}</td>
                    <td className="py-2 px-1 text-right">{zarFmt(agent.amount_collected)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm font-semibold text-gray-700 mb-4">Bucket Summary</p>
            <div className="space-y-4">
              {collection_by_bucket.map((b) => (
                <div key={b.bucket}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{b.bucket}</span>
                    <span className="text-gray-700 font-medium">{b.rate}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`h-2 rounded-full ${barColor(b.rate)}`} style={{ width: `${b.rate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
