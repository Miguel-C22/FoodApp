import React, { useEffect, useState } from 'react';
import postSearchQuery from '../utils/postSearchQuery';
import getSearchQuery from '../utils/getSearchQuery';

function useGetData() {
    const [foodData, setFoodData] = useState<any[]>([]);
    const [queryData, setQueryData] = useState<any[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoader] = useState<boolean>(false);
    const apiKey = process.env.REACT_APP_API_KEY;

    const fetchSearchQuery = () => {
        getSearchQuery()
        .then((data) => {
            setQueryData([...data])
        })
        .catch((err) => {
            console.error('Error fetching data:', err);
        });
    }
    
    useEffect(() => {
        fetchSearchQuery()
    }, [])

    const onSubmit = (searchInput: string) => {
        setError(false);
        setLoader(true);

        postSearchQuery(searchInput)
        fetchSearchQuery()

        fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&apiKey=${apiKey}&addRecipeNutrition=true`)
            .then((response) => response.json())
            .then((data) => {
                if (data.results.length === 0) {
                    setError(true); 
                } else {
                    setFoodData(data.results || []); 
                }
            })
            .catch(() => {
                setError(true); 
            })
            .finally(() => {
                setLoader(false);
            });

    };
    return {queryData, foodData, error, loading, onSubmit };
}

export default useGetData;