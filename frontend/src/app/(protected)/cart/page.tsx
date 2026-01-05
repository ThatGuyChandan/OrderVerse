'use client';

export default function CartPage() {
  // Dummy data for now
  const cartItems = [
    { id: '1', name: 'Pizza', price: 12.99, quantity: 2 },
    { id: '2', name: 'Coke', price: 1.99, quantity: 4 },
  ];

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 mb-2 bg-white rounded shadow-md">
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-600">
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <div className="font-bold text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <div className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
