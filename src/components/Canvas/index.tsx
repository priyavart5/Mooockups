'use client';

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setFile } from '../../redux/slices/importSlice';
import styles from './styles.module.scss';
import Image from 'next/image';

const Canvas = () => {
  const dispatch = useDispatch();

  const { file, fileName, width, height } = useSelector((state: RootState) => state.import);
  // const { gradientSrc } = useSelector((state: RootState) => state.mockLab.frameGradient);
  // const { shadowSrc } = useSelector((state: RootState) => state.mockLab.frameShadow);
  // const { shadeSrc } = useSelector((state: RootState) => state.mockLab.mockupShade);
  // const { backgroundSrc } = useSelector((state: RootState) => state.mockLab.frameBackground);
  // const { color } = useSelector((state: RootState) => state.mockLab.frameSolidColor);


  const handleFileUpload = useCallback((file: File) => {
    const reader = new FileReader();
    const HTMLImage = new window.Image(); // Use browser's Image API

    reader.onload = () => {
      HTMLImage.onload = () => {
        const fileWidth = HTMLImage.width;
        const fileHeight = HTMLImage.height;

        // Dispatch state updates to Redux
        dispatch(setFile({
          file: reader.result as string,
          fileName: file.name,
          width: fileWidth,
          height: fileHeight,
        }));
      };
      HTMLImage.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  }, [dispatch]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFileUpload(droppedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  if (!file) {
    return (
      <div
        className={styles.noFile}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        Drag & Drop an image here or Upload a file.
      </div>
    );
  }

  return (
    <div
      className={styles.canvas}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Image
        src={file}
        alt={fileName || "Imported image"}
        className={styles.image}
        style={{
          aspectRatio: width && height ? `${width} / ${height}` : undefined,
        }}
        width={width || 500}
        height={height || 300}
      />
    </div>
  );
};

export default Canvas;
