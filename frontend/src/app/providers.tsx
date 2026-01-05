'use client';

import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { apolloClient } from '@/lib/apollo';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
