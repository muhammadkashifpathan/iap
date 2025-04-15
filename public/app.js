// Global Variables
const audio = new Audio();
let currentTrack = null;
let currentPlaylistId = null;
let isPlaying = false;
let currentVolume = 0.8; // Default volume (80%)
let previousVolume = 0.8;
let isMuted = false;

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const playlistsSection = document.getElementById('playlistsSection');
const tracksSection = document.getElementById('tracksSection');
const playlistsGrid = document.querySelector('.playlists-grid');
const tracksList = document.getElementById('tracksList');
const playlistTitle = document.getElementById('playlistTitle');
const backButton = document.getElementById('backToPlaylists');
const currentTrackImage = document.getElementById('currentTrackImage');
const currentTrackTitle = document.getElementById('currentTrackTitle');
const currentTrackArtist = document.getElementById('currentTrackArtist');
const playPauseButton = document.getElementById('playPauseButton');
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');
const progressBar = document.getElementById('progressBar');
const progressBarContainer = document.getElementById('progressBarContainer');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const muteButton = document.getElementById('muteButton');

// Theme Toggle Functionality
themeToggle.addEventListener('click', () => {
  const isDarkTheme = document.body.classList.toggle('dark-theme');
  
  if (isDarkTheme) {
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
  
  // Save theme preference to localStorage
  localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
});

// Check for saved theme preference
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
  
  // Initialize the app
  init();
});

// Initialize App
function init() {
  // Render playlists
  renderPlaylists();
  
  // Setup event listeners
  setupEventListeners();
  
  // Show playlists section by default
  showSection('playlists');
}

// Render Playlists to the DOM
function renderPlaylists() {
  playlistsGrid.innerHTML = '';
  
  playlists.forEach(playlist => {
    const playlistCard = document.createElement('div');
    playlistCard.className = 'playlist-card';
    playlistCard.dataset.id = playlist.id;
    
    // Determine glow class based on playlist id
    let glowClass = 'glow-primary';
    if (playlist.id === 2) glowClass = 'glow-secondary';
    if (playlist.id === 3) glowClass = 'glow-accent';
    
    playlistCard.innerHTML = `
      <div class="playlist-card-image">
        <img src="${playlist.coverImage}" alt="${playlist.title}">
        <div class="playlist-card-info">
          <h3 class="playlist-card-title">${playlist.title}</h3>
          <p class="playlist-card-description">${playlist.tracks.length} tracks • ${playlist.description}</p>
        </div>
      </div>
    `;
    
    // Playlist click event
    playlistCard.addEventListener('click', () => {
      // Set current playlist
      currentPlaylistId = playlist.id;
      
      // Render tracks for the selected playlist
      renderTracks(playlist);
      
      // Update playlist title
      playlistTitle.textContent = playlist.title;
      
      // Show tracks section
      showSection('tracks');
    });
    
    // Add hover effect
    playlistCard.addEventListener('mouseenter', () => {
      playlistCard.classList.add(glowClass);
    });
    
    playlistCard.addEventListener('mouseleave', () => {
      playlistCard.classList.remove(glowClass);
    });
    
    playlistsGrid.appendChild(playlistCard);
  });
}

// Render Tracks for a given playlist
function renderTracks(playlist) {
  tracksList.innerHTML = '';
  
  playlist.tracks.forEach(track => {
    const trackItem = document.createElement('div');
    trackItem.className = 'track-item glassmorphism';
    trackItem.dataset.id = track.id;
    
    // Is this track the currently playing track?
    const isActiveTrack = currentTrack && currentTrack.id === track.id && currentPlaylistId === playlist.id;
    
    // Create waveform animation for currently playing track
    let playIconHtml = '<i class="fa-solid fa-play"></i>';
    if (isActiveTrack && isPlaying) {
      playIconHtml = createWaveformHtml();
    } else if (isActiveTrack && !isPlaying) {
      playIconHtml = '<i class="fa-solid fa-pause"></i>';
    }
    
    trackItem.innerHTML = `
      <div class="track-image">
        <img src="${track.coverImage || defaultTrackImage}" alt="${track.title}">
        <div class="track-image-overlay">
          ${playIconHtml}
        </div>
      </div>
      <div class="track-info">
        <h3 class="track-title">${track.title}</h3>
        <p class="track-artist">${track.artist}</p>
      </div>
      <div class="track-duration">${formatTime(track.duration)}</div>
    `;
    
    // Track click event
    trackItem.addEventListener('click', () => {
      if (isActiveTrack) {
        // If it's the current track, toggle play/pause
        togglePlayPause();
      } else {
        // If it's a different track, play it
        playTrack(track, playlist.id);
      }
    });
    
    tracksList.appendChild(trackItem);
  });
}

// Create HTML for waveform animation
function createWaveformHtml() {
  return `
    <div class="waveform-container">
      <div class="waveform-bar animate-wave" style="height: 8px; animation-delay: 0s;"></div>
      <div class="waveform-bar animate-wave" style="height: 10px; animation-delay: 0.2s;"></div>
      <div class="waveform-bar animate-wave" style="height: 16px; animation-delay: 0.3s;"></div>
      <div class="waveform-bar animate-wave" style="height: 20px; animation-delay: 0.4s;"></div>
      <div class="waveform-bar animate-wave" style="height: 14px; animation-delay: 0.5s;"></div>
    </div>
  `;
}

// Show a specific section (playlists or tracks)
function showSection(section) {
  if (section === 'playlists') {
    playlistsSection.classList.add('active');
    tracksSection.classList.remove('active');
  } else if (section === 'tracks') {
    playlistsSection.classList.remove('active');
    tracksSection.classList.add('active');
  }
}

// Setup all event listeners
function setupEventListeners() {
  // Back button
  backButton.addEventListener('click', () => {
    showSection('playlists');
  });
  
  // Play/Pause button
  playPauseButton.addEventListener('click', togglePlayPause);
  
  // Previous button
  previousButton.addEventListener('click', playPreviousTrack);
  
  // Next button
  nextButton.addEventListener('click', playNextTrack);
  
  // Progress bar click
  progressBarContainer.addEventListener('click', (e) => {
    const rect = progressBarContainer.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = clickPosition / rect.width;
    const seekTime = percentage * audio.duration;
    
    audio.currentTime = seekTime;
  });
  
  // Volume slider
  volumeSlider.addEventListener('input', () => {
    const newVolume = volumeSlider.value / 100;
    setVolume(newVolume);
    
    // Update mute button icon
    updateMuteIcon();
  });
  
  // Mute button
  muteButton.addEventListener('click', toggleMute);
  
  // Audio events
  audio.addEventListener('timeupdate', updateProgressBar);
  audio.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audio.duration);
  });
  audio.addEventListener('ended', playNextTrack);
}

// Play a track
function playTrack(track, playlistId) {
  // Set current track and playlist
  currentTrack = track;
  currentPlaylistId = playlistId;
  
  // Update audio source
  audio.src = track.audioSrc;
  audio.load();
  
  // Play audio
  const playPromise = audio.play();
  
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isPlaying = true;
      updatePlayerUI();
    }).catch(error => {
      console.error("Error playing audio:", error);
    });
  }
}

// Toggle play/pause
function togglePlayPause() {
  if (!currentTrack) return;
  
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play();
    isPlaying = true;
  }
  
  updatePlayerUI();
}

// Play next track
function playNextTrack() {
  if (!currentTrack || !currentPlaylistId) return;
  
  const currentPlaylist = playlists.find(p => p.id === currentPlaylistId);
  if (!currentPlaylist) return;
  
  const currentIndex = currentPlaylist.tracks.findIndex(t => t.id === currentTrack.id);
  if (currentIndex === -1) return;
  
  const nextIndex = (currentIndex + 1) % currentPlaylist.tracks.length;
  playTrack(currentPlaylist.tracks[nextIndex], currentPlaylistId);
}

// Play previous track
function playPreviousTrack() {
  if (!currentTrack || !currentPlaylistId) return;
  
  const currentPlaylist = playlists.find(p => p.id === currentPlaylistId);
  if (!currentPlaylist) return;
  
  const currentIndex = currentPlaylist.tracks.findIndex(t => t.id === currentTrack.id);
  if (currentIndex === -1) return;
  
  const prevIndex = (currentIndex - 1 + currentPlaylist.tracks.length) % currentPlaylist.tracks.length;
  playTrack(currentPlaylist.tracks[prevIndex], currentPlaylistId);
}

// Update progress bar
function updateProgressBar() {
  if (!audio.duration) return;
  
  const percentage = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${percentage}%`;
  
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
}

// Set volume
function setVolume(volume) {
  audio.volume = volume;
  currentVolume = volume;
  volumeSlider.value = volume * 100;
  
  // Update muted state
  if (volume === 0) {
    isMuted = true;
  } else {
    isMuted = false;
    previousVolume = volume;
  }
}

// Toggle mute
function toggleMute() {
  if (isMuted) {
    // Unmute
    setVolume(previousVolume);
    isMuted = false;
  } else {
    // Mute
    previousVolume = currentVolume;
    setVolume(0);
    isMuted = true;
  }
  
  updateMuteIcon();
}

// Update mute button icon
function updateMuteIcon() {
  if (isMuted || currentVolume === 0) {
    muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  } else {
    muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  }
}

// Update player UI
function updatePlayerUI() {
  // Update play/pause button
  if (isPlaying) {
    playPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    currentTrackImage.classList.remove('paused');
  } else {
    playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    currentTrackImage.classList.add('paused');
  }
  
  // Update current track info
  if (currentTrack) {
    currentTrackTitle.textContent = currentTrack.title;
    currentTrackArtist.textContent = currentTrack.artist;
    currentTrackImage.src = currentTrack.coverImage || defaultTrackImage;
  }
  
  // If a playlist is displayed, re-render its tracks to update the play/pause state
  if (currentPlaylistId) {
    const currentPlaylist = playlists.find(p => p.id === currentPlaylistId);
    if (currentPlaylist) {
      renderTracks(currentPlaylist);
    }
  }
}

// Format time (seconds) to MM:SS
function formatTime(seconds) {
  if (isNaN(seconds) || seconds === Infinity) return "0:00";
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}