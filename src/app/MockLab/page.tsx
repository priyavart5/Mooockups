'use client'

import dynamic from 'next/dynamic';
import {useRef} from 'react';
import styles from  './styles.module.scss';

import Canvas from '../../components/Canvas';
const Docks = dynamic(() => import('../../components/Docks'), { ssr: false });
import Import from '../../components/Import';
const Export = dynamic(() => import('../../components/Export'), { ssr: false });
import EditorBox from '../../components/MockLab EditorBox';


import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const MockLab = () => {

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const { preview } = useSelector((state: RootState) => state.dock);

  return (
    <div className={styles.mockLab}>
      <div className={styles.mockLab_dock}>
        <Docks />
      </div>
      <div className={styles.mockLab_canvas} >
        <Canvas ref={canvasRef} />
      </div>
      {!preview.isPreview && (
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
