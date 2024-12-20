'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPreview, setHideMockup, setHideBackground } from '../../redux/slices/dockSlice';
import { RootState } from '../../redux/store';
import { detectOS } from '../../utils/osDetection';
import useShortcut from '../../hooks/useShortcut';
import styles from './styles.module.scss';
import Icon from '../Icon';
import { ChevronLeft, Maximize2, Undo2, Redo2, EqualNot, SquareDashed } from 'lucide-react';
import Link from 'next/link';

const Docks: React.FC = () => {
  const os = detectOS();
  const dispatch = useDispatch();
  const { preview, hideMockup, hideBackground } = useSelector((state: RootState) => state.dock);

  // Shortcut actions
  const handleHideMockup = () => dispatch(setHideMockup(!hideMockup.isMockupHide));
  const handleHideBackground = () => dispatch(setHideBackground(!hideBackground.isBackgroundHide));
  const handleUndo = () => console.log('Undo action triggered');
  const handleRedo = () => console.log('Redo action triggered');
  const handlePreview = () => dispatch(setPreview(!preview.isPreview));

  // Register shortcuts
  useShortcut(os, ['Meta', 'Shift', 'm'], handleHideMockup);
  useShortcut(os, ['Meta', 'Shift', 'b'], handleHideBackground);
  useShortcut(os, ['Meta', 'z'], handleUndo);
  useShortcut(os, ['Meta', 'Shift', 'z'], handleRedo);
  useShortcut(os, ['Meta', 'p'], handlePreview);
  

  return (
    <div className={styles.dock}>
      <div className={styles.dock_back}>
        <Link href="/">
          <Icon
            icon={ChevronLeft}
            color="#EFEFEF"
            size={20}
            strokeWidth={1}
            tipTitle="Back"
            tipPosition="right"
          />
        </Link>
      </div>
      <div className={styles.dock_other}>
        {!preview.isPreview && (
          <>
            <Icon
              icon={EqualNot}
              color="#EFEFEF"
              size={20}
              strokeWidth={1}
              tipTitle={
                os === 'mac' 
                  ? !hideMockup.isMockupHide ? 'Hide Mockup (Cmd + Shift + M)' : 'Unhide Mockup (Cmd + Shift + M)'
                  : !hideMockup.isMockupHide ? 'Hide Mockup (Ctrl + Shift + M)' : 'Unhide Mockup (Ctrl + Shift +M)'
              }
              tipPosition="right"
              onClick={handleHideMockup}
            />
            <Icon
              icon={SquareDashed}
              color="#EFEFEF"
              size={20}
              strokeWidth={1}
              tipTitle={
                os === 'mac' 
                  ? !hideBackground.isBackgroundHide ? 'Hide Background (Cmd + Shift + B)' : 'Unhide Background (Cmd + Shift + B)'
                  : !hideBackground.isBackgroundHide ? 'Hide Background (Ctrl + Shift + B)' : 'Unhide Background (Ctrl + Shift + B)'
              }
              tipPosition="right"
              onClick={handleHideBackground}
            />
            <Icon
              icon={Undo2}
              color="#EFEFEF"
              size={20}
              strokeWidth={1}
              tipTitle={os === 'mac' ? 'Undo (Cmd + Z)' : 'Undo (Ctrl + Z)'}
              tipPosition="right"
              onClick={handleUndo}
            />
            <Icon
              icon={Redo2}
              color="#EFEFEF"
              size={20}
              strokeWidth={1}
              tipTitle={os === 'mac' ? 'Redo (Cmd + Shift + Z)' : 'Redo (Ctrl + Shift + Z)'}
              tipPosition="right"
              onClick={handleRedo}
            />
          </>
        )}
        <Icon
          icon={Maximize2}
          color="#EFEFEF"
          size={20}
          strokeWidth={1}
          tipTitle={
            os === 'mac' 
              ? !preview.isPreview ? 'Preview (Cmd + P)' : 'Unview (Cmd + P)'
              : !preview.isPreview ? 'Preview (Ctrl + P)' : 'Unview (Ctrl + P)'
          }
          tipPosition="right"
          onClick={handlePreview}
        />
      </div>
    </div>
  );
};

export default Docks;
