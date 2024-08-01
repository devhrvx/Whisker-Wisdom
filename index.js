const loading = [
    "*Head empty...*",
    "*Maximizing my only brain cell*",
    "Brain loading...",
    "catto use -> 🧠",
    "wait, me thinking..."
];


document.querySelector('.generate-button').addEventListener('click', async () => {
    const factElement = document.querySelector('.fact-text');
    factElement.textContent = loading[Math.floor(Math.random() * loading.length)];

    try {
        const response = await fetch("/api/get-cat-fact");
        const data = await response.json();
        factElement.classList.remove('generated');
        void factElement.offsetWidth;
        factElement.textContent = data.fact;
        factElement.classList.add('generated');
    } catch (error) {
        factElement.classList.remove('generated');
        void factElement.offsetWidth;
        factElement.textContent = "Failed to fetch a cat fact. :(";
        factElement.classList.add('generated');
        console.error(error);
    }
});
