export function TimerDisplay({ timeLeft, isFinished, currentMode, formatTime }) {
  return (
    <div
      className={`
        text-[5.5rem] sm:text-8xl font-black tracking-tighter mb-10 tabular-nums 
        transition-all duration-500 select-none
        ${isFinished ? `scale-110 animate-pulse drop-shadow-md ${currentMode.finishedPulse}` : currentMode.text}
      `}
    >
      {formatTime(timeLeft)}
    </div>
  );
}
