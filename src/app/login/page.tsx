import type { Metadata, Viewport } from 'next';
import LoginForm from '@/components/auth/LoginForm';
import { Link } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sign In - Tiny URL',
  description: 'Sign in to your Tiny URL account to manage your short URLs',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Link className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back to Tiny URL
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
