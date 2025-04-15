import { useState } from "react";
import Layout from "@/components/Layout";
import PlaylistCard from "@/components/PlaylistCard";
import TrackItem from "@/components/TrackItem";
import MusicPlayer from "@/components/MusicPlayer";
import { playlists } from "@/data/playlists";
import { useAudio } from "@/lib/AudioContext";

interface HomeProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const Home = ({ theme, setTheme }: HomeProps) => {
  const [activePlaylistId, setActivePlaylistId] = useState<number | null>(1);
  const { 
    currentTrack, 
    isPlaying,
    setIsPlaying, 
    nextTrack, 
    previousTrack
  } = useAudio();

  const activePlaylist = activePlaylistId 
    ? playlists.find(playlist => playlist.id === activePlaylistId) 
    : null;

  const handleBackToPlaylists = () => {
    setActivePlaylistId(null);
  };

  return (
    <Layout theme={theme} setTheme={setTheme}>
      <main className="flex-grow px-4 pb-32 md:pb-6 pt-6">
        {/* Playlists Section - shown when no playlist is selected */}
        {!activePlaylistId && (
          <section>
            <h2 className="font-poppins font-semibold text-xl mb-5 flex items-center">
              <i className="fa-solid fa-list-music mr-2 text-primary-light"></i>
              Playlists
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {playlists.map((playlist) => (
                <PlaylistCard 
                  key={playlist.id} 
                  playlist={playlist} 
                  onClick={() => setActivePlaylistId(playlist.id)} 
                />
              ))}
            </div>
          </section>
        )}
        
        {/* Track List Section - shown when a playlist is selected */}
        {activePlaylistId && activePlaylist && (
          <section id="trackListSection">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-poppins font-semibold text-xl flex items-center">
                <i className="fa-solid fa-music mr-2 text-primary-light"></i>
                <span id="playlistTitle">{activePlaylist.title}</span>
              </h2>
              <button 
                onClick={handleBackToPlaylists}
                className="text-sm px-3 py-1.5 rounded-full glassmorphism hover:glow-primary transition-all duration-300"
              >
                <i className="fa-solid fa-arrow-left mr-1"></i> Back to Playlists
              </button>
            </div>
            
            <div className="space-y-3">
              {activePlaylist.tracks.map((track) => (
                <TrackItem
                  key={track.id}
                  track={track}
                  isActive={currentTrack?.id === track.id && currentTrack?.playlistId === activePlaylistId}
                  isPlaying={isPlaying && currentTrack?.id === track.id && currentTrack?.playlistId === activePlaylistId}
                  playlistId={activePlaylistId}
                />
              ))}
            </div>
          </section>
        )}
      </main>
      
      {/* Music Player */}
      <MusicPlayer 
        isPlaying={isPlaying}
        togglePlayPause={() => setIsPlaying(!isPlaying)}
        onNext={nextTrack}
        onPrevious={previousTrack}
      />
    </Layout>
  );
};

export default Home;
