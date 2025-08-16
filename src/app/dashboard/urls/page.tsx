import UrlList from '@/components/url/UrlList';

export default function UrlsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My URLs</h1>
        <p className="text-gray-600">Manage and track your created short URLs.</p>
      </div>
      <UrlList refreshTrigger={0} />
    </div>
  );
}
