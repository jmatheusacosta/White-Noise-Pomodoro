import { COLOR_SCHEMAS } from '../config/constants';

export function SettingsModal({
  showSettings, 
  setShowSettings,
  isDark, 
  globalStyles, 
  tempColorPreset, 
  setTempColorPreset, 
  tempDurations, 
  setTempDurations, 
  handleSaveSettings
}) {
  if (!showSettings) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div className={`rounded-3xl p-8 max-w-sm w-full shadow-2xl border transition-colors duration-300 ${globalStyles.modalBg}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${globalStyles.modalText}`}>Settings</h2>
          <button
            onClick={() => setShowSettings(false)}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Themes dropdown */}
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Color Schema</h3>
            <select
              value={tempColorPreset}
              onChange={(e) => setTempColorPreset(e.target.value)}
              className={`w-full p-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none transition-colors appearance-none font-medium ${globalStyles.modalInput}`}
            >
              {Object.entries(COLOR_SCHEMAS).map(([key, schemaData]) => (
                <option key={key} value={key}>{schemaData.name}</option>
              ))}
            </select>
          </div>

          {/* Durations */}
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Durations (minutes)</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className={`font-medium ${globalStyles.modalLabel}`}>Focus</label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={tempDurations.focus}
                  onChange={(e) => setTempDurations({ ...tempDurations, focus: e.target.value })}
                  className={`w-20 p-2 text-center rounded-lg border-none focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${globalStyles.modalInput}`}
                />
              </div>

              <div className="flex justify-between items-center">
                <label className={`font-medium ${globalStyles.modalLabel}`}>Short Break</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={tempDurations.shortBreak}
                  onChange={(e) => setTempDurations({ ...tempDurations, shortBreak: e.target.value })}
                  className={`w-20 p-2 text-center rounded-lg border-none focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${globalStyles.modalInput}`}
                />
              </div>

              <div className="flex justify-between items-center">
                <label className={`font-medium ${globalStyles.modalLabel}`}>Long Break</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={tempDurations.longBreak}
                  onChange={(e) => setTempDurations({ ...tempDurations, longBreak: e.target.value })}
                  className={`w-20 p-2 text-center rounded-lg border-none focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${globalStyles.modalInput}`}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSaveSettings}
            className={`w-full py-4 rounded-xl font-semibold text-lg shadow-md transform transition-all active:scale-95 mt-2 ${globalStyles.modalSaveBtn}`}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
