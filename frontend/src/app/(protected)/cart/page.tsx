'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Role } from '@/types/enums';

export default function CartPage() {
  const { user } = useAuth();
  const { cartItems, totalPrice, clearCart, removeFromCart } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const orderItemsPayload = cartItems.map(item => ({
        menuItemId: parseInt(item.id),
        quantity: item.quantity,
      }));

      await api.post('/orders', {
        orderItems: orderItemsPayload,
      });
      clearCart();
      router.push('/orders'); // Redirect to orders page after successful checkout
    } catch (err) {
      console.error('Checkout failed', err);
      alert('Checkout failed. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="card text-center">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="card">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between" style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                <div>
                  <h2>{item.name}</h2>
                  <p>
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <div className='flex items-center' style={{ gap: '1rem' }}>
                  <p className="font-bold text-2xl">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-8">
            <p className="font-bold text-2xl">Total:</p>
            <p className="font-extrabold text-2xl">${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mt-8">
            <button onClick={clearCart} className="btn btn-secondary">
              Clear Cart
            </button>
            {(user?.role === Role.ADMIN || user?.role === Role.MANAGER) && (
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="btn btn-primary"
              >
                {checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}