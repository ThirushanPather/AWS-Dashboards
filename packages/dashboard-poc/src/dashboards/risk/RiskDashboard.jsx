// Risk monitoring dashboard showing NPL rates, exposure, and write-off trend analysis.
import React from 'react';
import data from '../../data/risk.json';
import KPICard from '../../components/KPICard';
import LineChartCard from '../../components/LineChartCard';
import BarChartCard from '../../components/BarChartCard';
import PieChartCard from '../../components/PieChartCard';

const zarFmt = (n) => 'R ' + n.toLocaleString('en-ZA');
const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default function RiskDashboard() {
  const { summary, accounts_by_risk_band, monthly_writeoffs, pd_by_segment } = data;

  const totalAccounts = accounts_by_risk_band.reduce((s, b) => s + b.accounts, 0);
  const highCritPct = ((summary.high_risk_accounts + summary.critical_accounts) / totalAccounts * 100).toFixed(1);
  const maxWO = monthly_writeoffs.reduce((a, b) => b.amount > a.amount ? b : a);
  const minWO = monthly_writeoffs.reduce((a, b) => b.amount < a.amount ? b : a);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 px-8 py-4 flex justify-between items-center">
        <span className="text-white text-xl font-bold">Risk Monitoring Dashboard</span>
        <span className="text-gray-400 text-sm">{today}</span>
      </div>

      <div className="px-8 py-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-4">
          <KPICard title="NPL Rate" value={summary.npl_rate + '%'} subtitle="Non-performing loans" color="#EF4444" />
          <KPICard title="Total Exposure" value={zarFmt(summary.total_exposure)} subtitle="ZAR" color="#F59E0B" />
          <KPICard title="High Risk Accounts" value={summary.high_risk_accounts} subtitle="Active monitoring" color="#F59E0B" />
          <KPICard title="Critical Accounts" value={summary.critical_accounts} subtitle="Immediate action" color="#EF4444" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <BarChartCard
            title="Accounts by Risk Band"
            data={accounts_by_risk_band}
            xKey="band"
            yKey="accounts"
            color="#8B5CF6"
          />
          <LineChartCard
            title="Monthly Write-offs (ZAR)"
            data={monthly_writeoffs}
            xKey="month"
            yKey="amount"
            color="#EF4444"
            formatValue={zarFmt}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <PieChartCard
            title="PD by Segment (%)"
            data={pd_by_segment}
            nameKey="segment"
            valueKey="value"
          />
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm font-semibold text-gray-700 mb-4">Risk Summary</p>
            <div className="space-y-3 text-sm">
              {[
                ['Total Accounts', totalAccounts.toLocaleString('en-ZA')],
                ['High + Critical %', highCritPct + '%'],
                [`Largest Write-off (${maxWO.month})`, zarFmt(maxWO.amount)],
                [`Lowest Write-off (${minWO.month})`, zarFmt(minWO.amount)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
