import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const Header = ({ theme, setTheme }: HeaderProps) => {
  return (
    <header className="glassmorphism sticky top-0 z-50 px-4 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <i className="fa-solid fa-headphones text-primary-light text-2xl mr-2"></i>
        <h1 className="font-poppins font-bold text-2xl text-gradient-primary">Melodify</h1>
      </div>
      
      {/* Theme Toggle */}
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </header>
  );
};

export default Header;
