import type { Metadata } from 'next';
import DashboardNav from '@/components/dashboard/DashboardNav';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import AuthWrapper from '@/components/auth/AuthWrapper';

export const metadata: Metadata = {
  title: 'Dashboard - Tiny URL',
  description: 'Manage your short URLs and view analytics',
};

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gray-50">
        <DashboardNav />
        <div className="flex flex-col lg:flex-row">
          <DashboardSidebar />
          <main className="flex-1 p-4 lg:p-6 w-full">
            {children}
          </main>
        </div>
      </div>
    </AuthWrapper>
  );
}
