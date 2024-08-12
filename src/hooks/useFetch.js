import { useEffect, useState } from "react";

export function useFetch(fetchFnc, page, initialValue) {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [fetchData, setFetchData] = useState(initialValue);

    useEffect(() => {
        async function fetchDataFromAPI() {
            setIsFetching(true);
            try {
                const data = await fetchFnc(page);
                setFetchData(data);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch data' });
            } finally {
                setIsFetching(false);
            }
        }

        fetchDataFromAPI();
    }, [fetchFnc, page]);

    return {
        isFetching,
        error,
        fetchData,
        currentPage: page,
        totalPages: fetchData.totalPages || 1,
    };
}
