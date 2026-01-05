'use client';

import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cartItems, totalPrice, clearCart, removeFromCart } = useCart();

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="p-6 text-center bg-white rounded-lg shadow-md dark:bg-secondary">
          <p className="text-lg">Your cart is empty.</p>
        </div>
      ) : (
        <div className="p-6 bg-white rounded-lg shadow-md dark:bg-secondary">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <div className='flex items-center'>
                  <p className="text-xl font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 hover:text-red-700">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-6">
            <p className="text-2xl font-bold">Total:</p>
            <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={clearCart} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-200 bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Clear Cart
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide text-primary-foreground transition-colors duration-200 rounded-md bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
