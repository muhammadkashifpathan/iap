import { useAudio } from "@/context/audio-context";
import { useState, useEffect } from "react";
import Equalizer from "./equalizer";

export default function AudioPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlayPause, 
    nextTrack, 
    previousTrack,
    duration,
    currentTime,
    seek,
    volume,
    setVolume,
    toggleMute,
    isMuted
  } = useAudio();

  const [seekValue, setSeekValue] = useState(0);
  
  // Update seek slider value when currentTime changes
  useEffect(() => {
    if (!duration) return;
    const percentage = (currentTime / duration) * 100;
    setSeekValue(percentage);
  }, [currentTime, duration]);

  // Format time to mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle seek change
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSeekValue(value);
  };

  // Handle seek end (when user releases slider)
  const handleSeekEnd = () => {
    const seekTime = (seekValue / 100) * duration;
    seek(seekTime);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
  };

  // Determine volume icon based on volume level
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return "ri-volume-mute-line";
    } else if (volume < 50) {
      return "ri-volume-down-line";
    } else {
      return "ri-volume-up-line";
    }
  };

  if (!currentTrack) return null;

  return (
    <div className="music-player glassmorphism p-4 md:p-6 border-t border-neutral-900">
      <div className="flex flex-col md:flex-row items-center">
        {/* Currently playing info */}
        <div className="flex items-center w-full md:w-1/3 mb-4 md:mb-0">
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title} 
            className={`w-14 h-14 rounded-md mr-4 object-cover ${isPlaying ? 'animate-rotate-disc' : ''}`}
          />
          <div className="mr-4 overflow-hidden">
            <h4 className="font-medium truncate">{currentTrack.title}</h4>
            <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
          </div>
          <button className="ml-auto md:ml-0 p-2 rounded-full hover:bg-background transition-all hover-glow">
            <i className="ri-heart-line text-lg"></i>
          </button>
        </div>
        
        {/* Player controls */}
        <div className="flex flex-col items-center w-full md:w-1/3">
          <div className="flex items-center space-x-4 mb-3">
            <button className="p-2 rounded-full hover:bg-background transition-all player-controls hover-glow">
              <i className="ri-shuffle-line text-lg"></i>
            </button>
            <button 
              onClick={previousTrack}
              className="p-2 rounded-full hover:bg-background transition-all player-controls hover-glow"
            >
              <i className="ri-skip-back-fill text-xl"></i>
            </button>
            <button 
              onClick={togglePlayPause}
              className={`p-3 rounded-full bg-primary hover:opacity-90 transition-all player-controls ${isPlaying ? 'animate-pulse-glow' : ''}`}
            >
              <i className={`${isPlaying ? 'ri-pause-fill' : 'ri-play-fill'} text-xl`}></i>
            </button>
            <button 
              onClick={nextTrack}
              className="p-2 rounded-full hover:bg-background transition-all player-controls hover-glow"
            >
              <i className="ri-skip-forward-fill text-xl"></i>
            </button>
            <button className="p-2 rounded-full hover:bg-background transition-all player-controls hover-glow">
              <i className="ri-repeat-line text-lg"></i>
            </button>
          </div>
          
          <div className="flex items-center w-full px-4">
            <span className="text-xs text-muted-foreground mr-2 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={seekValue} 
              onChange={handleSeekChange}
              onMouseUp={handleSeekEnd}
              onTouchEnd={handleSeekEnd}
              className="audio-slider flex-1 h-2 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-muted-foreground ml-2 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        
        {/* Volume controls (hidden on mobile) */}
        <div className="hidden md:flex items-center justify-end w-1/3 space-x-3">
          <button 
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-background transition-all hover-glow"
          >
            <i className={`${getVolumeIcon()} text-lg`}></i>
          </button>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume} 
            onChange={handleVolumeChange}
            className="volume-slider w-24 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
