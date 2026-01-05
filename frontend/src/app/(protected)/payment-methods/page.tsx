'use client';

import { useQuery } from '@apollo/client';
import { GET_PAYMENT_METHODS_QUERY } from '@/graphql/queries';
import { useAuth } from '@/context/AuthContext';
import { Role } from '@/types/enums';

interface PaymentMethod {
  id: string;
  name: string;
  enabled: boolean;
}

export default function PaymentMethodsPage() {
  const { user } = useAuth();
  const { data, loading, error } = useQuery(GET_PAYMENT_METHODS_QUERY, {
    skip: user?.role !== Role.ADMIN,
  });

  if (user?.role !== Role.ADMIN) {
    return (
      <div className="container p-4 mx-auto">
        <div className="p-6 text-center bg-white rounded-lg shadow-md dark:bg-secondary">
          <h1 className="mb-4 text-2xl font-bold text-destructive">Unauthorized</h1>
          <p>You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  if (loading) return <div className="container p-4 mx-auto">Loading...</div>;
  if (error) return <div className="container p-4 mx-auto">Error: {error.message}</div>;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Payment Methods</h1>
      <div className="p-6 bg-white rounded-lg shadow-md dark:bg-secondary">
        <div className="space-y-4">
          {data.paymentMethods.map((method: PaymentMethod) => (
            <div key={method.id} className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <h2 className="text-xl font-semibold">{method.name}</h2>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${method.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {method.enabled ? 'Enabled' : 'Disabled'}
                </span>
                <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide text-secondary-foreground transition-colors duration-200 rounded-md bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  {method.enabled ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
