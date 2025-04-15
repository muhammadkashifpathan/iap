export interface Track {
  id: number;
  title: string;
  artist: string;
  coverImage: string;
  audioSrc: string;
  duration: number; // in seconds
}

export interface Playlist {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  tracks: Track[];
}

// Default track image to use when a specific track doesn't have one
const defaultTrackImage = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";

export const playlists: Playlist[] = [
  {
    id: 1,
    title: "Trending Now",
    description: "Updated weekly",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bXVzaWMlMjB0cmVuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    tracks: [
      {
        id: 1,
        title: "Endless Summer",
        artist: "HeatWave",
        coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        audioSrc: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3", 
        duration: 225, // 3:45
      },
      {
        id: 2,
        title: "Neon Dreams",
        artist: "Synthwave",
        coverImage: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        audioSrc: "https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3",
        duration: 262, // 4:22
      },
      {
        id: 3,
        title: "Midnight Groove",
        artist: "The Vibes",
        coverImage: "https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG11c2ljJTIwYXJ0aXN0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        audioSrc: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3",
        duration: 198, // 3:18
      },
      {
        id: 4,
        title: "Electric Dreams",
        artist: "Voltage",
        coverImage: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        audioSrc: "https://assets.mixkit.co/music/preview/mixkit-trip-hop-vibes-149.mp3",
        duration: 302, // 5:02
      }
    ]
  },
  {
    id: 2,
    title: "Chill Vibes",
    description: "Perfect for relaxing",
    coverImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVsYXhlZCUyMG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    tracks: [
      {
        id: 5,
        title: "Floating",
        artist: "Dreamscape",
        coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        audioSrc: "https://assets.mixkit.co/music/preview/mixkit-deep-urban-623.mp3",
        duration: 210, // 3:30
      },
      {
        id: 6,
        title: "Sunset Memories",
        artist: "Chill Mode",
        coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHN1bnNldCUyMG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        audioSrc: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3",
        duration: 180, // 3:00
      },
      {
        id: 7,
        title: "Ocean Waves",
        artist: "Aqua Sounds",
        coverImage: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b2NlYW4lMjB3YXZlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        audioSrc: "https://assets.mixkit.co/music/preview/mixkit-lost-in-his-thoughts-144.mp3",
        duration: 240, // 4:00
      }
    ]
  },
  {
    id: 3,
    title: "Party Mix",
    description: "Get the party started",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29uY2VydCUyMHBhcnR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    tracks: [
      {
        id: 8,
        title: "Bass Drop",
        artist: "DJ Electro",
        coverImage: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZGolMjBtdXNpY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        audioSrc: "https://assets.mixkit.co/music/preview/mixkit-house-your-life-127.mp3",
        duration: 195, // 3:15
      },
      {
        id: 9,
        title: "Party Animals",
        artist: "Night Owls",
        coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGFydHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        audioSrc: "https://assets.mixkit.co/music/preview/mixkit-dance-with-me-3.mp3",
        duration: 215, // 3:35
      },
      {
        id: 10,
        title: "Dancefloor Hits",
        artist: "BPM Kings",
        coverImage: "https://images.unsplash.com/photo-1574393118433-e932f3cb5154?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGRhbmNlJTIwZmxvb3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        audioSrc: "https://assets.mixkit.co/music/preview/mixkit-c-major-forest-131.mp3",
        duration: 185, // 3:05
      },
      {
        id: 11,
        title: "Euphoria",
        artist: "Rhythm Nation",
        coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGl2ZSUyMG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        audioSrc: "https://assets.mixkit.co/music/preview/mixkit-raising-me-higher-34.mp3",
        duration: 230, // 3:50
      }
    ]
  }
];
