'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Role } from '@/types/enums';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-xl font-bold text-gray-800 dark:text-white">
              OrderVerse
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/restaurants" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
              Restaurants
            </Link>
            <Link href="/orders" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
              Orders
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
              Cart
            </Link>
            {user?.role === Role.ADMIN && (
              <Link href="/payment-methods" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
                Payment Methods
              </Link>
            )}
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
