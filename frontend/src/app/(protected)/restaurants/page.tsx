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

  if (loading) return <div className="container p-4 mx-auto">Loading...</div>;
  if (error) return <div className="container p-4 mx-auto">Error: {error.message}</div>;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Restaurants</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.restaurants.map((restaurant: Restaurant) => (
          <div key={restaurant.id} className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-secondary">
            <div className="p-6">
              <h2 className="mb-2 text-2xl font-semibold">{restaurant.name}</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-400">{restaurant.address}</p>
              <Link href={`/restaurant/${restaurant.id}/menu`} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide text-primary-foreground transition-colors duration-200 rounded-md bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                View Menu
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
