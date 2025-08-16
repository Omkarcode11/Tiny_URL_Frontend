import CreateUrlForm from '@/components/url/CreateUrlForm';

export default function CreateUrlPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create Short URL</h1>
        <p className="text-gray-600">Enter a long URL to create a short, shareable link.</p>
      </div>
      <CreateUrlForm />
    </div>
  );
}
