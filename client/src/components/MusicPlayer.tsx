import { useState, useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";
import { useAudio } from "@/lib/AudioContext";

interface MusicPlayerProps {
  isPlaying: boolean;
  togglePlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const MusicPlayer = ({ isPlaying, togglePlayPause, onNext, onPrevious }: MusicPlayerProps) => {
  const { currentTrack, audio, setVolume, seek } = useAudio();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(80);
  const previousVolumeRef = useRef(80);

  useEffect(() => {
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
    };
  }, [audio]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolumeLevel(newVolume);
    setVolume(newVolume / 100);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      // Unmute: restore previous volume
      setIsMuted(false);
      setVolumeLevel(previousVolumeRef.current);
      setVolume(previousVolumeRef.current / 100);
    } else {
      // Mute: store current volume and set to 0
      previousVolumeRef.current = volumeLevel;
      setIsMuted(true);
      setVolumeLevel(0);
      setVolume(0);
    }
  };

  const handleSeek = (time: number) => {
    seek(time);
  };

  if (!currentTrack) return null;

  return (
    <div id="musicPlayer" className="fixed bottom-0 left-0 right-0 glassmorphism glow-primary p-3 md:p-4 z-50">
      <div className="md:max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Current Track Info (always visible) */}
          <div className="flex items-center gap-3 md:w-1/4">
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden shadow-lg">
              <img 
                src={currentTrack.coverImage} 
                alt="Now playing" 
                className={`w-full h-full object-cover disc-rotate ${!isPlaying ? 'pause-animation' : ''}`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="overflow-hidden">
              <h3 className="font-medium font-poppins text-base truncate">{currentTrack.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{currentTrack.artist}</p>
            </div>
          </div>
          
          {/* Player Controls and Progress */}
          <div className="md:w-2/4 flex flex-col justify-center mt-3 md:mt-0">
            {/* Controls */}
            <div className="flex justify-center items-center gap-4 md:gap-6 mb-2">
              <button 
                onClick={onPrevious}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-light transition-colors duration-300"
              >
                <i className="fa-solid fa-backward-step text-xl"></i>
              </button>
              
              <button 
                onClick={togglePlayPause}
                className="w-10 h-10 rounded-full bg-primary-light text-white flex items-center justify-center hover:glow-secondary transition-all duration-300"
              >
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
              </button>
              
              <button 
                onClick={onNext}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-light transition-colors duration-300"
              >
                <i className="fa-solid fa-forward-step text-xl"></i>
              </button>
            </div>
            
            {/* Progress Bar */}
            <ProgressBar 
              currentTime={currentTime} 
              duration={duration} 
              onSeek={handleSeek}
            />
          </div>
          
          {/* Volume Controls */}
          <div className="md:w-1/4 flex justify-end items-center mt-3 md:mt-0">
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleMute}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-light transition-colors duration-300"
              >
                <i className={`fa-solid ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}></i>
              </button>
              
              <div className="w-24 md:w-32">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volumeLevel}
                  onChange={handleVolumeChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
