'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Role } from '@/types/enums';
import api from '@/lib/api';

interface PaymentMethod {
  id: number;
  type: string;
  enabled: boolean;
}

export default function PaymentMethodsPage() {
  const { user } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPaymentMethods = async () => {
    try {
      const { data } = await api.get('/payment-methods');
      setPaymentMethods(data);
    } catch (err) {
      setError('Failed to fetch payment methods');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === Role.ADMIN) {
      fetchPaymentMethods();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleToggleStatus = async (method: PaymentMethod) => {
    try {
      await api.patch('/payment-methods', {
        id: method.id,
        enabled: !method.enabled,
      });
      fetchPaymentMethods(); // Re-fetch to update the list
    } catch (err) {
      console.error('Failed to update payment method status', err);
      alert('Failed to update payment method status.');
    }
  };

  if (user?.role !== Role.ADMIN) {
    return (
      <div className="container">
        <div className="card text-center">
          <h1>Unauthorized Access</h1>
          <p>You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  if (loading) return <div className="container text-center">Loading payment methods...</div>;
  if (error) return <div className="container text-center text-danger">Error: {error}</div>;

  return (
    <div className="container">
      <h1>Payment Methods</h1>
      <div className="card">
        {paymentMethods.length === 0 ? (
          <div className="text-center">No payment methods found.</div>
        ) : (
          <div className="space-y-6">
            {paymentMethods.map((method: PaymentMethod) => (
              <div key={method.id} className="flex items-center justify-between" style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                <div>
                  <h2>{method.type}</h2>
                </div>
                <div className="flex items-center" style={{ gap: '1rem' }}>
                  <span className={`status-badge ${method.enabled ? 'status-paid' : 'status-cancelled'}`}>
                    {method.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <button
                    onClick={() => handleToggleStatus(method)}
                    className={`btn ${
                      method.enabled
                        ? 'btn-danger'
                        : 'btn-success'
                    }`}
                  >
                    {method.enabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
