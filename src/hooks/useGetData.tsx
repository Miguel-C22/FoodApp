import React, { useState } from 'react';

type useGetDataProps = {
    searchInput?: string;
};

function useGetData({ searchInput }: useGetDataProps) {
    const [foodData, setFoodData] = useState<any[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoader] = useState<boolean>(false);
    const apiKey = process.env.REACT_APP_API_KEY;

    const onSubmit = () => {
        setError(false);
        setLoader(true);

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
    return { foodData, error, loading, onSubmit };
}

export default useGetData;