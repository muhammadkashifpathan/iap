import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import PlaylistDetails from "@/pages/playlist-details";
import { AudioProvider } from "./context/audio-context";
import { ThemeProvider } from "./context/theme-context";
import AudioPlayer from "./components/player/audio-player";
import { useLocation } from "wouter";

function Router() {
  const [location] = useLocation();
  const isPlaylistRoute = location !== "/";
  
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/playlist/:id" component={PlaylistDetails} />
        <Route component={NotFound} />
      </Switch>
      
      {/* Only show audio player when on a route */}
      {isPlaylistRoute && (
        <div className="fixed bottom-0 left-0 right-0 z-20">
          <AudioPlayer />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AudioProvider>
          <Router />
          <Toaster />
        </AudioProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
