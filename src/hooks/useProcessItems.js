import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Custom hook to process items and total price from URL search parameters.
 *
 * @returns {Array} An array containing the processed items.
 */
export default function useProcessItems() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [processedItems, setProcessedItems] = useState([]);

    useEffect(() => {
        const url = `${pathname}?${searchParams}`;
        console.log(url);

        const itemsString = searchParams.get('items');
        const totalPriceString = searchParams.get('totalPrice');

        if (itemsString && totalPriceString) {
            try {
                const selectedItems = JSON.parse(decodeURIComponent(itemsString));

                const processedItemsData = selectedItems.map((item) => ({
                    name: item.name,
                    quantity: item.quantity,
                    image: item.image,
                    price: item.price,
                }));

                setProcessedItems(processedItemsData);
                console.log('Processed Items:', processedItemsData);
            } catch (error) {
                console.error('Error parsing items:', error);
            }
        }
    }, [pathname, searchParams]);

    return processedItems;
}
