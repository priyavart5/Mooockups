'use client';

import dynamic from 'next/dynamic';
import { useRef, useState, useEffect } from 'react';
import styles from './styles.module.scss';

import Canvas from '@/components/MockFit-Components/Canvas';
const Docks = dynamic(() => import('@/components/MockFit-Components/Docks'), { ssr: false });
import Import from '@/components/MockFit-Components/Import';
const Export = dynamic(() => import('@/components/MockFit-Components/Export'), { ssr: false });
import EditorBox from '@/components/MockFit-Components/MockFit EditorBox';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const MockFitEditor = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const { preview } = useSelector((state: RootState) => state.mockFit.present);
  // const { selectedMockup } = useSelector((state: RootState) => state.mockFit);
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

  // if(!selectedMockup.isMockupSelected){
  //   return <p>Please Select A Mockup.</p>
  // }

  return (
    <>
      {isMobile ? (
        <div className={styles.mockFit_mobileMessage}>
          <iframe style={{ outline: 'none', border: 'none'}} src="https://lottie.host/embed/776e4db4-2371-48ea-bca3-4efd957046cd/lSZryUsJjL.lottie"></iframe>
          <p>Please open the application on a tablet or desktop for the best experience.</p>
        </div>
      ) : (
        <>
          <div className={styles.mockFit}>
            <div className={styles.mockFit_dock}>
              <Docks />
            </div>
            <div className={styles.mockFit_canvas}>
              <Canvas ref={canvasRef} />
            </div>
            {!preview && (
              <>
                <div className={styles.mockFit_toolBox}>
                  <div className={styles.mockFit_toolBox_import_editor}>
                    <Import />
                    <EditorBox />
                  </div>
                  <Export canvasRef={canvasRef} />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MockFitEditor;
