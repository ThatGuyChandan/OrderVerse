'use client';

import { useQuery } from '@apollo/client';
import { GET_RESTAURANTS_QUERY } from '@/graphql/queries';
import Link from 'next/link';

interface Restaurant {
  id: string;
  name: string;
  address: string;
}

export default function RestaurantsPage() {
  const { data, loading, error } = useQuery(GET_RESTAURANTS_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Restaurants</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.restaurants.map((restaurant: Restaurant) => (
          <div key={restaurant.id} className="p-4 bg-white rounded shadow-md">
            <h2 className="mb-2 text-xl font-bold">{restaurant.name}</h2>
            <p className="mb-4 text-gray-600">{restaurant.address}</p>
            <Link href={`/restaurant/${restaurant.id}/menu`} className="text-indigo-600 hover:underline">
              View Menu
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
