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
        <h1 className="mb-4 text-2xl font-bold">Unauthorized</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Payment Methods</h1>
      <div className="space-y-4">
        {data.paymentMethods.map((method: PaymentMethod) => (
          <div key={method.id} className="flex items-center justify-between p-4 bg-white rounded shadow-md">
            <div>
              <h2 className="text-xl font-bold">{method.name}</h2>
            </div>
            <div className={`px-2 py-1 text-sm rounded ${method.enabled ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
              {method.enabled ? 'Enabled' : 'Disabled'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
