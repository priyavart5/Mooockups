export const detectOS = (): 'mac' | 'windows' | 'other' => {
    if (typeof window === 'undefined') {
      return 'other';
    }
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('mac')) return 'mac';
    if (platform.includes('win')) return 'windows';
    return 'other';
};
  