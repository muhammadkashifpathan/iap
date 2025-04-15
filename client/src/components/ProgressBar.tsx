import { useState, useEffect, useRef } from "react";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const ProgressBar = ({ currentTime, duration, onSeek }: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (!isDraggingRef.current && duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  }, [currentTime, duration]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!progressContainerRef.current) return;
    
    const rect = progressContainerRef.current.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const percentage = (clickPosition / rect.width) * 100;
    const seekTime = (percentage / 100) * duration;
    
    setProgress(percentage);
    onSeek(seekTime);
  };

  const handleMouseDown = () => {
    isDraggingRef.current = true;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      isDraggingRef.current = false;
    };

    document.addEventListener('mouseup', handleMouseUpGlobal);
    return () => {
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-600 dark:text-gray-400 w-10 text-right">
        {formatTime(currentTime)}
      </span>
      
      <div 
        ref={progressContainerRef}
        className="progress-container flex-grow"
        onClick={handleSeek}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
        >
          <div className="progress-dot"></div>
        </div>
      </div>
      
      <span className="text-xs text-gray-600 dark:text-gray-400 w-10">
        {formatTime(duration)}
      </span>
    </div>
  );
};

export default ProgressBar;
