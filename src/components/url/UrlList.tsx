'use client';
import { useState, useEffect } from 'react';
import { urlService } from '@/lib/url';
import { analyticsService } from '@/lib/analytics';
import { UrlAnalytics } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { 
  Search, 
  Copy, 
  Check, 
  ExternalLink, 
  Trash2, 
  Loader2, 
  TrendingUp,
  Calendar,
  MousePointer
} from 'lucide-react';

interface UrlListProps {
  refreshTrigger: number;
}

export default function UrlList({ refreshTrigger }: UrlListProps) {
  const [urls, setUrls] = useState<UrlAnalytics[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchUrls();
  }, [refreshTrigger]);

  const fetchUrls = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await analyticsService.getUserUrlsWithAnalytics();
      setUrls(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch URLs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this URL?')) return;
    
    try {
      await urlService.deleteUrl(id);
      setUrls(urls.filter(url => url.id !== id));
    } catch (err: any) {
      setError('Failed to delete URL');
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getPerformanceColor = (performance: 'high' | 'medium' | 'low') => {
    switch (performance) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUrls = urls.filter(url =>
    url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search URLs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="text-sm text-gray-600">
          {filteredUrls.length} of {urls.length} URLs
        </div>
      </div>

      {/* URL List */}
      {filteredUrls.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-gray-500">
              {searchTerm ? 'No URLs match your search.' : 'No URLs created yet.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredUrls.map((url) => (
            <Card key={url.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* URL Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {url.shortUrl}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPerformanceColor(url.performance)}`}>
                          {url.performance} performance
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {url.originalUrl}
                      </p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <Button
                        onClick={() => copyToClipboard(urlService.getShortUrl(url.shortUrl), url.id)}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        {copiedId === url.id ? (
                          <>
                            <Check className="h-3 w-3" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </Button>
                      
                      <Button
                        onClick={() => window.open(url.originalUrl, '_blank')}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Visit</span>
                      </Button>
                      
                      <Button
                        onClick={() => handleDelete(url.id)}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>

                  {/* Analytics Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <MousePointer className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-xs text-gray-500">Clicks</p>
                        <p className="text-sm font-medium text-gray-900">{url.clickCount}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-xs text-gray-500">Performance</p>
                        <p className="text-sm font-medium text-gray-900 capitalize">{url.performance}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <div>
                        <p className="text-xs text-gray-500">Created</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(url.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MousePointer className="h-4 w-4 text-orange-500" />
                      <div>
                        <p className="text-xs text-gray-500">Last Click</p>
                        <p className="text-sm font-medium text-gray-900">
                          {url.lastClicked 
                            ? new Date(url.lastClicked).toLocaleDateString()
                            : 'Never'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
