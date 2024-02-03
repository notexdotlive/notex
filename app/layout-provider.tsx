'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { preventComponents } from '@/config';

import Header from '@/components/header';
import Footer from '@/components/footer';

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      {!preventComponents.some((prevent) => {
        const routes = prevent.routes;
        return routes.some((route) => pathname.includes(route));
      }) ? (
        <>
          <Header />
          {children}
          <Footer />
        </>
      ) : (
        children
      )}
    </>
  );
};
