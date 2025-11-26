// Dark Mode functionality for index.html
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    initPaperGenerationButton();
});

// Dark Mode functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.textContent = '☀️';
            darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
        }
    }
    
    // Toggle dark mode
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            darkModeToggle.textContent = isDark ? '☀️' : '🌙';
            darkModeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        });
    }
}

// Paper Generation Button functionality
function initPaperGenerationButton() {
    const paperGenerationBtn = document.getElementById('paapergeneration');
    if (paperGenerationBtn) {
        paperGenerationBtn.addEventListener('click', function() {
            // Open paper.html file from papergenerator directory
            window.location.href = 'papergenerator/paper.html';
        });
    }
}

