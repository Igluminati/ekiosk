import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch orders from the API.
 *
 * @returns {Array} An array containing the fetched orders.
 */
export default function useFetchOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            try {
                console.log('Fetching orders...'); // Debugging line
                const response = await fetch('/api/orders');
                console.log('Response status:', response.status); // Debugging line
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                console.log('Fetched orders data:', data); // Debugging line
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }

        fetchOrders();
    }, []);

    return orders;
}