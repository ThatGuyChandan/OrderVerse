'use client';

import { useQuery } from '@apollo/client';
import { GET_ORDERS_QUERY } from '@/graphql/queries';

interface OrderItem {
  id: string;
  quantity: number;
  menuItem: {
    name: string;
    price: number;
  };
}

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  orderItems: OrderItem[];
}

export default function OrdersPage() {
  const { data, loading, error } = useQuery(GET_ORDERS_QUERY);

  if (loading) return <div className="container p-4 mx-auto">Loading...</div>;
  if (error) return <div className="container p-4 mx-auto">Error: {error.message}</div>;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Your Orders</h1>
      {data.orders.length === 0 ? (
        <div className="p-6 text-center bg-white rounded-lg shadow-md dark:bg-secondary">
          <p className="text-lg">You have no orders.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.orders.map((order: Order) => (
            <div key={order.id} className="p-6 bg-white rounded-lg shadow-md dark:bg-secondary">
              <div className="flex flex-col justify-between mb-4 sm:flex-row">
                <div>
                  <h2 className="text-2xl font-semibold">Order #{order.id}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                  <span className={`px-2 py-1 mt-1 text-sm rounded ${order.status === 'PAID' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Items:</h3>
                <ul className="space-y-2">
                  {order.orderItems.map((item) => (
                    <li key={item.id} className="flex justify-between pb-2 border-b border-border">
                      <span>
                        {item.menuItem.name} x {item.quantity}
                      </span>
                      <span>${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
