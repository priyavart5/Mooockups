'use client';

import dynamic from 'next/dynamic';
import { useRef, useState, useEffect } from 'react';
import styles from './styles.module.scss';

import Canvas from '../../components/MockLab-Components/Canvas';
const Docks = dynamic(() => import('../../components/MockLab-Components/Docks'), { ssr: false });
import Import from '../../components/MockLab-Components/Import';
const Export = dynamic(() => import('../../components/MockLab-Components/Export'), { ssr: false });
import EditorBox from '../../components/MockLab-Components/MockLab EditorBox';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const MockLab = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const { preview } = useSelector((state: RootState) => state.dock);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen width
  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);

    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <div className={styles.mockLab_mobileMessage}>
          <iframe style={{ outline: 'none', border: 'none'}} src="https://lottie.host/embed/776e4db4-2371-48ea-bca3-4efd957046cd/lSZryUsJjL.lottie"></iframe>
          <p>Please open the application on a tablet or desktop for the best experience.</p>
        </div>
      ) : (
        <>
          <div className={styles.mockLab}>
            <div className={styles.mockLab_dock}>
              <Docks />
            </div>
            <div className={styles.mockLab_canvas}>
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
        </>
      )}
    </>
  );
};

export default MockLab;
