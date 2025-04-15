import { useAudio } from "@/context/audio-context";
import { Track } from "@/data/playlists";
import Equalizer from "../player/equalizer";

interface TrackItemProps {
  track: Track;
  index: number;
  playlistId: number;
}

export default function TrackItem({ track, index, playlistId }: TrackItemProps) {
  const { 
    currentTrack, 
    isPlaying, 
    currentTrackIndex, 
    playTrack 
  } = useAudio();
  
  const isCurrentTrack = currentTrack?.id === track.id;
  const isCurrentAndPlaying = isCurrentTrack && isPlaying;
  
  const handlePlayTrack = () => {
    playTrack(index);
  };

  return (
    <div 
      className="track-item no-select flex items-center gap-4 p-3 rounded-lg hover:bg-background cursor-pointer transition-all hover-glow"
      onClick={handlePlayTrack}
    >
      <div className="w-6 text-center flex items-center justify-center">
        {isCurrentAndPlaying ? (
          <Equalizer isPlaying={true} />
        ) : (
          <span className="track-number">{index + 1}</span>
        )}
      </div>
      
      <div className="flex items-center flex-1 overflow-hidden">
        <img 
          src={track.cover} 
          alt={track.title} 
          className="w-10 h-10 rounded mr-3 object-cover" 
        />
        <div className="overflow-hidden">
          <div className={`font-medium truncate ${isCurrentTrack ? 'text-primary' : ''}`}>
            {track.title}
          </div>
          <div className="text-sm text-muted-foreground truncate">
            {track.artist}
          </div>
        </div>
      </div>
      
      <div className="hidden md:block text-muted-foreground text-sm">
        {track.duration}
      </div>
      
      <button className="track-play-button p-2 text-muted-foreground hover:text-foreground">
        <i className={`${isCurrentAndPlaying ? 'ri-pause-fill' : 'ri-play-fill'} text-lg`}></i>
      </button>
    </div>
  );
}
