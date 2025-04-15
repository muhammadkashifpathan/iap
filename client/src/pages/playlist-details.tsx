import { useEffect } from "react";
import { useParams, Link } from "wouter";
import Sidebar from "@/components/sidebar/sidebar";
import TrackItem from "@/components/playlists/track-item";
import { getPlaylistById } from "@/data/playlists";
import { useAudio } from "@/context/audio-context";
import { useTheme } from "@/context/theme-context";

export default function PlaylistDetails() {
  const { id } = useParams<{ id: string }>();
  const { theme, toggleTheme } = useTheme();
  const { setCurrentPlaylist } = useAudio();
  
  const playlistId = parseInt(id);
  const playlist = getPlaylistById(playlistId);
  
  // Set the current playlist when this page loads
  useEffect(() => {
    if (playlist) {
      setCurrentPlaylist(playlist);
    }
  }, [playlist, setCurrentPlaylist]);
  
  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Playlist not found</h2>
          <Link href="/">
            <a className="text-primary hover:underline">Return to Home</a>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen pb-24">
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
            <Link href="/">
              <a className="p-2 rounded-full hover:bg-background transition-all mr-2 hover-glow">
                <i className="ri-arrow-left-s-line text-xl"></i>
              </a>
            </Link>
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
          <div className="flex items-end mb-6 md:mb-10">
            <img 
              src={playlist.cover} 
              alt={playlist.title} 
              className="w-32 h-32 md:w-48 md:h-48 rounded-lg shadow-lg mr-4 md:mr-6 object-cover"
            />
            <div>
              <p className="text-muted-foreground text-sm md:text-base">PLAYLIST</p>
              <h2 className="font-bold text-3xl md:text-5xl mt-1 mb-1">{playlist.title}</h2>
              <p className="text-muted-foreground">{playlist.tracks.length} tracks</p>
            </div>
          </div>
          
          <div className="glassmorphism rounded-lg p-4 md:p-6">
            <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_auto_auto] items-center gap-4 font-medium text-muted-foreground mb-2 px-2">
              <div className="w-6 text-center">#</div>
              <div>TITLE</div>
              <div className="hidden md:block">DURATION</div>
              <div></div>
            </div>
            
            <div className="space-y-2">
              {playlist.tracks.map((track, index) => (
                <TrackItem 
                  key={track.id} 
                  track={track} 
                  index={index} 
                  playlistId={playlistId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 bg-secondary glassmorphism flex items-center justify-around py-3 z-20 border-t border-neutral-900">
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
