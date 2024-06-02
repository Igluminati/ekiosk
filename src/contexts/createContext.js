import { createContext, useContext, useState } from 'react';

/**
 * Context for managing menu items and total price.
 * @type {import('react').Context}
 */
const MenuContext = createContext();

/**
 * Custom hook to access the menu context.
 * @returns {import('react').ContextType<typeof MenuContext>} The menu context
 */
export const useMenuContext = () => useContext(MenuContext);

/**
 * Provider component for the menu context.
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component for the menu context
 */
export const MenuProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <MenuContext.Provider value={{ selectedItems, setSelectedItems, totalPrice, setTotalPrice }}>
      {children}
    </MenuContext.Provider>
  );
};
