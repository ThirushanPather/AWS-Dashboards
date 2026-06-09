// Risk monitoring dashboard showing NPL rates, exposure, and write-off trend analysis.
import React from 'react';
import data from '../../data/risk.json';
import KPICard from '../../components/KPICard';
import LineChartCard from '../../components/LineChartCard';
import BarChartCard from '../../components/BarChartCard';
import PieChartCard from '../../components/PieChartCard';
import Card from '../../components/Card';

const zarFmt = (n) => 'R ' + n.toLocaleString('en-ZA');
const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default function RiskDashboard() {
  const { summary, accounts_by_risk_band, monthly_writeoffs, pd_by_segment } = data;

  const totalAccounts = accounts_by_risk_band.reduce((s, b) => s + b.accounts, 0);
  const highCritPct = ((summary.high_risk_accounts + summary.critical_accounts) / totalAccounts * 100).toFixed(1);
  const maxWO = monthly_writeoffs.reduce((a, b) => b.amount > a.amount ? b : a);
  const minWO = monthly_writeoffs.reduce((a, b) => b.amount < a.amount ? b : a);

  return (
    <div className="p-6 text-white">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Risk Monitoring Dashboard</h1>
        <span className="text-gray-300 text-sm">{today}</span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* KPIs */}
        <KPICard title="NPL Rate" value={summary.npl_rate + '%'} subtitle="Non-performing loans" />
        <KPICard title="Total Exposure" value={zarFmt(summary.total_exposure)} subtitle="ZAR" />
        <KPICard title="High Risk Accounts" value={summary.high_risk_accounts} subtitle="Active monitoring" />
        <KPICard title="Critical Accounts" value={summary.critical_accounts} subtitle="Immediate action" />

        {/* Charts */}
        <div className="md:col-span-2">
          <BarChartCard
            title="Accounts by Risk Band"
            data={accounts_by_risk_band}
            xKey="band"
            yKey="accounts"
            color="#8B5CF6"
          />
        </div>
        <div className="md:col-span-2">
          <LineChartCard
            title="Monthly Write-offs (ZAR)"
            data={monthly_writeoffs}
            xKey="month"
            yKey="amount"
            color="#EF4444"
            formatValue={zarFmt}
          />
        </div>
        
        {/* Pie Chart and Summary */}
        <div>
          <PieChartCard
            title="PD by Segment (%)"
            data={pd_by_segment}
            nameKey="segment"
            valueKey="value"
          />
        </div>
        <div className="md:col-span-3">
          <Card className="p-6 h-full">
            <p className="text-sm font-semibold text-gray-200 mb-4">Risk Summary</p>
            <div className="space-y-3 text-sm">
              {[
                ['Total Accounts', totalAccounts.toLocaleString('en-ZA')],
                ['High + Critical %', highCritPct + '%'],
                [`Largest Write-off (${maxWO.month})`, zarFmt(maxWO.amount)],
                [`Lowest Write-off (${minWO.month})`, zarFmt(minWO.amount)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium text-gray-100">{value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
