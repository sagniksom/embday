import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [stage, setStage] = useState("welcome");
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const fadeInAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio.muted = false;
    let vol = 0;
    const interval = setInterval(() => {
      vol += 0.05;
      audio.volume = vol;
      if (vol >= 1) clearInterval(interval);
    }, 100);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const startMission = () => {
    fadeInAudio();
    setIsMuted(false);
    setStage("game");
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div>
      <audio ref={audioRef} autoPlay loop muted playsInline>
        <source src="/background.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMute}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 9999,
          background: "#111",
          color: "lime",
          padding: "12px",
          borderRadius: "50%",
          border: "1px solid lime",
        }}
      >
        {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
      </button>

      {stage === "welcome" && (
        <div>
          <h1>WELCOME EMILY</h1>
          <button onClick={startMission}>ACCEPT MISSION</button>
        </div>
      )}

      {stage === "game" && (
        <div>
          <h1>Mission Started</h1>
        </div>
      )}
    </div>
  );
}
