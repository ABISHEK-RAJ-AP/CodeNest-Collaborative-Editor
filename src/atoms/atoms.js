import { atom } from 'recoil';

// Helper to sync state with localStorage
const localStorageEffect = (key) => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  });
};

// Atom for language selection
export const language = atom({
  key: 'language', // Unique ID for the atom
  default: 'javascript', // Default value
  effects_UNSTABLE: [localStorageEffect('language')], // Sync with localStorage
});

// Atom for theme selection
export const cmtheme = atom({
  key: 'cmtheme', // Unique ID for the atom
  default: 'monokai', // Default value
  effects_UNSTABLE: [localStorageEffect('cmtheme')], // Sync with localStorage
});
