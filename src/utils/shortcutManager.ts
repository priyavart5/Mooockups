type ShortcutAction = () => void;

class ShortcutManager {
  private shortcuts: Map<string, ShortcutAction> = new Map();
  private os: 'mac' | 'windows' | 'other';

  constructor(os: 'mac' | 'windows' | 'other') {
    this.os = os;
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  private getMetaKey(): string {
    return this.os === 'mac' ? 'Meta' : 'Control';
  }

  registerShortcut(keys: string[], action: ShortcutAction) {
    const keyCombo = keys.sort().join('+');
    this.shortcuts.set(keyCombo, action);
  }

  unregisterShortcut(keys: string[]) {
    const keyCombo = keys.sort().join('+');
    this.shortcuts.delete(keyCombo);
  }

  private handleKeyDown(event: KeyboardEvent) {
    const activeKeys: string[] = [];
    
    if (event.metaKey || event.ctrlKey) activeKeys.push(this.getMetaKey());
    if (event.shiftKey) activeKeys.push('Shift');
    if (event.key) activeKeys.push(event.key);
    const keyCombo = activeKeys.sort().join('+');
    const action = this.shortcuts.get(keyCombo);

    if (action) {
      event.preventDefault();
      action();
    }
  }
  
}

export default ShortcutManager;
