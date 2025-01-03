async function postSearchQuery(searchInput: string): Promise<any> {
    try {
        const response = await fetch('http://localhost:5003/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchQuery: searchInput }),
        });

        if (!response.ok) {
           console.log("Search Query has already been saved")
        }
        const data = await response.json();
        return data; 
    } catch (err) {
        throw err;
    }
}

export default postSearchQuery