import { useTheme } from "@/context/theme-context";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-primary-dark transition-all hover-glow"
    >
      <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
      <div className="relative w-12 h-6 bg-neutral-900 rounded-full">
        <div 
          className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform duration-300 ${
            theme === "dark" ? "bg-accent-dark translate-x-0" : "bg-accent-light translate-x-6"
          }`}
        ></div>
      </div>
    </button>
  );
}
