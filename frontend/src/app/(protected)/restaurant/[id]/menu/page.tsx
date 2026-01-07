'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import api from '@/lib/api';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface Restaurant {
  id: string;
  name: string;
  menu: MenuItem[];
}

export default function MenuPage() {
  const params = useParams();
  const id = params.id;
  const restaurantId = parseInt(id as string, 10);
  const { addToCart, removeFromCart, getItemQuantity } = useCart();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMenu = async () => {
      try {
        const { data } = await api.get(`/menu`, { params: { restaurantId } });
        // The current API returns all menu items, not specific to a restaurant.
        // For now, we'll simulate filtering by restaurant if needed, or adjust backend.
        // Assuming the backend /menu endpoint now filters by restaurantId.
        setRestaurant({ id: restaurantId.toString(), name: `Restaurant ${restaurantId}`, menu: data });
      } catch (err) {
        setError('Failed to fetch menu');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [id, restaurantId]);


  if (loading) return <div className="container p-4 mx-auto text-center text-muted-foreground">Loading menu...</div>;
  if (error) return <div className="container p-4 mx-auto text-center text-destructive">Error: {error}</div>;
  if (!restaurant || restaurant.menu.length === 0) return <div className="container p-4 mx-auto text-center text-muted-foreground">No menu found for this restaurant.</div>;


  return (
    <div className="container mx-auto">
      <h1 className="mb-8 text-4xl font-extrabold text-foreground">{restaurant.name} - Menu</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {restaurant.menu.map((item: MenuItem) => {
          const quantity = getItemQuantity(item.id);
          return (
            <div key={item.id} className="relative overflow-hidden bg-card border border-border rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="p-6">
                <h2 className="mb-2 text-2xl font-bold text-foreground">{item.name}</h2>
                <p className="mb-4 text-muted-foreground text-sm">{item.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-extrabold text-primary">${item.price.toFixed(2)}</p>
                  {quantity === 0 ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="px-5 py-2 bg-primary text-primary-foreground rounded-lg shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-3 py-1 bg-destructive text-destructive-foreground rounded-lg shadow-md hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-destructive transition-all duration-300 transform hover:scale-105"
                      >
                        -
                      </button>
                      <span className="text-lg font-bold text-foreground">{quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="px-3 py-1 bg-primary text-primary-foreground rounded-lg shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-105"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}