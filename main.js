const numbersContainer = document.getElementById('numbers');
const generateButton = document.getElementById('generate');
const themeToggle = document.getElementById('theme-toggle');

// Theme logic
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
});

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '🌙' : '🌞';
}

// Lotto logic
generateButton.addEventListener('click', () => {
    numbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    for (const number of [...numbers].sort((a, b) => a - b)) {
        const circle = document.createElement('div');
        circle.classList.add('number');
        circle.textContent = number;

        let color;
        if (number <= 10) {
            color = '#fbc400'; // Yellow
        } else if (number <= 20) {
            color = '#69c8f2'; // Blue
        } else if (number <= 30) {
            color = '#ff7272'; // Red
        } else if (number <= 40) {
            color = '#aaa'; // Gray
        } else {
            color = '#b0d840'; // Green
        }
        circle.style.backgroundColor = color;

        numbersContainer.appendChild(circle);
    }
});
