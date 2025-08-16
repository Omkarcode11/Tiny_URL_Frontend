'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { urlService } from '@/lib/url';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Loader2, Link, Copy, Check } from 'lucide-react';

const createUrlSchema = z.object({
  originalUrl: z.string().url('Please enter a valid URL'),
  shortUrl: z.string().min(3, 'Short URL must be at least 3 characters').optional(),
});

type CreateUrlFormData = z.infer<typeof createUrlSchema>;

export default function CreateUrlForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUrlFormData>({
    resolver: zodResolver(createUrlSchema),
  });

  const onSubmit = async (data: CreateUrlFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      const response = await urlService.createUrl(data);
      const shortUrl = urlService.getShortUrl(response.shortUrl);
      
      setSuccess(`URL shortened successfully! Your short URL is: ${shortUrl}`);
      reset();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create short URL');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Create Short URL
          </CardTitle>
          <CardDescription className="text-gray-600">
            Shorten your long URLs into easy-to-share links
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="originalUrl" className="text-sm font-medium text-gray-700">
                Original URL *
              </label>
              <Input
                id="originalUrl"
                type="url"
                placeholder="https://example.com/very-long-url-that-needs-shortening"
                {...register('originalUrl')}
                className="w-full"
              />
              {errors.originalUrl && (
                <p className="text-sm text-red-600">{errors.originalUrl.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="shortUrl" className="text-sm font-medium text-gray-700">
                Custom Short URL (Optional)
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">yourdomain.com/</span>
                <Input
                  id="shortUrl"
                  type="text"
                  placeholder="my-custom-link"
                  {...register('shortUrl')}
                  className="flex-1"
                />
              </div>
              {errors.shortUrl && (
                <p className="text-sm text-red-600">{errors.shortUrl.message}</p>
              )}
              <p className="text-xs text-gray-500">
                Leave empty to generate a random short URL
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Link className="mr-2 h-4 w-4" />
                  Create Short URL
                </>
              )}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                <div className="flex items-center justify-between">
                  <span>{success}</span>
                  <Button
                    onClick={() => copyToClipboard(success.split('Your short URL is: ')[1])}
                    variant="outline"
                    size="sm"
                    className="ml-2"
                  >
                    {copied ? (
                      <>
                        <Check className="mr-1 h-3 w-3" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 h-3 w-3" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
