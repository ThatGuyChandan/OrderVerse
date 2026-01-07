'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="grid grid-cols-3">
        {/* User Information Card */}
        <div className="card">
          <h2>Welcome!</h2>
          {user && (
            <div className="space-y-6">
              <p>
                <span className="font-bold">Role:</span>{' '}
                <span className="status-badge status-created">
                  {user.role}
                </span>
              </p>
              <p>
                <span className="font-bold">Country:</span> {user.country}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
