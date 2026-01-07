'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

interface Restaurant {
  id: string;
  name: string;
  country: string;
}

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMenu, setLoadingMenu] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await api.get('/restaurants');
        setRestaurants(data);
      } catch (err) {
        setError('Failed to fetch restaurants');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const handleViewMenu = (restaurantId: string) => {
    setLoadingMenu(restaurantId);
    router.push(`/restaurant/${restaurantId}/menu`);
  };

  if (loading) return <div className="container text-center">Loading restaurants...</div>;
  if (error) return <div className="container text-center text-danger">Error: {error}</div>;

  return (
    <div className="container">
      <h1>Our Restaurants</h1>
      <div className="grid grid-cols-3">
        {restaurants.map((restaurant: Restaurant) => (
          <div key={restaurant.id} className="card">
            <div>
              <h2>{restaurant.name}</h2>
              <p>{restaurant.country}</p>
              <button
                onClick={() => handleViewMenu(restaurant.id)}
                className="btn btn-primary"
                disabled={loadingMenu === restaurant.id}
              >
                {loadingMenu === restaurant.id ? 'Loading...' : 'View Menu'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}