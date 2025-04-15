import { Track } from "@/data/playlists";
import AudioWaveform from "./AudioWaveform";
import { useAudio } from "@/lib/AudioContext";

interface TrackItemProps {
  track: Track;
  isActive: boolean;
  isPlaying: boolean;
  playlistId: number;
}

const TrackItem = ({ track, isActive, isPlaying, playlistId }: TrackItemProps) => {
  const { playTrack, pauseTrack } = useAudio();

  const handleClick = () => {
    if (isActive) {
      if (isPlaying) {
        pauseTrack();
      } else {
        playTrack(track, playlistId);
      }
    } else {
      playTrack(track, playlistId);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div 
      className="track-item glassmorphism rounded-lg p-3 flex items-center gap-4 group hover:glow-primary cursor-pointer transition-all duration-300"
      onClick={handleClick}
    >
      <div className="w-12 h-12 relative flex-shrink-0">
        {/* Play/Pause button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-md play-button group-hover:opacity-100 opacity-0 transition-opacity duration-300">
          {isActive && isPlaying ? (
            <AudioWaveform />
          ) : isActive && !isPlaying ? (
            <div className="pause-icon">
              <i className="fa-solid fa-pause text-white"></i>
            </div>
          ) : (
            <div className="play-icon">
              <i className="fa-solid fa-play text-white"></i>
            </div>
          )}
        </div>
        {/* Track Image */}
        <img 
          src={track.coverImage} 
          alt={`${track.title} cover`} 
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium font-poppins text-base">{track.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{track.artist}</p>
      </div>
      
      <div className="text-right flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
        <div>{formatTime(track.duration)}</div>
      </div>
    </div>
  );
};

export default TrackItem;
