'use client';

import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { GET_RESTAURANT_MENU_QUERY } from '@/graphql/queries';
import { useCart } from '@/context/CartContext';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

export default function MenuPage() {
  const params = useParams();
  const id = params.id;
  const restaurantId = parseInt(id as string, 10);
  const { addToCart } = useCart();

  const { data, loading, error } = useQuery(GET_RESTAURANT_MENU_QUERY, {
    variables: { restaurantId },
    skip: !id,
  });

  if (loading) return <div className="container p-4 mx-auto">Loading...</div>;
  if (error) return <div className="container p-4 mx-auto">Error: {error.message}</div>;
  if (!data) return <div className="container p-4 mx-auto">No menu found for this restaurant.</div>;

  const { restaurant } = data;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">{restaurant.name} - Menu</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {restaurant.menu.map((item: MenuItem) => (
          <div key={item.id} className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-secondary">
            <div className="p-6">
              <h2 className="mb-2 text-2xl font-semibold">{item.name}</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-400">{item.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold">${item.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide text-primary-foreground transition-colors duration-200 rounded-md bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
