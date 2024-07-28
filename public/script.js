document.getElementById('generateFact').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/catfact');
        if (!response.ok) {
            throw new Error(`An error occurred: ${response.status}`);
        }
        const fact = await response.json();
        document.getElementById('catFact').innerText = fact;
    } catch (error) {
        console.error('Error fetching cat fact:', error);
        document.getElementById('catFact').innerText = 'Failed to fetch cat fact.';
    }
});
