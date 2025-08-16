import MetricsDashboard from '@/components/metrics/MetricsDashboard';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Track the performance of your short URLs with detailed metrics.</p>
      </div>
      <MetricsDashboard />
    </div>
  );
}
