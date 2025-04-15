import { Link } from "wouter";
import { Playlist } from "@/data/playlists";

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <Link href={`/playlist/${playlist.id}`}>
      <a className="playlist-card cursor-pointer glassmorphism rounded-xl overflow-hidden transition-transform hover:scale-105 hover-glow">
        <div className="relative">
          <img 
            src={playlist.cover} 
            alt={`${playlist.title} Playlist`} 
            className="w-full aspect-square object-cover"
          />
          <div className="absolute bottom-2 right-2 p-3 rounded-full bg-primary opacity-0 hover:opacity-100 transition-opacity shadow-lg">
            <i className="ri-play-fill text-xl"></i>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg truncate">{playlist.title}</h3>
          <p className="text-muted-foreground text-sm">{playlist.tracks.length} tracks</p>
        </div>
      </a>
    </Link>
  );
}
