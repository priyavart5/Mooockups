'use client'

import styles from  './styles.module.scss';

import Canvas from '../../components/Canvas';
import Docks from '../../components/Docks';
import Import from '../../components/Import';
import Export from '../../components/Export';
import EditorBox from '../../components/MockLab EditorBox';


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
          <EditorBox />
          <Export />
        </div>
      )}
    </div>
  );
}

export default MockLab;
