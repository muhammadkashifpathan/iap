import Sidebar from "@/components/sidebar/sidebar";
import PlaylistCard from "@/components/playlists/playlist-card";
import { playlists, recentlyPlayedPlaylists } from "@/data/playlists";
import { useTheme } from "@/context/theme-context";
import { Link } from "wouter";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 md:p-6 glassmorphism bg-secondary z-10">
          <div className="flex md:hidden items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary mr-2">
              <i className="ri-music-fill text-sm"></i>
            </div>
            <h1 className="font-bold text-xl">Rhythm</h1>
          </div>
          
          <div className="hidden md:flex items-center">
            <button className="p-2 rounded-full hover:bg-background transition-all mr-2 hover-glow">
              <i className="ri-arrow-left-s-line text-xl"></i>
            </button>
            <button className="p-2 rounded-full hover:bg-background transition-all hover-glow">
              <i className="ri-arrow-right-s-line text-xl"></i>
            </button>
          </div>
          
          <div className="flex items-center">
            <Link href="/search">
              <a className="md:hidden p-2 rounded-full hover:bg-background transition-all mr-2 hover-glow">
                <i className="ri-search-line text-xl"></i>
              </a>
            </Link>
            <a href="#" className="hidden md:block px-4 py-2 rounded-full bg-background hover:opacity-90 transition-all mr-4 hover-glow">
              <span className="font-medium">Upgrade</span>
            </a>
            <button className="p-2 rounded-full bg-background hover:opacity-90 transition-all hover-glow">
              <i className="ri-user-3-line text-xl"></i>
            </button>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <h2 className="font-bold text-2xl md:text-3xl mb-6">Featured Playlists</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {playlists.map(playlist => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
          
          <h2 className="font-bold text-2xl md:text-3xl mt-10 mb-6">Recently Played</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {recentlyPlayedPlaylists.map(playlist => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-secondary glassmorphism flex items-center justify-around py-3 z-20 border-t border-neutral-900">
        <Link href="/">
          <a className="flex flex-col items-center p-2">
            <i className="ri-home-4-line text-xl"></i>
            <span className="text-xs mt-1">Home</span>
          </a>
        </Link>
        <Link href="/search">
          <a className="flex flex-col items-center p-2">
            <i className="ri-search-line text-xl"></i>
            <span className="text-xs mt-1">Search</span>
          </a>
        </Link>
        <Link href="/playlist/1">
          <a className="flex flex-col items-center p-2">
            <i className="ri-play-list-line text-xl text-primary"></i>
            <span className="text-xs mt-1 text-primary">Playlists</span>
          </a>
        </Link>
        <Link href="/profile">
          <a className="flex flex-col items-center p-2">
            <i className="ri-user-3-line text-xl"></i>
            <span className="text-xs mt-1">Profile</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
