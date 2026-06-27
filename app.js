document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Theme Configuration Toggling Engine ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const systemRoot = document.documentElement;

    // Check system profile or local history to set standard baseline theme
    const cachedTheme = localStorage.getItem('theme') || 'dark';
    systemRoot.setAttribute('data-theme', cachedTheme);
    updateThemeButtonIcon(cachedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = systemRoot.getAttribute('data-theme');
        const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
        
        systemRoot.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
        updateThemeButtonIcon(targetTheme);
    });

    function updateThemeButtonIcon(theme) {
        themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    // --- 2. Automated Typewriting Effect Engine ---
    const textTarget = document.getElementById('typing-text');
    const rolesArray = [
        'Front-End Web Developer', 
        'React Developer', 
        'UI Enthusiast', 
        'Problem Solver', 
        'Future Full-Stack Developer'
    ];
    
    let activeStringIndex = 0;
    let characterIndex = 0;
    let isDeletingState = false;
    let baselineTypingSpeed = 100;

    function executeTypingEngineCycle() {
        const fullTextContent = rolesArray[activeStringIndex];

        if (isDeletingState) {
            textTarget.textContent = fullTextContent.substring(0, characterIndex - 1);
            characterIndex--;
            baselineTypingSpeed = 40; // Accelerate deletion cycles
        } else {
            textTarget.textContent = fullTextContent.substring(0, characterIndex + 1);
            characterIndex++;
            baselineTypingSpeed = 100; // Stabilize typing progression speed
        }

        // State change detection logic
        if (!isDeletingState && characterIndex === fullTextContent.length) {
            isDeletingState = true;
            baselineTypingSpeed = 2000; // Pause briefly at full text length
        } else if (isDeletingState && characterIndex === 0) {
            isDeletingState = false;
            activeStringIndex = (activeStringIndex + 1) % rolesArray.length;
            baselineTypingSpeed = 500; // Brief interval pause before starting new word
        }

        setTimeout(executeTypingEngineCycle, baselineTypingSpeed);
    }
    
    // Initialize typing cycle entry
    executeTypingEngineCycle();

    // --- 3. Progress Tracking & Top Scroll Navigation Engine ---
    const progressBar = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const windowScrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
        const totalPageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const computedProgressPercent = (windowScrollPosition / totalPageHeight) * 100;
        
        progressBar.style.width = `${computedProgressPercent}%`;

        // Toggle back-to-top button visibility
        if (windowScrollPosition > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});