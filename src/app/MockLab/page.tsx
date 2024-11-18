'use client'

import Canvas from '../../components/Canvas';
import Docks from '../../components/Docks';
import Import from '../../components/Import';
import Export from '../../components/Export';
import styles from  './styles.module.scss';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const MockLab = () => {

  const isPreview = useSelector((state: RootState) => state.preview.isPreview);

  return (
    <div className={styles.mockLab}>
      <div className={styles.mockLab_dock}>
        <Docks />
      </div>
      <div className={styles.mockLab_canvas}>
        <Canvas />
      </div>
      {!isPreview && (
        <div className={styles.mockLab_toolBox}>
          <Import />
          <Export />
        </div>
      )}
    </div>
  );
}

export default MockLab;
