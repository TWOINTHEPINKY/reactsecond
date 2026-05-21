import ThemeToggle from './ThemeToggle';

export default function Header({ theme, setTheme }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <h1 className="header__title">🤑 Список покупок</h1>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </header>
  );
}