interface EqualizerProps {
  isPlaying: boolean;
}

export default function Equalizer({ isPlaying }: EqualizerProps) {
  if (!isPlaying) return null;
  
  // Create bars with different animation delays
  const bars = [
    { height: "h-3", delay: "0s" },
    { height: "h-4", delay: "0.2s" },
    { height: "h-2", delay: "0.4s" },
    { height: "h-5", delay: "0.6s" }
  ];

  return (
    <div className="equalizer-container flex items-end h-5 gap-0.5">
      {bars.map((bar, index) => (
        <div 
          key={index}
          className={`equalizer-bar ${bar.height} animate-equalize w-0.5 rounded-sm bg-primary`}
          style={{ animationDelay: bar.delay }}
        ></div>
      ))}
    </div>
  );
}
