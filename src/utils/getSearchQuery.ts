async function getSearchQuery (): Promise<any[]> {
    try {
        const response = await fetch('http://localhost:5003/api/search', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch search data');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        throw err; 
    }
};

export default getSearchQuery