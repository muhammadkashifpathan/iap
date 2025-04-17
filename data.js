// Music player data structure with local audio files
const playlists = [
  {
    id: 1,
    title: "Female Vocals",
    description: "Soothing female vocals",
    coverImage: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmVtYWxlJTIwc2luZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    tracks: [
      {
        id: 1,
        title: "Hasi - Female Cover",
        artist: "Slowed & Reverb",
        coverImage: "https://images.unsplash.com/photo-1516981442399-a91139ffff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZlbWFsZSUyMHNpbmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        audioSrc: "audios/fem/Hasi - ( Female Cover) - Slowed + Reverb - Lyrics - Use Headphones.mp3", 
        duration: 240, // Approximate duration
      },
      {
        id: 2,
        title: "Parindey",
        artist: "B Praak",
        coverImage: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZlbWFsZSUyMHNpbmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        audioSrc: "audios/fem/Parindey (Slowed+Reverb) Full HD Video Song｜B Praak｜Chill Vibes Lofi.mp3",
        duration: 280, // Approximate duration
      }
    ]
  },
  {
    id: 2,
    title: "Motivational",
    description: "Inspire your day",
    coverImage: "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vdGl2YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    tracks: [
      {
        id: 3,
        title: "Karne Se Hoga",
        artist: "Anamta Khan & Amaan Noor",
        coverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW90aXZhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        audioSrc: "audios/mot/Karne Se Hoga- Anamta Khan _ Amaan Noor _ Lyrical Video _ Motivational Song 2023 _ Original Song.mp3",
        duration: 255, // Approximate duration
      },
      {
        id: 4,
        title: "Parindey",
        artist: "Mohammed Irfan",
        coverImage: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW90aXZhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        audioSrc: "audios/mot/Parindey – Mohammed Irfan ｜ The Successful Loosers ｜ Aaditya Kumar ｜ Abhishek R Sharma.mp3",
        duration: 340, // Approximate duration
      },
      {
        id: 5,
        title: "Parindey (Slowed+Reverb)",
        artist: "B Praak",
        coverImage: "https://images.unsplash.com/photo-1448387473223-5c37445527e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vdGl2YXRpb258ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60",
        audioSrc: "audios/mot/Parindey (Slowed+Reverb) Full HD Video Song｜B Praak｜Chill Vibes Lofi.mp3",
        duration: 280, // Approximate duration
      }
    ]
  },
  {
    id: 3,
    title: "Punjabi Hits",
    description: "Top Punjabi tracks",
    coverImage: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVuamFiaSUyMG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    tracks: [
      {
        id: 6,
        title: "Karne Se Hoga",
        artist: "Anamta Khan & Amaan Noor",
        coverImage: "https://images.unsplash.com/photo-1564106273110-e1086cc43374?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHVuamFiaSUyMG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        audioSrc: "audios/punj/Karne Se Hoga- Anamta Khan _ Amaan Noor _ Lyrical Video _ Motivational Song 2023 _ Original Song.mp3",
        duration: 255, // Approximate duration
      },
      {
        id: 7,
        title: "Je Tera Khayal Na Aave",
        artist: "Punjabi Lyrics",
        coverImage: "https://images.unsplash.com/photo-1617360547704-3da8b5216738?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHB1bmphYmklMjBtdXNpY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        audioSrc: "audios/punj/VERY GRATEFUL Punjabi Song Je Tera Khayal Na Aave Taa A Duniya V Sunji Aa With Lyrics.mp3",
        duration: 230, // Approximate duration
      }
    ]
  },
  {
    id: 4,
    title: "Parindey Collection",
    description: "All Parindey versions",
    coverImage: "https://images.unsplash.com/photo-1528150177508-fd2dc2a2386b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmlyZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    tracks: [
      {
        id: 8,
        title: "Parindey",
        artist: "Mohammed Irfan",
        coverImage: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJpcmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        audioSrc: "audios/par/Parindey – Mohammed Irfan ｜ The Successful Loosers ｜ Aaditya Kumar ｜ Abhishek R Sharma.mp3",
        duration: 340, // Approximate duration
      },
      {
        id: 9,
        title: "Parindey (Slowed+Reverb)",
        artist: "B Praak",
        coverImage: "https://images.unsplash.com/photo-1583771756989-4813ccaa42e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        audioSrc: "audios/par/Parindey (Slowed+Reverb) Full HD Video Song｜B Praak｜Chill Vibes Lofi.mp3",
        duration: 280, // Approximate duration
      }
    ]
  }
];

// Default fallback image for tracks that don't have one
const defaultTrackImage = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";

// User's custom playlists (will be loaded from localStorage)
let userPlaylists = [];

// Generate a unique ID for new tracks/playlists
function generateUniqueId(collection) {
  if (!collection || collection.length === 0) return 1;
  const maxId = Math.max(...collection.map(item => item.id));
  return maxId + 1;
}

// Load user playlists from localStorage
function loadUserPlaylists() {
  const saved = localStorage.getItem('userPlaylists');
  if (saved) {
    try {
      userPlaylists = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved playlists:', e);
      userPlaylists = [];
    }
  }
}

// Save user playlists to localStorage
function saveUserPlaylists() {
  localStorage.setItem('userPlaylists', JSON.stringify(userPlaylists));
}

// Create a new user playlist
function createPlaylist(title, description, coverImage) {
  const newPlaylist = {
    id: generateUniqueId([...playlists, ...userPlaylists]),
    title: title || 'Untitled Playlist',
    description: description || 'My custom playlist',
    coverImage: coverImage || defaultTrackImage,
    isCustom: true,
    tracks: []
  };
  
  userPlaylists.push(newPlaylist);
  saveUserPlaylists();
  return newPlaylist;
}

// Add a track to a user playlist
function addTrackToPlaylist(playlistId, track) {
  const playlist = userPlaylists.find(p => p.id === playlistId);
  if (!playlist) return false;
  
  // Check if track already exists in the playlist
  if (playlist.tracks.some(t => t.id === track.id)) return false;
  
  playlist.tracks.push(track);
  saveUserPlaylists();
  return true;
}

// Remove a track from a user playlist
function removeTrackFromPlaylist(playlistId, trackId) {
  const playlist = userPlaylists.find(p => p.id === playlistId);
  if (!playlist) return false;
  
  const trackIndex = playlist.tracks.findIndex(t => t.id === trackId);
  if (trackIndex === -1) return false;
  
  playlist.tracks.splice(trackIndex, 1);
  saveUserPlaylists();
  return true;
}

// Delete a user playlist
function deletePlaylist(playlistId) {
  const index = userPlaylists.findIndex(p => p.id === playlistId);
  if (index === -1) return false;
  
  userPlaylists.splice(index, 1);
  saveUserPlaylists();
  return true;
}

// Get all playlists (default + user)
function getAllPlaylists() {
  return [...playlists, ...userPlaylists];
}

// Get all tracks from all playlists
function getAllTracks() {
  const allTracks = [];
  const processedIds = new Set();
  
  [...playlists, ...userPlaylists].forEach(playlist => {
    playlist.tracks.forEach(track => {
      if (!processedIds.has(track.id)) {
        allTracks.push({...track, playlistId: playlist.id});
        processedIds.add(track.id);
      }
    });
  });
  
  return allTracks;
}

// Initialize user playlists
loadUserPlaylists();