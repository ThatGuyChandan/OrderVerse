'use client';

import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { GET_RESTAURANT_MENU_QUERY } from '@/graphql/queries';

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

  const { data, loading, error } = useQuery(GET_RESTAURANT_MENU_QUERY, {
    variables: { restaurantId },
    skip: !id,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No menu found for this restaurant.</div>;

  const { restaurant } = data;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">{restaurant.name} - Menu</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {restaurant.menu.map((item: MenuItem) => (
          <div key={item.id} className="p-4 bg-white rounded shadow-md">
            <h2 className="mb-2 text-xl font-bold">{item.name}</h2>
            <p className="mb-2 text-gray-600">{item.description}</p>
            <p className="font-bold text-gray-800">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
