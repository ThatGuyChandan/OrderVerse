'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Role } from '@/types/enums';

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
  createdAt: string;
  orderItems: OrderItem[];
  user: {
    name: string;
  };
}

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const calculateTotal = (orderItems: OrderItem[]) => {
    return orderItems.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'status-paid';
      case 'CREATED':
        return 'status-created';
      case 'CANCELLED':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await api.post(`/orders/${orderId}/cancel`);
      fetchOrders();
    } catch (err) {
      console.error('Failed to cancel order', err);
      alert('Failed to cancel order.');
    }
  };

  if (loading) return <div className="container text-center">Loading your orders...</div>;
  if (error) return <div className="container text-center text-danger">Error: {error}</div>;

  return (
    <div className="container">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <div className="card text-center">
          <p>You have no orders yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order: Order) => (
            <div key={order.id} className="card">
              <div className="flex justify-between">
                <div>
                  <h2>Order #{order.id}</h2>
                  <p>Placed by: {order.user.name}</p>
                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-center">
                  <p className="font-extrabold text-2xl">${calculateTotal(order.orderItems).toFixed(2)}</p>
                  <span className={`status-badge ${getStatusClasses(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className='mt-8'>
                <h3>Items:</h3>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.id} className="flex justify-between" style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
                      <span>
                        {item.menuItem.name} x {item.quantity}
                      </span>
                      <span className="font-bold">${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {(user?.role === Role.ADMIN || user?.role === Role.MANAGER) && order.status !== 'CANCELLED' && (
                <div className="mt-8">
                  <button onClick={() => handleCancelOrder(order.id)} className="btn btn-danger">
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}