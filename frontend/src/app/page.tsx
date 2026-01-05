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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="mb-4 text-2xl font-bold">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
        </form>
      </div>
    </div>
  );
}