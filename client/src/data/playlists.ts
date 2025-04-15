export interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

export interface Playlist {
  id: number;
  title: string;
  cover: string;
  tracks: Track[];
}

// These are the playlists that will be shown in the app
export const playlists: Playlist[] = [
  {
    id: 1,
    title: "Summer Vibes",
    cover: "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?auto=format&fit=crop&w=600&h=600",
    tracks: [
      {
        id: 101,
        title: "Summer Feeling",
        artist: "Beach Waves",
        duration: "3:45",
        cover: "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?auto=format&fit=crop&w=600&h=600"
      },
      {
        id: 102,
        title: "Sunset Memories",
        artist: "Chill Beats",
        duration: "4:20",
        cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&h=600"
      },
      {
        id: 103,
        title: "Ocean Breeze",
        artist: "Tropical House",
        duration: "3:12",
        cover: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&h=600"
      },
      {
        id: 104,
        title: "Paradise Island",
        artist: "Palm Trees",
        duration: "5:08",
        cover: "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=600&h=600"
      }
    ]
  },
  {
    id: 2,
    title: "Lo-Fi Beats",
    cover: "https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?auto=format&fit=crop&w=600&h=600",
    tracks: [
      {
        id: 201,
        title: "Midnight Study",
        artist: "Chill Hop",
        duration: "4:15",
        cover: "https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?auto=format&fit=crop&w=600&h=600"
      },
      {
        id: 202,
        title: "Coffee Break",
        artist: "Jazzy Beats",
        duration: "3:40",
        cover: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&h=600"
      },
      {
        id: 203,
        title: "Urban Rain",
        artist: "City Sounds",
        duration: "4:55",
        cover: "https://images.unsplash.com/photo-1428790067070-0ebf4418d9d8?auto=format&fit=crop&w=600&h=600"
      }
    ]
  },
  {
    id: 3,
    title: "Workout Mix",
    cover: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=600&h=600",
    tracks: [
      {
        id: 301,
        title: "Power Up",
        artist: "Fitness Beats",
        duration: "3:25",
        cover: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=600&h=600"
      },
      {
        id: 302,
        title: "High Energy",
        artist: "Cardio Mix",
        duration: "4:10",
        cover: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&h=600"
      },
      {
        id: 303,
        title: "Lift Heavy",
        artist: "Gym Heroes",
        duration: "3:35",
        cover: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=600&h=600"
      },
      {
        id: 304,
        title: "Cool Down",
        artist: "Stretch Zone",
        duration: "5:15",
        cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&h=600"
      }
    ]
  },
  {
    id: 4,
    title: "Road Trip",
    cover: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=600&h=600",
    tracks: [
      {
        id: 401,
        title: "Highway Dreams",
        artist: "Open Road",
        duration: "4:35",
        cover: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=600&h=600"
      },
      {
        id: 402,
        title: "Drive All Night",
        artist: "Sunset Cruise",
        duration: "3:50",
        cover: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=600&h=600"
      },
      {
        id: 403,
        title: "Desert Winds",
        artist: "Long Journey",
        duration: "4:20",
        cover: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&h=600"
      }
    ]
  }
];

// Get recently played playlists
export const recentlyPlayedPlaylists: Playlist[] = [
  playlists[1], // Lo-Fi Beats
  playlists[2]  // Workout Mix
];

// Get playlist by ID
export function getPlaylistById(id: number): Playlist | undefined {
  return playlists.find(playlist => playlist.id === id);
}
