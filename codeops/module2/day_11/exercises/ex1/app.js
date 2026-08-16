
// 1. Add a language or theme toggle to an earlier project and make it remember the choice with 
// localStorage (save on change, restore on load).
const themeToggleBtn = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

const languageSelect = document.getElementById('language-select');
const greetingText = document.getElementById('greeting-text');

const translations = {
    'English': 'Hello World!',
    'Amharic': 'ሰላም ልዑል!'
};

const savedLanguage = localStorage.getItem('language');
if (savedLanguage && translations[savedLanguage]) {
    languageSelect.value = savedLanguage;
    greetingText.textContent = translations[savedLanguage];
}

languageSelect.addEventListener('change', (e) => {
    const selectedLanguage = e.target.value;
    localStorage.setItem('language', selectedLanguage);
    greetingText.textContent = translations[selectedLanguage];
});
