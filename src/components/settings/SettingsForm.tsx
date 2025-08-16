'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authService } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Loader2, User, Check, AlertCircle } from 'lucide-react';

const settingsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const currentUser = authService.getUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: currentUser?.name || '',
    },
  });

  const onSubmit = async (data: SettingsFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      // For now, we'll just update the local storage
      // In a real app, you'd make an API call to update the user's name
      const updatedUser = { ...currentUser, name: data.name };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setSuccess('Name updated successfully!');
      
      // Update the user in the auth service
      authService.updateUser(updatedUser);
      
      // Refresh the page to update the UI
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      setError('Failed to update name. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-900">
            <User className="h-5 w-5" />
            <span>Profile Settings</span>
          </CardTitle>
          <CardDescription className="text-gray-600">
            Update your personal information and account settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={currentUser?.email || ''}
                disabled
                className="bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500">
                Email address cannot be changed
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Display Name *
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your display name"
                {...register('name')}
                className="w-full"
              />
              {errors.name && (
                <p className="text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.name.message}</span>
                </p>
              )}
              <p className="text-xs text-gray-500">
                This name will be displayed in your dashboard and analytics
              </p>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isLoading || !isDirty}
                className="w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Update Profile
                  </>
                )}
              </Button>
            </div>
          </form>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                {success}
              </AlertDescription>
            </Alert>
          )}

          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Account Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">User ID:</span>
                <span className="text-sm font-mono text-gray-900">{currentUser?.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Member Since:</span>
                <span className="text-sm text-gray-900">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
