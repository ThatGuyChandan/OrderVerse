'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not authenticated, redirect to the login page.
    // The login page is now the root page ('/').
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // While checking for authentication or redirecting, you can show a loader
  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
