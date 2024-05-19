import { useState, useEffect } from 'react';

export const useFetch = (pokeApi) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            // Check if data is cached
            const cachedData = localStorage.getItem(pokeApi);
            if (cachedData) {
                setData(JSON.parse(cachedData));
                setIsPending(false);
                return;
            }
            
            try {
                const response = await fetch(pokeApi);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                
                const jsonData = await response.json();
                
                // Cache the fetched data
                localStorage.setItem(pokeApi, JSON.stringify(jsonData));
                
                setData(jsonData);
                setIsPending(false);
            } catch (error) {
                setError(error);
                setIsPending(false);
            }
        };
        
        fetchData();
    }, [pokeApi]);

    return { data, isPending, error };
};
