const loading = [
    "*Head empty...*",
    "*Maximizing my only brain cell*",
    "Brain loading...",
    "catto use -> 🧠",
    "wait, me thinking..."
];

const meows = [
    "meow1.mp3",
    "meow2.mp3",
    "meow1.mp3",
    "meow4.mp3",
    "meow5.mp3",
    "meow6.mp3"
]

const genButton = document.querySelector('.generate-button');
genButton.addEventListener('click', async () => {
    const mainBox = document.querySelector('.main-box');
    const catBox = document.querySelector('.cat-box');
    const factElement = document.querySelector('.fact-text');
    factElement.textContent = loading[Math.floor(Math.random() * loading.length)];
    const meow = new Audio(meows[Math.floor(Math.random() * meows.length)]);

    try {
        const response = await fetch("/api/get-cat-fact");
        const data = await response.json();
        factElement.classList.remove('generated');
        mainBox.classList.remove('generated');
        catBox.classList.remove('yapping');
        void factElement.offsetWidth;
        factElement.textContent = data.fact;
        factElement.classList.add('generated');
        mainBox.classList.add('generated');
        catBox.classList.add('yapping');
        setTimeout(()=>{
            catBox.classList.remove('yapping');
        }, 2090);
        meow.play();
        meow.addEventListener('ended', function() {
            meow.remove();
        });
        genButton.textContent = "I want another...";

    } catch (error) {
        factElement.classList.remove('generated');
        mainBox.classList.remove('generated');
        catBox.classList.remove('yapping');
        void factElement.offsetWidth;
        factElement.textContent = "Failed to fetch a cat fact. Nyaw...😿";
        factElement.classList.add('generated');
        mainBox.classList.add('generated');
        catBox.classList.add('yapping');
        setTimeout(()=>{
            catBox.classList.remove('yapping');
        }, 2090);
        console.error(error);
        meow.play();
        meow.addEventListener('ended', function() {
            meow.remove();
        });
        genButton.textContent = "I want another...";
    }
});
