export const DEFAULT_SETTINGS = {
  durations: {
    focus: 25,
    shortBreak: 5,
    longBreak: 15
  },
  theme: 'dark', // 'dark' | 'light'
  colorPreset: 'pastel' // 'pastel' | 'ocean' | 'nature'
};

export const COLOR_SCHEMAS = {
  pastel: {
    name: 'Pastel (Default)',
    focus: {
      light: { bg: 'bg-rose-50', text: 'text-rose-900', btn: 'bg-rose-500 hover:bg-rose-600 text-white', tabActive: 'bg-rose-200 text-rose-900', pulse: 'text-rose-500 shadow-rose-500/30' },
      dark: { bg: 'bg-zinc-950', text: 'text-rose-300', btn: 'bg-rose-600 hover:bg-rose-500 text-white', tabActive: 'bg-rose-900/50 text-rose-300', pulse: 'text-rose-400 shadow-rose-500/30' }
    },
    shortBreak: {
      light: { bg: 'bg-teal-50', text: 'text-teal-900', btn: 'bg-teal-500 hover:bg-teal-600 text-white', tabActive: 'bg-teal-200 text-teal-900', pulse: 'text-teal-500 shadow-teal-500/30' },
      dark: { bg: 'bg-zinc-950', text: 'text-teal-300', btn: 'bg-teal-600 hover:bg-teal-500 text-white', tabActive: 'bg-teal-900/50 text-teal-300', pulse: 'text-teal-400 shadow-teal-500/30' }
    },
    longBreak: {
      light: { bg: 'bg-sky-50', text: 'text-sky-900', btn: 'bg-sky-500 hover:bg-sky-600 text-white', tabActive: 'bg-sky-200 text-sky-900', pulse: 'text-sky-500 shadow-sky-500/30' },
      dark: { bg: 'bg-zinc-950', text: 'text-sky-300', btn: 'bg-sky-600 hover:bg-sky-500 text-white', tabActive: 'bg-sky-900/50 text-sky-300', pulse: 'text-sky-400 shadow-sky-500/30' }
    }
  },
  ocean: {
    name: 'Ocean Deep',
    focus: {
      light: { bg: 'bg-blue-50', text: 'text-blue-900', btn: 'bg-blue-600 hover:bg-blue-700 text-white', tabActive: 'bg-blue-200 text-blue-900', pulse: 'text-blue-600 shadow-blue-500/30' },
      dark: { bg: 'bg-slate-950', text: 'text-blue-300', btn: 'bg-blue-700 hover:bg-blue-600 text-white', tabActive: 'bg-blue-900/50 text-blue-300', pulse: 'text-blue-400 shadow-blue-500/30' }
    },
    shortBreak: {
      light: { bg: 'bg-cyan-50', text: 'text-cyan-900', btn: 'bg-cyan-500 hover:bg-cyan-600 text-white', tabActive: 'bg-cyan-200 text-cyan-900', pulse: 'text-cyan-500 shadow-cyan-500/30' },
      dark: { bg: 'bg-slate-950', text: 'text-cyan-300', btn: 'bg-cyan-700 hover:bg-cyan-600 text-white', tabActive: 'bg-cyan-900/50 text-cyan-300', pulse: 'text-cyan-400 shadow-cyan-500/30' }
    },
    longBreak: {
      light: { bg: 'bg-indigo-50', text: 'text-indigo-900', btn: 'bg-indigo-500 hover:bg-indigo-600 text-white', tabActive: 'bg-indigo-200 text-indigo-900', pulse: 'text-indigo-500 shadow-indigo-500/30' },
      dark: { bg: 'bg-slate-950', text: 'text-indigo-300', btn: 'bg-indigo-700 hover:bg-indigo-600 text-white', tabActive: 'bg-indigo-900/50 text-indigo-300', pulse: 'text-indigo-400 shadow-indigo-500/30' }
    }
  },
  nature: {
    name: 'Nature Greens',
    focus: {
      light: { bg: 'bg-green-50', text: 'text-green-900', btn: 'bg-green-600 hover:bg-green-700 text-white', tabActive: 'bg-green-200 text-green-900', pulse: 'text-green-600 shadow-green-500/30' },
      dark: { bg: 'bg-stone-950', text: 'text-green-300', btn: 'bg-green-700 hover:bg-green-600 text-white', tabActive: 'bg-green-900/50 text-green-300', pulse: 'text-green-400 shadow-green-500/30' }
    },
    shortBreak: {
      light: { bg: 'bg-emerald-50', text: 'text-emerald-900', btn: 'bg-emerald-500 hover:bg-emerald-600 text-white', tabActive: 'bg-emerald-200 text-emerald-900', pulse: 'text-emerald-500 shadow-emerald-500/30' },
      dark: { bg: 'bg-stone-950', text: 'text-emerald-300', btn: 'bg-emerald-700 hover:bg-emerald-600 text-white', tabActive: 'bg-emerald-900/50 text-emerald-300', pulse: 'text-emerald-400 shadow-emerald-500/30' }
    },
    longBreak: {
      light: { bg: 'bg-lime-50', text: 'text-lime-900', btn: 'bg-lime-600 hover:bg-lime-700 text-white', tabActive: 'bg-lime-200 text-lime-900', pulse: 'text-lime-600 shadow-lime-500/30' },
      dark: { bg: 'bg-stone-950', text: 'text-lime-300', btn: 'bg-lime-700 hover:bg-lime-600 text-white', tabActive: 'bg-lime-900/50 text-lime-300', pulse: 'text-lime-400 shadow-lime-500/30' }
    }
  }
};
