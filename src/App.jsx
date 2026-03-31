import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_SETTINGS, COLOR_SCHEMAS } from './config/constants';
import { TopBar } from './components/TopBar';
import { ModeSelector } from './components/ModeSelector';
import { TimerDisplay } from './components/TimerDisplay';
import { TimerControls } from './components/TimerControls';
import { SettingsModal } from './components/SettingsModal';
import { WhiteNoiseControls } from './components/WhiteNoiseControls';

export default function App() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('pomodoroSettings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [modeId, setModeId] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(settings.durations.focus * 60);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Settings form local state
  const [tempDurations, setTempDurations] = useState(settings.durations);
  const [tempColorPreset, setTempColorPreset] = useState(settings.colorPreset || 'pastel');

  // Sync temp settings
  useEffect(() => {
    if (showSettings) {
      setTempDurations(settings.durations);
      setTempColorPreset(settings.colorPreset || 'pastel');
    }
  }, [showSettings, settings.durations, settings.colorPreset]);

  // Derived styling
  const isDark = settings.theme === 'dark';
  const schema = COLOR_SCHEMAS[settings.colorPreset || 'pastel'];

  const getStyle = (modeKey, styleKey) => {
    return schema[modeKey][isDark ? 'dark' : 'light'][styleKey];
  };

  const MODES = {
    focus: {
      name: 'Focus',
      minutes: settings.durations.focus,
      bg: getStyle('focus', 'bg'),
      text: getStyle('focus', 'text'),
      btnActive: getStyle('focus', 'btn'),
      tabActive: getStyle('focus', 'tabActive'),
      tabInactive: isDark ? 'text-gray-400 hover:bg-white/5 hover:text-gray-200' : 'text-gray-600 hover:bg-black/5 hover:text-gray-900',
      finishedPulse: getStyle('focus', 'pulse')
    },
    shortBreak: {
      name: 'Short Break',
      minutes: settings.durations.shortBreak,
      bg: getStyle('shortBreak', 'bg'),
      text: getStyle('shortBreak', 'text'),
      btnActive: getStyle('shortBreak', 'btn'),
      tabActive: getStyle('shortBreak', 'tabActive'),
      tabInactive: isDark ? 'text-gray-400 hover:bg-white/5 hover:text-gray-200' : 'text-gray-600 hover:bg-black/5 hover:text-gray-900',
      finishedPulse: getStyle('shortBreak', 'pulse')
    },
    longBreak: {
      name: 'Long Break',
      minutes: settings.durations.longBreak,
      bg: getStyle('longBreak', 'bg'),
      text: getStyle('longBreak', 'text'),
      btnActive: getStyle('longBreak', 'btn'),
      tabActive: getStyle('longBreak', 'tabActive'),
      tabInactive: isDark ? 'text-gray-400 hover:bg-white/5 hover:text-gray-200' : 'text-gray-600 hover:bg-black/5 hover:text-gray-900',
      finishedPulse: getStyle('longBreak', 'pulse')
    },
  };

  const currentMode = MODES[modeId];

  const globalStyles = {
    cardBg: isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white/70 border-white/20',
    toggleBg: isDark ? 'bg-black/20' : 'bg-black/5',
    resetBtn: isDark ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 border-zinc-700' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-100',
    dangerBtn: isDark ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white',
    topBtn: isDark ? 'bg-white/10 hover:bg-white/20 text-gray-200' : 'bg-white/50 hover:bg-white/80 text-gray-700',
    modalBg: isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-white/20',
    modalText: isDark ? 'text-gray-100' : 'text-gray-800',
    modalLabel: isDark ? 'text-gray-300' : 'text-gray-700',
    modalInput: isDark ? 'bg-zinc-800 text-gray-200' : 'bg-gray-100 text-gray-900',
    modalSaveBtn: isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-black',
  };

  const handleFinished = useCallback(() => {
    setIsFinished(true);

    const audio = new Audio('/sounds/notification.mp3');
    audio.play().catch(e => console.warn('Notification sound failed:', e));

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Time is up! 🎉", {
        body: "It's time to switch modes and focus on the next step.",
        icon: '/favicon.svg'
      });
    }
  }, []);

  useEffect(() => {
    if (isFinished) {
      const timer = setTimeout(() => {
        setModeId(prev => {
          if (prev === 'focus') return 'shortBreak';
          if (prev === 'shortBreak') return 'focus';
          return prev;
        });
      }, 3500); // 3.5s delay to keep celebration visible
      return () => clearTimeout(timer);
    }
  }, [isFinished]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      handleFinished();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, handleFinished]);

  useEffect(() => {
    setTimeLeft(currentMode.minutes * 60);
    setIsActive(false);
    setIsFinished(false);
  }, [modeId]);

  const switchMode = (id) => setModeId(id);

  const toggleTimer = () => {
    // Solicita permissão para notificações na primeira interação do usuário com o timer
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Toca o som de início apenas se estivermos ligando o timer
    if (!isActive) {
      const audio = new Audio('/sounds/start.mp3');
      audio.play().catch(e => console.warn('Start sound failed:', e));
    }

    if (isFinished) {
      resetTimer();
      setIsActive(true);
    } else {
      setIsActive(!isActive);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(currentMode.minutes * 60);
    setIsFinished(false);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSaveSettings = () => {
    const newSettings = {
      ...settings,
      colorPreset: tempColorPreset,
      durations: {
        focus: Math.max(1, parseInt(tempDurations.focus)),
        shortBreak: Math.max(1, parseInt(tempDurations.shortBreak)),
        longBreak: Math.max(1, parseInt(tempDurations.longBreak))
      }
    };
    setSettings(newSettings);
    localStorage.setItem('pomodoroSettings', JSON.stringify(newSettings));
    setShowSettings(false);
    setTimeLeft(newSettings.durations[modeId] * 60);
    setIsActive(false);
    setIsFinished(false);
  };

  const toggleTheme = () => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
    const newSettings = { ...settings, theme: newTheme };
    setSettings(newSettings);
    localStorage.setItem('pomodoroSettings', JSON.stringify(newSettings));
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-700 ease-in-out ${currentMode.bg}`}>

      <TopBar
        settings={settings}
        toggleTheme={toggleTheme}
        setShowSettings={setShowSettings}
        globalStyles={globalStyles}
      />

      <div className={`max-w-md w-full p-8 sm:p-10 backdrop-blur-lg rounded-3xl shadow-xl flex flex-col items-center border transition-colors duration-500 ${globalStyles.cardBg}`}>

        <ModeSelector
          modes={MODES}
          modeId={modeId}
          switchMode={switchMode}
          globalStyles={globalStyles}
        />

        <TimerDisplay
          timeLeft={timeLeft}
          isFinished={isFinished}
          currentMode={currentMode}
          formatTime={formatTime}
        />

        <TimerControls
          isActive={isActive}
          isFinished={isFinished}
          toggleTimer={toggleTimer}
          resetTimer={resetTimer}
          currentMode={currentMode}
          globalStyles={globalStyles}
        />

        <WhiteNoiseControls
          globalStyles={globalStyles}
          isDark={isDark}
        />

        <div className={`mt-6 text-sm font-medium transition-opacity duration-300 ${isFinished ? `opacity-100 animate-bounce ${currentMode.finishedPulse}` : 'opacity-0'}`}>
          {currentMode.name} session completed! 🎉
        </div>

      </div>

      <SettingsModal
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        isDark={isDark}
        globalStyles={globalStyles}
        tempColorPreset={tempColorPreset}
        setTempColorPreset={setTempColorPreset}
        tempDurations={tempDurations}
        setTempDurations={setTempDurations}
        handleSaveSettings={handleSaveSettings}
      />
    </div>
  );
}
