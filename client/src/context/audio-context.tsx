import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Playlist, Track } from "../data/playlists";

interface AudioContextType {
  currentPlaylist: Playlist | null;
  currentTrack: Track | null;
  currentTrackIndex: number;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  setCurrentPlaylist: (playlist: Playlist) => void;
  playTrack: (index: number) => void;
  togglePlayPause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const [audio] = useState(new Audio());
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.8);

  // Initialize audio event listeners
  useEffect(() => {
    // Set initial volume
    audio.volume = volume;

    // Audio event listeners
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration || 0);
    const handleEnded = () => nextTrack();

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
      
      // Cleanup
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Load track when currentTrackIndex or currentPlaylist changes
  useEffect(() => {
    if (currentPlaylist && currentPlaylist.tracks.length > 0) {
      const track = currentPlaylist.tracks[currentTrackIndex];
      setCurrentTrack(track);
      
      // In a real app, we would set the audio source to a real file here
      // audio.src = track.fileUrl;
      
      // We'll fake the duration for the mock implementation
      // In a real implementation, this would come from the audio.duration after loading
      setDuration(convertDurationToSeconds(track.duration));
      
      if (isPlaying) {
        audio.play().catch(err => console.error("Error playing audio:", err));
      }
    }
  }, [currentTrackIndex, currentPlaylist]);

  // Control playback state
  useEffect(() => {
    if (isPlaying) {
      audio.play().catch(err => console.error("Error playing audio:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  // Convert string duration (mm:ss) to seconds
  const convertDurationToSeconds = (duration: string): number => {
    const [minutes, seconds] = duration.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Playback controls
  const playTrack = (index: number) => {
    if (currentTrackIndex !== index || !isPlaying) {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (currentPlaylist) {
      setCurrentTrackIndex(prevIndex => 
        (prevIndex + 1) % currentPlaylist.tracks.length
      );
    }
  };

  const previousTrack = () => {
    if (currentPlaylist) {
      setCurrentTrackIndex(prevIndex => 
        (prevIndex - 1 + currentPlaylist.tracks.length) % currentPlaylist.tracks.length
      );
    }
  };

  const seek = (time: number) => {
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const setVolume = (newVolume: number) => {
    const normalizedVolume = newVolume / 100;
    audio.volume = normalizedVolume;
    setVolumeState(normalizedVolume);
    
    if (normalizedVolume > 0 && isMuted) {
      setIsMuted(false);
    } else if (normalizedVolume === 0 && !isMuted) {
      setIsMuted(true);
    }
    
    if (normalizedVolume > 0) {
      setPreviousVolume(normalizedVolume);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      audio.volume = previousVolume;
      setVolumeState(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      audio.volume = 0;
      setVolumeState(0);
      setIsMuted(true);
    }
  };

  const contextValue: AudioContextType = {
    currentPlaylist,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    duration,
    currentTime,
    volume: volume * 100, // Convert to 0-100 scale for UI
    isMuted,
    setCurrentPlaylist,
    playTrack,
    togglePlayPause,
    nextTrack,
    previousTrack,
    seek,
    setVolume,
    toggleMute
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
