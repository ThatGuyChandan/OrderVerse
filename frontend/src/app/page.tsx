'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function LoginPage() {
  const [name, setName] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/login', { name });
      if (data.access_token) {
        login(data.access_token);
        router.push('/dashboard'); // Redirect to dashboard page after login
      }
    } catch (err) {
      setError('Login failed');
      console.error('Login failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="card login-card">
        <div className="text-center">
          <h1>OrderVerse</h1>
          <p>Welcome back! Please sign in to continue.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="form-label">
              Username
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          {error && (
            <p className="text-danger" style={{ marginTop: '1rem', textAlign: 'center' }}>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}