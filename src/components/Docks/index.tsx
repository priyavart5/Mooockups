'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPreview, setHideMockup, setHideBackground } from '../../redux/slices/dockSlice';
import { RootState } from '../../redux/store';
import { detectOS } from '../../utils/osDetection';
import useShortcut from '../../hooks/useShortcut';
import styles from './styles.module.scss';
import Icon from '../Icon';
import { ChevronLeft, Maximize2, EqualNot, SquareDashed } from 'lucide-react';
import Link from 'next/link';

const Docks: React.FC = () => {
  const os = detectOS();
  const dispatch = useDispatch();
  const { preview, hideMockup, hideBackground } = useSelector((state: RootState) => state.dock);

  // Shortcut actions
  const handleHideMockup = () => dispatch(setHideMockup(!hideMockup.isMockupHide));
  const handleHideBackground = () => dispatch(setHideBackground(!hideBackground.isBackgroundHide));
  // const handleUndo = () => console.log('Undo action triggered');
  // const handleRedo = () => console.log('Redo action triggered');
  const handlePreview = () => dispatch(setPreview(!preview.isPreview));

  // Register shortcuts
  useShortcut(os, [os === 'mac' ? 'Meta' : 'Control', 'Shift', 'M'], handleHideMockup);
  useShortcut(os, [os === 'mac' ? 'Meta' : 'Control', 'Shift', 'B'], handleHideBackground);
  // useShortcut(os, [os === 'mac' ? 'Meta' : 'Control', 'z'], handleUndo);
  // useShortcut(os, [os === 'mac' ? 'Meta' : 'Control', 'Shift', 'Z'], handleRedo);
  useShortcut(os, [os === 'mac' ? 'Meta' : 'Control', 'p'], handlePreview);

  

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
              tipTitle={ !hideMockup.isMockupHide ? 'Hide Mockup (Ctrl + Shift + M)' : 'Unhide Mockup (Ctrl + Shift + M)'}
              tipPosition="right"
              onClick={handleHideMockup}
            />
            <Icon
              icon={SquareDashed}
              color="#EFEFEF"
              size={20}
              strokeWidth={1}
              tipTitle={ !hideBackground.isBackgroundHide ? 'Hide Background (Ctrl + Shift + B)' : 'Unhide Background (Ctrl + Shift + B)'}
              tipPosition="right"
              onClick={handleHideBackground}
            />
            {/* <Icon
              icon={Undo2}
              color="#EFEFEF"
              size={20}
              strokeWidth={1}
              tipTitle='Undo (Ctrl + Z)'
              tipPosition="right"
              onClick={handleUndo}
            />
            <Icon
              icon={Redo2}
              color="#EFEFEF"
              size={20}
              strokeWidth={1}
              tipTitle='Redo (Ctrl + Shift + Z)'
              tipPosition="right"
              onClick={handleRedo}
            /> */}
          </>
        )}
        <Icon
          icon={Maximize2}
          color="#EFEFEF"
          size={20}
          strokeWidth={1}
          tipTitle={ !preview.isPreview ? 'Preview (Ctrl + P)' : 'Unview (Ctrl + P)'}
          tipPosition="right"
          onClick={handlePreview}
        />
      </div>
    </div>
  );
};

export default Docks;
