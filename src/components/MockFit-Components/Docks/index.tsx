'use client';

import React from 'react';

//Importing Redux 
import { useDispatch, useSelector } from 'react-redux';
import { undo, redo } from '@/redux/undoRedo';
import { RootState } from '../../../redux/store';
import { setPreview } from '@/redux/mockFit-slices/mockFitSlice';

import { detectOS } from '../../../utils/osDetection';
import useShortcut from '../../../hooks/useShortcut';
import styles from './styles.module.scss';
import Icon from '../Icon';
import { ChevronLeft, Maximize2, Undo2, Redo2 } from 'lucide-react';
import Link from 'next/link';

const Docks: React.FC = () => {
  const os = detectOS();
  const dispatch = useDispatch();

  const { preview } = useSelector((state: RootState) => state.mockFit.present);

  // Shortcut actions
  const handleUndo = () => dispatch(undo());
  const handleRedo = () => dispatch(redo());
  const handlePreview = () => dispatch(setPreview(!preview));

  // Register shortcuts
  useShortcut(os, [os === 'mac' ? 'Meta' : 'Control', 'z'], handleUndo);
  useShortcut(os, [os === 'mac' ? 'Meta' : 'Control', 'Shift', 'Z'], handleRedo);
  useShortcut(os, [os === 'mac' ? 'Meta' : 'Control', 'p'], handlePreview);

  

  return (
    <div className={styles.dock}>
      <div className={styles.dock_back}>
        <Link href="/MockFit">
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
        {!preview && (
          <>
            <Icon
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
            />
          </>
        )}
        <Icon
          icon={Maximize2}
          color="#EFEFEF"
          size={20}
          strokeWidth={1}
          tipTitle={ !preview ? 'Preview (Ctrl + P)' : 'Unview (Ctrl + P)'}
          tipPosition="right"
          onClick={handlePreview}
        />
      </div>
    </div>
  );
};

export default Docks;
