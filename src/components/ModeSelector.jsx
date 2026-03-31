export function ModeSelector({ modes, modeId, switchMode, globalStyles }) {
  return (
    <div className={`flex space-x-1 sm:space-x-2 mb-10 p-1.5 rounded-full transition-colors duration-500 ${globalStyles.toggleBg}`}>
      {Object.entries(modes).map(([id, m]) => {
        const isCurrent = modeId === id;
        return (
          <button
            key={id}
            onClick={() => switchMode(id)}
            className={`px-5 py-2.5 rounded-full text-sm font-extrabold uppercase tracking-tight transition-all duration-300 ${isCurrent
                ? `${m.tabActive} shadow-sm scale-105`
                : m.tabInactive
              }`}
          >
            {m.name}
          </button>
        );
      })}
    </div>
  );
}
