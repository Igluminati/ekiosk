'use client'
import { useRouter as useNextRouter } from 'next/navigation';
import { createContext, useContext } from 'react';

const RouterContext = createContext();

export const useRouter = () => useContext(RouterContext);

export const RouterProvider = ({ children }) => {
  const router = useNextRouter();

  return (
    <RouterContext.Provider value={router}>
      {children}
    </RouterContext.Provider>
  );
};
