'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { LOGIN_MUTATION } from '@/graphql/mutations';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [name, setName] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await loginMutation({ variables: { name } });
      if (data.login.access_token) {
        login(data.login.access_token);
        router.push('/dashboard'); // Redirect to dashboard page after login
      }
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-secondary">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">OrderVerse</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back! Please login to your account.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              Username
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-3 py-2 mt-1 bg-transparent border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide text-primary-foreground transition-colors duration-200 rounded-md bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="mt-2 text-sm text-destructive">{error.message}</p>}
        </form>
      </div>
    </div>
  );
}