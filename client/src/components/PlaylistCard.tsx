import { Playlist } from "@/data/playlists";

interface PlaylistCardProps {
  playlist: Playlist;
  onClick: () => void;
}

const PlaylistCard = ({ playlist, onClick }: PlaylistCardProps) => {
  const hoverClass = 
    playlist.id === 1 ? "hover:glow-primary" :
    playlist.id === 2 ? "hover:glow-secondary" : "hover:glow-accent";

  return (
    <div 
      className={`playlist-card glassmorphism rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 ${hoverClass} transition-all duration-300`}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={playlist.coverImage} 
          alt={`${playlist.title} playlist cover`} 
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-poppins font-bold text-lg text-white drop-shadow-lg">{playlist.title}</h3>
          <p className="text-sm text-gray-200">{playlist.tracks.length} tracks • {playlist.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
