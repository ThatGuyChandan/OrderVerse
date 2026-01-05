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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Your Orders</h1>
      {data.orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <div className="space-y-4">
          {data.orders.map((order: Order) => (
            <div key={order.id} className="p-4 bg-white rounded shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">Order #{order.id}</h2>
                <div className="font-bold text-gray-800">${order.total.toFixed(2)}</div>
              </div>
              <p className="text-sm text-gray-600">
                {new Date(order.createdAt).toLocaleDateString()} -{' '}
                <span className="font-medium">{order.status}</span>
              </p>
              <div className="mt-4">
                <h3 className="mb-2 font-bold">Items:</h3>
                <ul className="space-y-1">
                  {order.orderItems.map((item) => (
                    <li key={item.id} className="flex justify-between">
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
