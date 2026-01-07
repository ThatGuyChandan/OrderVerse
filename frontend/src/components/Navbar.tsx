'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Role } from '@/types/enums';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const linkStyles = (path: string) => {
    return `navbar-link ${pathname === path ? 'active' : ''}`;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="flex items-center">
          <Link href="/dashboard" className="navbar-brand">
            OrderVerse
          </Link>
        </div>
        <div className="navbar-links">
          <Link href="/restaurants" className={linkStyles('/restaurants')}>
            Restaurants
          </Link>
          <Link href="/orders" className={linkStyles('/orders')}>
            Orders
          </Link>
          <Link href="/cart" className={linkStyles('/cart')}>
            Cart
          </Link>
          {user?.role === Role.ADMIN && (
            <Link href="/payment-methods" className={linkStyles('/payment-methods')}>
              Payment Methods
            </Link>
          )}
          <button
            onClick={logout}
            className="btn btn-danger"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
