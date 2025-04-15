interface ThemeToggleProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const ThemeToggle = ({ theme, setTheme }: ThemeToggleProps) => {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:glow-accent transition-all duration-300"
    >
      {theme === "light" ? (
        <i className="fa-solid fa-sun text-yellow-500"></i>
      ) : (
        <i className="fa-solid fa-moon text-accent"></i>
      )}
    </button>
  );
};

export default ThemeToggle;
