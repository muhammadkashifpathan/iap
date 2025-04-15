// Global Variables
const audio = new Audio();
let currentTrack = null;
let currentPlaylistId = null;
let isPlaying = false;
let currentVolume = 0.8; // Default volume (80%)
let previousVolume = 0.8;
let isMuted = false;
let shuffleMode = false;
let repeatMode = 0; // 0: no repeat, 1: repeat all, 2: repeat one
let audioContext = null;
let analyser = null;
let canvasContext = null;
let visualizerDataArray = null;
let visualizerAnimationFrame = null;
let searchQuery = "";
let isVisualizerActive = false;
let shuffledPlaylist = null;

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const playlistsSection = document.getElementById('playlistsSection');
const tracksSection = document.getElementById('tracksSection');
const lyricsSection = document.getElementById('lyricsSection');
const playlistsGrid = document.querySelector('.playlists-grid');
const tracksList = document.getElementById('tracksList');
const playlistTitle = document.getElementById('playlistTitle');
const backButton = document.getElementById('backToPlaylists');
const backFromLyricsButton = document.getElementById('backFromLyrics');
const lyricsContainer = document.getElementById('lyricsContainer');
const currentTrackImage = document.getElementById('currentTrackImage');
const currentTrackTitle = document.getElementById('currentTrackTitle');
const currentTrackArtist = document.getElementById('currentTrackArtist');
const playPauseButton = document.getElementById('playPauseButton');
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');
const repeatButton = document.getElementById('repeatButton');
const shuffleButton = document.getElementById('shuffleButton');
const progressBar = document.getElementById('progressBar');
const progressBarContainer = document.getElementById('progressBarContainer');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const muteButton = document.getElementById('muteButton');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const visualizerContainer = document.getElementById('visualizerContainer');
const visualizerCanvas = document.getElementById('visualizer');
const playbackSpeedSelect = document.getElementById('playbackSpeed');
const createPlaylistButton = document.getElementById('createPlaylistButton');
const createPlaylistModal = document.getElementById('createPlaylistModal');
const closeModalButton = document.getElementById('closeModal');
const savePlaylistButton = document.getElementById('savePlaylistButton');
const playlistTitleInput = document.getElementById('playlistTitleInput');
const playlistDescriptionInput = document.getElementById('playlistDescriptionInput');
const playlistCoverInput = document.getElementById('playlistCoverInput');
const lyricsButton = document.getElementById('lyricsButton');
const downloadButton = document.getElementById('downloadButton');
const shareButton = document.getElementById('shareButton');
const shareModal = document.getElementById('shareModal');
const closeShareModalButton = document.getElementById('closeShareModal');
const shareLinkInput = document.getElementById('shareLinkInput');
const copyLinkButton = document.getElementById('copyLinkButton');
const keyboardShortcutsInfo = document.getElementById('keyboardShortcutsInfo');
const closeShortcutsInfoButton = document.getElementById('closeShortcutsInfo');

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
  
  // Get all playlists (default + user)
  const allPlaylists = getAllPlaylists();
  
  allPlaylists.forEach(playlist => {
    const playlistCard = document.createElement('div');
    playlistCard.className = 'playlist-card';
    playlistCard.dataset.id = playlist.id;
    
    // Determine glow class based on playlist id or custom status
    let glowClass = 'glow-primary';
    if (playlist.id === 2) glowClass = 'glow-secondary';
    if (playlist.id === 3) glowClass = 'glow-accent';
    if (playlist.isCustom) glowClass = 'glow-accent';
    
    // Add a delete button for custom playlists
    let deleteButtonHtml = '';
    if (playlist.isCustom) {
      deleteButtonHtml = `
        <button class="delete-playlist-button" data-playlist-id="${playlist.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      `;
    }
    
    playlistCard.innerHTML = `
      <div class="playlist-card-image">
        <img src="${playlist.coverImage}" alt="${playlist.title}">
        <div class="playlist-card-info">
          <h3 class="playlist-card-title">${playlist.title}</h3>
          <p class="playlist-card-description">${playlist.tracks.length} tracks • ${playlist.description}</p>
          ${deleteButtonHtml}
        </div>
      </div>
    `;
    
    // Playlist click event
    playlistCard.addEventListener('click', (e) => {
      // Don't open the playlist if the delete button was clicked
      if (e.target.closest('.delete-playlist-button')) {
        e.stopPropagation();
        const playlistId = parseInt(e.target.closest('.delete-playlist-button').dataset.playlistId);
        
        if (confirm('Are you sure you want to delete this playlist?')) {
          deletePlaylist(playlistId);
          renderPlaylists();
        }
        return;
      }
      
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
    
    // Is this track the currently playing track?
    const isActiveTrack = currentTrack && currentTrack.id === track.id && currentPlaylistId === playlist.id;
    
    // Add active class if this is the current track
    trackItem.className = isActiveTrack ? 'track-item glassmorphism active' : 'track-item glassmorphism';
    trackItem.dataset.id = track.id;
    
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

// Show a specific section (playlists, tracks, or lyrics)
function showSection(section) {
  // Hide all sections first
  playlistsSection.classList.remove('active');
  tracksSection.classList.remove('active');
  lyricsSection.classList.remove('active');
  
  // Show the requested section
  if (section === 'playlists') {
    playlistsSection.classList.add('active');
  } else if (section === 'tracks') {
    tracksSection.classList.add('active');
  } else if (section === 'lyrics') {
    lyricsSection.classList.add('active');
    showLyrics();
  }
}

// Setup all event listeners
function setupEventListeners() {
  // Back buttons
  backButton.addEventListener('click', () => {
    showSection('playlists');
  });
  
  backFromLyricsButton.addEventListener('click', () => {
    showSection('tracks');
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
  audio.addEventListener('ended', handleTrackEnd);
  
  // Shuffle button
  shuffleButton.addEventListener('click', toggleShuffle);
  
  // Repeat button
  repeatButton.addEventListener('click', toggleRepeat);
  
  // Playback speed
  playbackSpeedSelect.addEventListener('change', () => {
    const speed = parseFloat(playbackSpeedSelect.value);
    audio.playbackRate = speed;
  });
  
  // Search functionality
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    if (searchQuery && currentPlaylistId) {
      const currentPlaylist = getAllPlaylists().find(p => p.id === currentPlaylistId);
      if (currentPlaylist) {
        const filteredTracks = currentPlaylist.tracks.filter(track => 
          track.title.toLowerCase().includes(searchQuery) || 
          track.artist.toLowerCase().includes(searchQuery)
        );
        
        // Create a temporary playlist with filtered tracks
        const tempPlaylist = { ...currentPlaylist, tracks: filteredTracks };
        renderTracks(tempPlaylist);
      }
    } else if (currentPlaylistId) {
      // If search is cleared, show all tracks
      const currentPlaylist = getAllPlaylists().find(p => p.id === currentPlaylistId);
      if (currentPlaylist) {
        renderTracks(currentPlaylist);
      }
    }
  });
  
  searchButton.addEventListener('click', () => {
    const query = searchQuery.trim();
    if (query) {
      // Search across all playlists
      const allTracks = getAllTracks();
      const filteredTracks = allTracks.filter(track => 
        track.title.toLowerCase().includes(query) || 
        track.artist.toLowerCase().includes(query)
      );
      
      if (filteredTracks.length > 0) {
        // Create a temporary "Search Results" playlist
        const searchPlaylist = {
          id: 'search',
          title: `Search: "${query}"`,
          description: `${filteredTracks.length} results found`,
          tracks: filteredTracks
        };
        
        // Show search results
        currentPlaylistId = 'search';
        playlistTitle.textContent = searchPlaylist.title;
        renderTracks(searchPlaylist);
        showSection('tracks');
      }
    }
  });
  
  // Create playlist button
  createPlaylistButton.addEventListener('click', () => {
    createPlaylistModal.classList.add('active');
  });
  
  // Close modal button
  closeModalButton.addEventListener('click', () => {
    createPlaylistModal.classList.remove('active');
  });
  
  // Save playlist button
  savePlaylistButton.addEventListener('click', () => {
    const title = playlistTitleInput.value.trim();
    const description = playlistDescriptionInput.value.trim();
    const coverImage = playlistCoverInput.value.trim();
    
    if (title) {
      const newPlaylist = createPlaylist(title, description, coverImage);
      createPlaylistModal.classList.remove('active');
      
      // Clear form
      playlistTitleInput.value = '';
      playlistDescriptionInput.value = '';
      playlistCoverInput.value = '';
      
      // Re-render playlists to include the new one
      renderPlaylists();
      
      // Switch to the new playlist
      currentPlaylistId = newPlaylist.id;
      playlistTitle.textContent = newPlaylist.title;
      renderTracks(newPlaylist);
      showSection('tracks');
    }
  });
  
  // Handle clicks outside the modal to close it
  window.addEventListener('click', (e) => {
    if (e.target === createPlaylistModal) {
      createPlaylistModal.classList.remove('active');
    }
    if (e.target === shareModal) {
      shareModal.classList.remove('active');
    }
  });
  
  // Lyrics button
  lyricsButton.addEventListener('click', () => {
    if (currentTrack && currentTrack.lyrics) {
      showSection('lyrics');
    }
  });
  
  // Download button
  downloadButton.addEventListener('click', () => {
    if (currentTrack) {
      // Create an anchor element
      const downloadLink = document.createElement('a');
      downloadLink.href = currentTrack.audioSrc;
      downloadLink.download = `${currentTrack.title} - ${currentTrack.artist}.mp3`;
      
      // Append to document, click, and remove
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  });
  
  // Share button
  shareButton.addEventListener('click', () => {
    if (currentTrack) {
      // Set share link
      const shareUrl = `${window.location.origin}${window.location.pathname}?track=${currentTrack.id}&playlist=${currentPlaylistId}`;
      shareLinkInput.value = shareUrl;
      
      // Display share modal
      shareModal.classList.add('active');
    }
  });
  
  // Close share modal
  closeShareModalButton.addEventListener('click', () => {
    shareModal.classList.remove('active');
  });
  
  // Copy link button
  copyLinkButton.addEventListener('click', () => {
    shareLinkInput.select();
    document.execCommand('copy');
    
    // Show feedback
    copyLinkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    setTimeout(() => {
      copyLinkButton.innerHTML = '<i class="fa-solid fa-copy"></i>';
    }, 1500);
  });
  
  // Social share buttons
  document.querySelectorAll('.share-button').forEach(button => {
    button.addEventListener('click', () => {
      const platform = button.dataset.platform;
      const shareText = `Check out "${currentTrack.title}" by ${currentTrack.artist} on Melodify!`;
      const shareUrl = shareLinkInput.value;
      let url;
      
      switch (platform) {
        case 'facebook':
          url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
          break;
        case 'twitter':
          url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
          break;
        case 'whatsapp':
          url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
          break;
        case 'email':
          url = `mailto:?subject=${encodeURIComponent('Check out this song!')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
          break;
      }
      
      if (url) {
        window.open(url, '_blank');
      }
    });
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcut);
  
  // Show/hide keyboard shortcuts info
  document.addEventListener('keydown', (e) => {
    if (e.key === '?' && !e.ctrlKey && !e.altKey && !e.metaKey) {
      toggleKeyboardShortcutsInfo();
    }
  });
  
  // Close keyboard shortcuts info
  closeShortcutsInfoButton.addEventListener('click', () => {
    keyboardShortcutsInfo.classList.remove('visible');
  });
  
  // Check for shared track in URL
  checkForSharedTrack();
  
  // Initialize audio visualizer
  setupVisualizer();
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

// Handle track end
function handleTrackEnd() {
  // If repeat one is enabled, play the same track again
  if (repeatMode === 2) {
    audio.currentTime = 0;
    audio.play();
    return;
  }
  
  // Otherwise play next track
  playNextTrack();
}

// Get current playlist
function getCurrentPlaylist() {
  if (!currentPlaylistId) return null;
  
  // First check user playlists
  if (currentPlaylistId === 'search') {
    // For search results, construct the temporary playlist
    const query = searchQuery.trim();
    const allTracks = getAllTracks();
    const filteredTracks = allTracks.filter(track => 
      track.title.toLowerCase().includes(query) || 
      track.artist.toLowerCase().includes(query)
    );
    
    return {
      id: 'search',
      title: `Search: "${query}"`,
      description: `${filteredTracks.length} results found`,
      tracks: filteredTracks
    };
  }
  
  // Check user playlists first
  let playlist = userPlaylists.find(p => p.id === currentPlaylistId);
  
  // If not found in user playlists, check default playlists
  if (!playlist) {
    playlist = playlists.find(p => p.id === currentPlaylistId);
  }
  
  return playlist;
}

// Play next track
function playNextTrack() {
  if (!currentTrack || !currentPlaylistId) return;
  
  const currentPlaylist = getCurrentPlaylist();
  if (!currentPlaylist) return;
  
  // If we're at the end of the playlist and repeat all is not enabled, don't loop
  const currentIndex = currentPlaylist.tracks.findIndex(t => t.id === currentTrack.id);
  if (currentIndex === -1) return;
  
  let nextIndex;
  
  if (shuffleMode) {
    // With shuffle, pick a random track
    if (!shuffledPlaylist || shuffledPlaylist.length === 0) {
      // Create a new shuffled playlist, removing the current track
      shuffledPlaylist = [...currentPlaylist.tracks]
        .filter(t => t.id !== currentTrack.id)
        .sort(() => Math.random() - 0.5);
    }
    
    // Get next track from shuffled playlist
    const nextTrack = shuffledPlaylist.shift();
    playTrack(nextTrack, currentPlaylistId);
    return;
  } else {
    // Without shuffle, just move to the next track
    if (currentIndex === currentPlaylist.tracks.length - 1 && repeatMode === 0) {
      // If we're at the end and repeat is off, stop playing
      audio.pause();
      isPlaying = false;
      updatePlayerUI();
      return;
    }
    
    nextIndex = (currentIndex + 1) % currentPlaylist.tracks.length;
    playTrack(currentPlaylist.tracks[nextIndex], currentPlaylistId);
  }
}

// Play previous track
function playPreviousTrack() {
  if (!currentTrack || !currentPlaylistId) return;
  
  // If we're in shuffle mode, we'll just treat previous as a random track too
  if (shuffleMode) {
    playNextTrack();
    return;
  }
  
  const currentPlaylist = getCurrentPlaylist();
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

// Toggle shuffle mode
function toggleShuffle() {
  shuffleMode = !shuffleMode;
  
  // Reset the shuffled playlist
  shuffledPlaylist = null;
  
  // Update button UI
  if (shuffleMode) {
    shuffleButton.classList.add('active');
  } else {
    shuffleButton.classList.remove('active');
  }
}

// Toggle repeat mode (0: no repeat, 1: repeat all, 2: repeat one)
function toggleRepeat() {
  repeatMode = (repeatMode + 1) % 3;
  
  // Update button UI
  switch(repeatMode) {
    case 0:
      repeatButton.innerHTML = '<i class="fa-solid fa-repeat"></i>';
      repeatButton.classList.remove('active');
      break;
    case 1:
      repeatButton.innerHTML = '<i class="fa-solid fa-repeat"></i>';
      repeatButton.classList.add('active');
      break;
    case 2:
      repeatButton.innerHTML = '<i class="fa-solid fa-repeat-1"></i>';
      repeatButton.classList.add('active');
      break;
  }
}

// Show track lyrics
function showLyrics() {
  if (!currentTrack || !currentTrack.lyrics) return;
  
  // Display lyrics
  lyricsContainer.innerHTML = `<p>${currentTrack.lyrics}</p>`;
}

// Setup audio visualizer
function setupVisualizer() {
  // Create audio context
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      
      // Connect audio to analyser
      const source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      // Configure analyser
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      visualizerDataArray = new Uint8Array(bufferLength);
      
      // Setup canvas
      canvasContext = visualizerCanvas.getContext('2d');
      
      // Start animation
      drawVisualizer();
    } catch (e) {
      console.error('Web Audio API not supported:', e);
    }
  }
}

// Draw visualizer animation
function drawVisualizer() {
  if (!isVisualizerActive) {
    visualizerContainer.classList.remove('visible');
    return;
  }
  
  visualizerContainer.classList.add('visible');
  
  // Get canvas dimensions
  const width = visualizerCanvas.width;
  const height = visualizerCanvas.height;
  
  // Clear canvas
  canvasContext.clearRect(0, 0, width, height);
  
  // Only proceed if we're playing
  if (isPlaying && analyser) {
    // Get frequency data
    analyser.getByteFrequencyData(visualizerDataArray);
    
    // Calculate bar width based on canvas size and data length
    const barWidth = width / visualizerDataArray.length;
    
    // Draw bars
    for (let i = 0; i < visualizerDataArray.length; i++) {
      const barHeight = (visualizerDataArray[i] / 255) * height;
      
      // Calculate gradient color (transition from primary to secondary color)
      const r = Math.floor(124 + (255 - 124) * (i / visualizerDataArray.length));
      const g = Math.floor(77 + (0 - 77) * (i / visualizerDataArray.length));
      const b = Math.floor(255 + (255 - 255) * (i / visualizerDataArray.length));
      
      canvasContext.fillStyle = `rgb(${r}, ${g}, ${b})`;
      canvasContext.fillRect(i * barWidth, height - barHeight, barWidth - 1, barHeight);
    }
  }
  
  // Schedule next frame
  visualizerAnimationFrame = requestAnimationFrame(drawVisualizer);
}

// Toggle visualizer
function toggleVisualizer() {
  isVisualizerActive = !isVisualizerActive;
  
  if (isVisualizerActive) {
    if (!visualizerAnimationFrame) {
      drawVisualizer();
    }
  } else {
    if (visualizerAnimationFrame) {
      cancelAnimationFrame(visualizerAnimationFrame);
      visualizerAnimationFrame = null;
    }
    visualizerContainer.classList.remove('visible');
  }
}

// Handle keyboard shortcuts
function handleKeyboardShortcut(e) {
  // Only respond to shortcuts if no input elements are focused
  if (document.activeElement.tagName === 'INPUT' || 
      document.activeElement.tagName === 'TEXTAREA' ||
      document.activeElement.tagName === 'SELECT') {
    return;
  }
  
  switch (e.key) {
    case ' ': // Space bar - Play/Pause
      e.preventDefault();
      togglePlayPause();
      break;
    case 'ArrowRight': // Right arrow - Next track
      playNextTrack();
      break;
    case 'ArrowLeft': // Left arrow - Previous track
      playPreviousTrack();
      break;
    case 'ArrowUp': // Up arrow - Volume up
      e.preventDefault();
      const newVolumeUp = Math.min(1, currentVolume + 0.1);
      setVolume(newVolumeUp);
      updateMuteIcon();
      break;
    case 'ArrowDown': // Down arrow - Volume down
      e.preventDefault();
      const newVolumeDown = Math.max(0, currentVolume - 0.1);
      setVolume(newVolumeDown);
      updateMuteIcon();
      break;
    case 'm': // M - Mute/unmute
    case 'M':
      toggleMute();
      break;
    case 'l': // L - Show/hide lyrics
    case 'L':
      if (currentTrack && currentTrack.lyrics) {
        if (lyricsSection.classList.contains('active')) {
          showSection('tracks');
        } else {
          showSection('lyrics');
        }
      }
      break;
    case 's': // S - Toggle shuffle
    case 'S':
      toggleShuffle();
      break;
    case 'r': // R - Toggle repeat
    case 'R':
      toggleRepeat();
      break;
    case 'v': // V - Toggle visualizer
    case 'V':
      toggleVisualizer();
      break;
    case '+': // + - Increase playback speed
      const currentSpeed = parseFloat(playbackSpeedSelect.value);
      const speedOptions = Array.from(playbackSpeedSelect.options).map(o => parseFloat(o.value));
      const currentIndex = speedOptions.indexOf(currentSpeed);
      if (currentIndex < speedOptions.length - 1) {
        playbackSpeedSelect.value = speedOptions[currentIndex + 1];
        audio.playbackRate = speedOptions[currentIndex + 1];
      }
      break;
    case '-': // - - Decrease playback speed
      const currentSlowSpeed = parseFloat(playbackSpeedSelect.value);
      const slowSpeedOptions = Array.from(playbackSpeedSelect.options).map(o => parseFloat(o.value));
      const currentSlowIndex = slowSpeedOptions.indexOf(currentSlowSpeed);
      if (currentSlowIndex > 0) {
        playbackSpeedSelect.value = slowSpeedOptions[currentSlowIndex - 1];
        audio.playbackRate = slowSpeedOptions[currentSlowIndex - 1];
      }
      break;
  }
}

// Toggle keyboard shortcuts info display
function toggleKeyboardShortcutsInfo() {
  keyboardShortcutsInfo.classList.toggle('visible');
}

// Check URL for shared track
function checkForSharedTrack() {
  const urlParams = new URLSearchParams(window.location.search);
  const trackId = urlParams.get('track');
  const playlistId = urlParams.get('playlist');
  
  if (trackId && playlistId) {
    // Find the playlist
    const playlist = getAllPlaylists().find(p => p.id.toString() === playlistId);
    
    if (playlist) {
      // Find the track
      const track = playlist.tracks.find(t => t.id.toString() === trackId);
      
      if (track) {
        // Set current playlist
        currentPlaylistId = playlist.id;
        
        // Show tracks section
        playlistTitle.textContent = playlist.title;
        renderTracks(playlist);
        showSection('tracks');
        
        // Play the track
        playTrack(track, playlist.id);
      }
    }
  }
}

// Update player UI with additional UI elements
function updatePlayerUI() {
  // Basic UI updates (already implemented)
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
    
    // Enable/disable lyrics button based on lyrics availability
    if (currentTrack.lyrics) {
      lyricsButton.classList.remove('disabled');
    } else {
      lyricsButton.classList.add('disabled');
    }
  }
  
  // If a playlist is displayed, re-render its tracks to update the play/pause state
  if (currentPlaylistId) {
    const currentPlaylist = getCurrentPlaylist();
    if (currentPlaylist) {
      renderTracks(currentPlaylist);
    }
  }
}