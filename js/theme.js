(function () {
  const storageKey = 'pulsetag_theme';
  const savedTheme = localStorage.getItem(storageKey);
  const theme = savedTheme === 'dark' ? 'dark' : 'light';

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  function updateToggle(button) {
    const isDark = document.documentElement.dataset.theme === 'dark';
    button.textContent = isDark ? 'Light mode' : 'Dark mode';
    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function setupThemeToggle() {
    document.querySelectorAll('.navbar').forEach((navbar) => {
      if (navbar.querySelector('.theme-toggle')) {
        return;
      }

      const button = document.createElement('button');
      button.className = 'theme-toggle';
      button.type = 'button';
      button.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = nextTheme;
        document.documentElement.style.colorScheme = nextTheme;
        localStorage.setItem(storageKey, nextTheme);
        updateToggle(button);
      });
      updateToggle(button);
      navbar.appendChild(button);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupThemeToggle);
  } else {
    setupThemeToggle();
  }
})();
