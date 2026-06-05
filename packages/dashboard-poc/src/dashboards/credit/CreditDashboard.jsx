// Credit originations dashboard showing application volumes, approvals, and decline analysis.
import React from 'react';
import data from '../../data/credit.json';
import KPICard from '../../components/KPICard';
import LineChartCard from '../../components/LineChartCard';
import BarChartCard from '../../components/BarChartCard';
import PieChartCard from '../../components/PieChartCard';

const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default function CreditDashboard() {
  const { summary, daily_approvals, approvals_by_product, decline_reasons } = data;

  const totalApps = daily_approvals.reduce((s, d) => s + d.count, 0);
  const totalApprovals = Math.round(totalApps * (summary.approval_rate / 100));
  const totalDeclines = totalApps - totalApprovals;
  const first15Avg = daily_approvals.slice(0, 15).reduce((s, d) => s + d.count, 0) / 15;
  const last15Avg = daily_approvals.slice(15).reduce((s, d) => s + d.count, 0) / 15;
  const trending = last15Avg >= first15Avg;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 px-8 py-4 flex justify-between items-center">
        <span className="text-white text-xl font-bold">Credit Originations Dashboard</span>
        <span className="text-gray-400 text-sm">{today}</span>
      </div>

      <div className="px-8 py-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-4">
          <KPICard title="Applications Today" value={summary.applications_today} subtitle="All channels" color="#3B82F6" />
          <KPICard title="Approval Rate" value={summary.approval_rate + '%'} subtitle="Month to date" color="#10B981" />
          <KPICard title="Avg Credit Score" value={summary.average_credit_score} subtitle="Approved applicants" color="#F59E0B" />
          <KPICard title="Avg Loan Amount" value={'R ' + summary.average_loan_amount.toLocaleString('en-ZA')} subtitle="ZAR" color="#8B5CF6" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <LineChartCard
            title="Daily Approvals (30 days)"
            data={daily_approvals}
            xKey="date"
            yKey="count"
            color="#3B82F6"
          />
          <PieChartCard
            title="Approvals by Product"
            data={approvals_by_product}
            nameKey="product"
            valueKey="value"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <BarChartCard
            title="Decline Reasons (%)"
            data={decline_reasons}
            xKey="reason"
            yKey="value"
            color="#EF4444"
          />
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm font-semibold text-gray-700 mb-4">Quick Stats</p>
            <div className="space-y-3 text-sm">
              {[
                ['Total Applications This Month', totalApps.toLocaleString('en-ZA')],
                ['Total Approvals This Month', totalApprovals.toLocaleString('en-ZA')],
                ['Total Declines', totalDeclines.toLocaleString('en-ZA')],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-gray-800">{value}</span>
                </div>
              ))}
              <div className="flex justify-between">
                <span className="text-gray-500">Approval Trend</span>
                <span className={`font-medium ${trending ? 'text-green-600' : 'text-red-500'}`}>
                  {trending ? '↑ Improving' : '↓ Declining'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
