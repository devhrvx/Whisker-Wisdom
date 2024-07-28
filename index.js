const loading = [
    "*Head empty...*",
    "*Maximizing my only brain cell*",
    "Brain loading...",
    "catto use -> 🧠",
    "wait, me thinking..."
];


document.querySelector('.generate').addEventListener('click', async () => {
    const factElement = document.querySelector('.fact');
    factElement.textContent = loading[Math.floor(Math.random() * loading.length)];

    try {
        const response = await fetch("/api/get-cat-fact");
        const data = await response.json();
        factElement.textContent = data.fact;
    } catch (error) {
        factElement.textContent = "Failed to fetch a cat fact. :(";
        console.error(error);
    }
});
