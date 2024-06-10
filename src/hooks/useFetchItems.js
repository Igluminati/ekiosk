import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch items from the catalogue API.
 *
 * @returns {Array} An array containing the fetched items.
 */
export default function useFetchItems() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/catalogue');
        const data = await response.json();
        console.log("Items set");
        setItems(data);

        const uniqueCategories = ['All', ...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);

      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return { items, categories };
}