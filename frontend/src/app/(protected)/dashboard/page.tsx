'use client';

import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <div className="p-6 bg-white rounded-lg shadow-md dark:bg-secondary">
        <h2 className="mb-4 text-2xl font-semibold">User Information</h2>
        {user && (
          <div className="space-y-2">
            <p>
              <span className="font-semibold">User ID:</span> {user.userId}
            </p>
            <p>
              <span className="font-semibold">Role:</span> <span className="px-2 py-1 text-sm font-medium text-white bg-indigo-500 rounded-full">{user.role}</span>
            </p>
            <p>
              <span className="font-semibold">Country:</span> {user.country}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
