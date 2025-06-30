import { useState, useEffect } from 'react';

export function useElectronStore(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.store.get(key, defaultValue).then(setValue);
    }
  }, [key, defaultValue]);

  const updateValue = async (newValue) => {
    setValue(newValue);
    if (window.electronAPI) {
      await window.electronAPI.store.set(key, newValue);
    }
  };

  return [value, updateValue];
} 