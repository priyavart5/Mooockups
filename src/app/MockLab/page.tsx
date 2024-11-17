'use client'

import Import from '../../components/Import';
import styles from  './styles.module.scss';

export default function Home() {
  return (
    <div className={styles.mockLab}>
      <div className={styles.mockLab_viewer}>
        
      </div>
      <div className={styles.mockLab_toolBox}>
        <Import />
      </div>
    </div>
  );
}
