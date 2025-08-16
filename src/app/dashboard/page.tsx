"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Link, TrendingUp, Users, BarChart3 } from "lucide-react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's an overview of your short URLs and performance.
        </p>
      </div>

      {/* Quick Stats */}
      <DashboardStats />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => router.push("/dashboard/create")}
            >
              <Link className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium">Create New URL</p>
                <p className="text-sm text-gray-600">Shorten a long URL</p>
              </div>
            </div>
            <div
              className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => router.push("/dashboard/analytics")}
            >
              <BarChart3 className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="font-medium">View Analytics</p>
                <p className="text-sm text-gray-600">
                  Check your URL performance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest URL creations and clicks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No activity yet</p>
              <p className="text-sm">
                Create your first short URL to see activity here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
