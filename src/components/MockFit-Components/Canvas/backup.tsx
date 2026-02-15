import React, { forwardRef, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
// import Image from 'next/image';
import styles from './styles.module.scss';
import { Canvas as ThreeCanvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Demo from '../../Demo';

const Canvas = forwardRef<HTMLDivElement>((_, ref) => {
  const { selectedMockup, importFile } = useSelector((state: RootState) => state.mockFit.present);
  const { selectedMockup } = useSelector((state: RootState) => state.mockFit.present);
  const mockupRef = useRef<HTMLImageElement>(null);
  const [mockupDimensions, setMockupDimensions] = useState({ width: 0, height: 0 });

  console.log(mockupDimensions)

  // Transformation state
  // const [transform, setTransform] = useState({
  //   rotate: 0,
  //   scaleX: 0.36,
  //   scaleY: 0.4,
  //   skewX: 1.9,
  //   skewY: -1.3,
  //   translateX: 0.4,
  //   translateY: -93.6,
  // });

  useEffect(() => {
    if (mockupRef.current) {
      const { width, height } = mockupRef.current.getBoundingClientRect();
      setMockupDimensions({ width, height });
    }
  }, [selectedMockup.mockupSrc]);

  // Update transform state
  // const handleTransformChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setTransform((prev) => ({
  //     ...prev,
  //     [name]: parseFloat(value),
  //   }));
  // };

  // const transformStyle = {
  //   transform: `
  //     translate(${transform.translateX}px, ${transform.translateY}px)
  //     rotate(${transform.rotate}deg)
  //     scale(${transform.scaleX}, ${transform.scaleY})
  //     skew(${transform.skewX}deg, ${transform.skewY}deg)
  //   `,
  // };


  return (
    <div className={styles.canvas}>
      <div className={styles.canvasSafeArea}>
        <div className={styles.previewframe} style={{ aspectRatio: 1000 / 1500 }}>
          <div className={styles.frameContent} ref={ref}>

            <ThreeCanvas camera={{ position: [0, 90, 0], fov: 1}}>
              <Environment preset='warehouse' />
              <axesHelper args={[5]} />
              <OrbitControls /> 
              <Demo />
            </ThreeCanvas>



            
            {/* SelectedMockup Image */}
            {/* <Image
              className={styles.SelectedMockup}
              src={selectedMockup.mockupSrc}
              alt={selectedMockup.mockupName}
              fill
              ref={mockupRef}
            /> */}

            {/* Imported Image */}
            {/* {importFile.file && (
              <div
                className={styles.importedImageContainer}
                style={{
                  width: `100%`,
                  height: `100%`,
                  ...transformStyle,
                }}
              >
                <Image
                  className={styles.importedImage}
                  src={importFile.file}
                  alt={importFile.fileName}
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/* Sliders for Transformation */}
        {/* <div className={styles.sliders}>
          <div>
            <label>Rotate: {transform.rotate}°</label>
            <input
              type="range"
              name="rotate"
              min="-180"
              max="180"
              step="1"
              value={transform.rotate}
              onChange={handleTransformChange}
            />
            <input
              type="number"
              name="rotate"
              value={transform.rotate}
              onChange={handleTransformChange}
            />
          </div>
          <div>
            <label>ScaleX: {transform.scaleX}</label>
            <input
              type="range"
              name="scaleX"
              min="0.1"
              max="3"
              step="0.01"
              value={transform.scaleX}
              onChange={handleTransformChange}
            />
            <input
              type="number"
              name="scaleX"
              step="0.01"
              value={transform.scaleX}
              onChange={handleTransformChange}
            />
          </div>
          <div>
            <label>ScaleY: {transform.scaleY}</label>
            <input
              type="range"
              name="scaleY"
              min="0.1"
              max="3"
              step="0.01"
              value={transform.scaleY}
              onChange={handleTransformChange}
            />
            <input
              type="number"
              name="scaleY"
              step="0.01"
              value={transform.scaleY}
              onChange={handleTransformChange}
            />
          </div>
          <div>
            <label>SkewX: {transform.skewX}°</label>
            <input
              type="range"
              name="skewX"
              min="-50"
              max="50"
              step="0.1"
              value={transform.skewX}
              onChange={handleTransformChange}
            />
            <input
              type="number"
              name="skewX"
              step="0.1"
              value={transform.skewX}
              onChange={handleTransformChange}
            />
          </div>
          <div>
            <label>SkewY: {transform.skewY}°</label>
            <input
              type="range"
              name="skewY"
              min="-50"
              max="50"
              step="0.1"
              value={transform.skewY}
              onChange={handleTransformChange}
            />
            <input
              type="number"
              name="skewY"
              step="0.1"
              value={transform.skewY}
              onChange={handleTransformChange}
            />
          </div>
          <div>
            <label>TranslateX: {transform.translateX}px</label>
            <input
              type="range"
              name="translateX"
              min="-200"
              max="200"
              step="0.1"
              value={transform.translateX}
              onChange={handleTransformChange}
            />
            <input
              type="number"
              name="translateX"
              step="0.1"
              value={transform.translateX}
              onChange={handleTransformChange}
            />
          </div>
          <div>
            <label>TranslateY: {transform.translateY}px</label>
            <input
              type="range"
              name="translateY"
              min="-200"
              max="200"
              step="0.1"
              value={transform.translateY}
              onChange={handleTransformChange}
            />
            <input
              type="number"
              name="translateY"
              step="0.1"
              value={transform.translateY}
              onChange={handleTransformChange}
            />
          </div>
        </div> */}
    </div>
  );
});

Canvas.displayName = 'Canvas';
export default Canvas;
