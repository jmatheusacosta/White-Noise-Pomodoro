export function TimerControls({ isActive, isFinished, toggleTimer, resetTimer, currentMode, globalStyles }) {
  return (
    <div className="flex w-full space-x-4 justify-center">
      <button
        onClick={toggleTimer}
        className={`
          flex-1 max-w-[140px] py-4 rounded-2xl font-black uppercase tracking-wider text-lg shadow-lg 
          transform transition-all active:scale-95 duration-200
          ${isFinished ? globalStyles.dangerBtn : currentMode.btnActive}
        `}
      >
        {isActive ? 'Pause' : isFinished ? 'Restart' : 'Start'}
      </button>

      <button
        onClick={resetTimer}
        className={`flex-1 max-w-[140px] py-4 rounded-2xl font-extrabold uppercase tracking-wider text-lg border transform transition-all active:scale-95 duration-200 shadow-md ${globalStyles.resetBtn}`}
      >
        Reset
      </button>
    </div>
  );
}
