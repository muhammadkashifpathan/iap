import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Track } from "@/data/playlists";
import { playlists } from "@/data/playlists";

interface AudioTrack extends Track {
  playlistId: number;
}

interface AudioContextType {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  audio: HTMLAudioElement | null;
  playTrack: (track: Track, playlistId: number) => void;
  pauseTrack: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize audio element
    const audioElement = new Audio();
    setAudio(audioElement);

    return () => {
      audioElement.pause();
      audioElement.src = "";
    };
  }, []);

  useEffect(() => {
    if (!audio) return;

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio, currentTrack]);

  const playTrack = (track: Track, playlistId: number) => {
    if (!audio) return;

    const audioTrack: AudioTrack = { ...track, playlistId };

    // If it's a different track, change the source
    if (!currentTrack || currentTrack.id !== track.id || currentTrack.playlistId !== playlistId) {
      audio.src = track.audioSrc;
      audio.load();
      setCurrentTrack(audioTrack);
    }

    // Play the track
    audio.play().catch(error => {
      console.error("Error playing audio:", error);
    });
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    if (!audio) return;
    
    audio.pause();
    setIsPlaying(false);
  };

  const setVolume = (volume: number) => {
    if (!audio) return;
    
    audio.volume = volume;
  };

  const seek = (time: number) => {
    if (!audio) return;
    
    audio.currentTime = time;
  };

  const findCurrentPlaylistTracks = () => {
    if (!currentTrack) return { tracks: [], currentIndex: -1 };
    
    const playlist = playlists.find(p => p.id === currentTrack.playlistId);
    if (!playlist) return { tracks: [], currentIndex: -1 };
    
    const currentIndex = playlist.tracks.findIndex(t => t.id === currentTrack.id);
    return { tracks: playlist.tracks, currentIndex };
  };

  const nextTrack = () => {
    if (!currentTrack) return;

    const { tracks, currentIndex } = findCurrentPlaylistTracks();
    if (tracks.length === 0 || currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % tracks.length;
    playTrack(tracks[nextIndex], currentTrack.playlistId);
  };

  const previousTrack = () => {
    if (!currentTrack) return;

    const { tracks, currentIndex } = findCurrentPlaylistTracks();
    if (tracks.length === 0 || currentIndex === -1) return;

    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    playTrack(tracks[prevIndex], currentTrack.playlistId);
  };

  return (
    <AudioContext.Provider value={{
      currentTrack,
      isPlaying,
      audio,
      playTrack,
      pauseTrack,
      nextTrack,
      previousTrack,
      setIsPlaying,
      setVolume,
      seek
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
