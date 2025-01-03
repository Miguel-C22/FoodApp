async function deleteSearchQuery(id: number): Promise<any> {
    try {
        const response = await fetch(`http://localhost:5003/api/search/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete search query with id: ${id}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        throw err;
    }
}

export default deleteSearchQuery