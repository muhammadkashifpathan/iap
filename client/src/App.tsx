import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import { AudioProvider } from "./lib/AudioContext";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check user's preferred color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme("dark");
    }

    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Update document class when theme changes
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <AudioProvider>
      <div className="min-h-screen bg-lightBg dark:bg-darkBg text-gray-800 dark:text-white transition-all duration-300">
        <Switch>
          <Route path="/" component={() => <Home theme={theme} setTheme={setTheme} />} />
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </div>
    </AudioProvider>
  );
}

export default App;
