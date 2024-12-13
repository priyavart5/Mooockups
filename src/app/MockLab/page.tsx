'use client'

import {useRef} from 'react';
import styles from  './styles.module.scss';

import Canvas from '../../components/Canvas';
import Docks from '../../components/Docks';
import Import from '../../components/Import';
import Export from '../../components/Export';
import EditorBox from '../../components/MockLab EditorBox';


import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const MockLab = () => {

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const isPreview = useSelector((state: RootState) => state.preview.isPreview);

  return (
    <div className={styles.mockLab}>
      <div className={styles.mockLab_dock}>
        <Docks />
      </div>
      <div className={styles.mockLab_canvas}>
        <Canvas ref={canvasRef} />
      </div>
      {!isPreview && (
        <div className={styles.mockLab_toolBox}>
          <Import />
          <EditorBox />
          <Export canvasRef={canvasRef} />
        </div>
      )}
    </div>
  );
}

export default MockLab;
