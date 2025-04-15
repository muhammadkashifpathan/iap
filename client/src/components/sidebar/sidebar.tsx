import { Link, useLocation } from "wouter";
import ThemeToggle from "@/components/ui/theme-toggle";

interface NavItem {
  name: string;
  path: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: "Home", path: "/", icon: "ri-home-4-line" },
  { name: "Playlists", path: "/playlist/1", icon: "ri-play-list-line" },
  { name: "Search", path: "/search", icon: "ri-search-line" },
  { name: "Favorites", path: "/favorites", icon: "ri-heart-line" }
];

const userPlaylists = [
  { name: "Summer Vibes", path: "/playlist/1" },
  { name: "Lo-Fi Beats", path: "/playlist/2" },
  { name: "Workout Mix", path: "/playlist/3" },
  { name: "Road Trip", path: "/playlist/4" }
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="hidden md:flex flex-col w-64 bg-secondary glassmorphism p-6 overflow-y-auto">
      <div className="flex items-center mb-8">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary mr-3">
          <i className="ri-music-fill text-lg"></i>
        </div>
        <h1 className="font-bold text-2xl">Rhythm</h1>
      </div>
      
      <nav>
        <ul className="space-y-4">
          {navItems.map((item) => {
            const isActive = 
              (item.path === "/" && location === "/") || 
              (item.path !== "/" && location.includes(item.path));
            
            return (
              <li key={item.name}>
                <Link href={item.path}>
                  <a className={`flex items-center space-x-3 p-2 rounded-lg transition-all hover-glow ${
                    isActive ? "bg-background text-primary" : "hover:bg-background"
                  }`}>
                    <i className={`${item.icon} text-lg ${isActive ? "text-primary" : ""}`}></i>
                    <span className={isActive ? "text-primary" : ""}>{item.name}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="mt-8">
        <h3 className="font-medium text-muted-foreground mb-4">Your Playlists</h3>
        <ul className="space-y-3">
          {userPlaylists.map((playlist) => (
            <li key={playlist.name}>
              <Link href={playlist.path}>
                <a className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background transition-all hover-glow">
                  <span>{playlist.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-auto pt-6">
        <ThemeToggle />
      </div>
    </div>
  );
}
