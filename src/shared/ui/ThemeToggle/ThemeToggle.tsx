import { useTheme } from '@app/providers/ThemeProvider.tsx';
import './ThemeToggle.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
      <span className="theme-toggle__text">
        {theme === 'light' ? 'Dark' : 'Light'} Mode
      </span>
    </button>
  );
}
