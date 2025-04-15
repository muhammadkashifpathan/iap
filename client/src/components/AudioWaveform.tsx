const AudioWaveform = () => {
  return (
    <div className="waveform-container">
      <div className="waveform-bar h-3 animate-wave"></div>
      <div className="waveform-bar h-4 animate-wave" style={{ animationDelay: "0.2s" }}></div>
      <div className="waveform-bar h-6 animate-wave" style={{ animationDelay: "0.3s" }}></div>
      <div className="waveform-bar h-8 animate-wave" style={{ animationDelay: "0.4s" }}></div>
      <div className="waveform-bar h-5 animate-wave" style={{ animationDelay: "0.5s" }}></div>
    </div>
  );
};

export default AudioWaveform;
