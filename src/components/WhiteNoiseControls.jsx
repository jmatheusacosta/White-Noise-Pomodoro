import { useState, useRef, useEffect } from 'react';

const SOUNDS = {
  estatico: { name: '📺 White Noise', url: '/sounds/white_noise.mp3' },
  chuva: { name: '🌧️ Rain', url: '/sounds/rain.mp3' },
  vento: { name: '🌬️ Wind', url: '/sounds/wind.mp3' },
  binaural_beats: { name: '🧠 Binaural Beats', url: '/sounds/binauralbeats.mp3' }
};

export function WhiteNoiseControls({ globalStyles, isDark }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [soundType, setSoundType] = useState('estatico');
  
  // Web Audio Context refs for gapless playback
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const audioBuffersRef = useRef({}); // Cache for downloaded audio files
  
  const currentSoundTypeRef = useRef(soundType);
  const isPlayingRef = useRef(isPlaying);

  // Update refs to avoid stale closures during async fetch calls
  useEffect(() => {
    currentSoundTypeRef.current = soundType;
  }, [soundType]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Initialize AudioContext
  const initAudioCtx = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
      
      gainNodeRef.current = audioCtxRef.current.createGain();
      // Use linear ramping for a smoother volume initialization if possible, 
      // but value setting is fine for initialization
      gainNodeRef.current.gain.value = volume;
      gainNodeRef.current.connect(audioCtxRef.current.destination);
    }
  };

  // Fetch and decode audio buffer
  const loadAudioBuffer = async (url) => {
    if (audioBuffersRef.current[url]) {
      return audioBuffersRef.current[url];
    }
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const decodedBuffer = await audioCtxRef.current.decodeAudioData(arrayBuffer);
      audioBuffersRef.current[url] = decodedBuffer;
      return decodedBuffer;
    } catch (e) {
      console.error("Error loading audio buffer for gapless playback:", e);
      return null;
    }
  };

  const playBuffer = async (type) => {
    initAudioCtx();
    
    if (audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume();
    }

    const buffer = await loadAudioBuffer(SOUNDS[type].url);
    if (!buffer) return;

    // Check if the user paused or changed sound type while we were fetching
    if (!isPlayingRef.current || currentSoundTypeRef.current !== type) return;

    // Stop currently playing source if there is one
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }

    // Create new source for gapless playback
    const source = audioCtxRef.current.createBufferSource();
    source.buffer = buffer;
    source.loop = true; // This handles PERFECT gapless looping natively!
    source.connect(gainNodeRef.current);
    source.start(0);
    sourceNodeRef.current = source;
  };

  const stopBuffer = () => {
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  // Handle Play/Pause
  useEffect(() => {
    if (isPlaying) {
      playBuffer(soundType);
    } else {
      stopBuffer();
    }
  }, [isPlaying]);

  // Handle Sound Type Change while playing
  useEffect(() => {
    if (isPlaying) {
      playBuffer(soundType);
    }
  }, [soundType]);

  // Handle Volume without popping
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      // Smooth volume transition to prevent clicking sounds
      gainNodeRef.current.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.1);
    }
  }, [volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(console.error);
      }
    };
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className={`mt-8 w-full flex flex-col items-center gap-3 p-4 rounded-2xl border transition-colors duration-300 ${isDark ? 'bg-black/20 border-white/5' : 'bg-black/5 border-black/5'}`}>
      
      <div className="flex w-full items-center justify-between gap-2">
        <select
          value={soundType}
          onChange={(e) => setSoundType(e.target.value)}
          className={`flex-1 p-2 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium cursor-pointer transition-colors ${globalStyles.modalInput}`}
        >
          {Object.entries(SOUNDS).map(([key, s]) => (
            <option key={key} value={key}>{s.name}</option>
          ))}
        </select>

        <button
          onClick={togglePlay}
          className={`p-2 w-12 h-10 flex items-center justify-center rounded-xl font-bold shadow-sm transition-all active:scale-95 ${isPlaying ? globalStyles.dangerBtn : globalStyles.topBtn}`}
          aria-label="Toggle White Noise"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          )}
        </button>
      </div>

      <div className="flex w-full items-center gap-3 px-1 mt-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isDark ? "text-gray-400" : "text-gray-500"}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon></svg>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${isDark ? '#60a5fa' : '#3b82f6'} ${volume * 100}%, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} ${volume * 100}%)`
          }}
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isDark ? "text-gray-400" : "text-gray-500"}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
      </div>
    </div>
  );
}
