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
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(e => console.error("Playback failed", e));
    }
  }, [soundType]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className={`mt-8 w-full flex flex-col items-center gap-3 p-4 rounded-2xl border transition-colors duration-300 ${isDark ? 'bg-black/20 border-white/5' : 'bg-black/5 border-black/5'}`}>
      <audio
        ref={audioRef}
        src={SOUNDS[soundType].url}
        loop
      />

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
