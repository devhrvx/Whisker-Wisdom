document.querySelector('.generate').addEventListener('click', async () => {
    const factElement = document.querySelector('.fact');
    factElement.textContent = "Loading...";

    try {
        const response = await fetch("/api/get-cat-fact");
        const data = await response.json();
        factElement.textContent = data.fact;
    } catch (error) {
        factElement.textContent = "Failed to fetch a cat fact.";
        console.error(error);
    }
});
