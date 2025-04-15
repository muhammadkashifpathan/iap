import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const Layout = ({ children, theme, setTheme }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <Header theme={theme} setTheme={setTheme} />
      {children}
    </div>
  );
};

export default Layout;
