import { useEffect } from 'react';
import ShortcutManager from '../utils/shortcutManager';

const useShortcut = (
  os: 'mac' | 'windows' | 'other',
  keys: string[],
  action: () => void
) => {
  useEffect(() => {
    const manager = new ShortcutManager(os);
    manager.registerShortcut(keys, action);

    return () => {
      manager.unregisterShortcut(keys);
    };
  }, [os, keys, action]);
};

export default useShortcut;