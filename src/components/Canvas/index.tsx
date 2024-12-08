import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { RootState } from '../../redux/store';
import styles from './styles.module.scss';

const Canvas = () => {
  // Fetch Mockup states
  const {
    mockupLayoutSource,
    mockupScale,
    mockupRotation,
    mockupPosition
  } = useSelector((state: RootState) => state.mockLab);

  // Fetch Frame states
  const {
    frameTransparent,
    frameBackground,
    frameShadow,
    frameNoise,
    frameBlur,
  } = useSelector((state: RootState) => state.mockLab);

  const { file } = useSelector((state: RootState) => state.import);


  return (
    <div className={styles.canvas} >

      <div style={{aspectRatio: 16/9}} className={styles.canvasSafeArea}>

      <div 
        className={`${styles.frame} ${styles.previewFrame}`}
        style={{
          aspectRatio: 16/9,
          transform: 'none',
          transformOrigin: '50% 50% 0px',
        }}
      >

        <div
        className={`${styles.frameContent}`}
        >


        </div>

        {/* Unified Frame Background */}
        {!frameTransparent.transparent && (
          <div
            className={styles.frameBackground}
            style={{
              backgroundImage: `url(${frameBackground.backgroundSrc})`, 
              backgroundColor: '#121212',
              opacity: frameBackground.backgroundOpacity,
              scale: (frameBackground.backgroundScale + 0.1) * 10,
              filter: `blur(${frameBlur.blur}px)`,
            }}
          />
        )}

        {/* Frame Noise Overlay */}
        {frameNoise.noise > 0 && !frameTransparent.transparent && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              background: `url(https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Frame/noise.svg) 0% 0% / 40% repeat`,
              mixBlendMode: 'overlay',
              opacity: frameNoise.noise,
              backdropFilter: `blur(${frameBlur.blur / 4}px)`,
              overflow: 'hidden',
            }}
          />
        )}

        {/* Mockup Layout */}
        {mockupLayoutSource.layoutSrc && (
          <div
            className={styles.mockupLayout}
            style={{
              transform: `
                translate(-50%, -50%) 
                rotate(${mockupRotation.rotation}deg) 
                translate(${mockupPosition.position_X}px, ${mockupPosition.position_Y}px)
                scale(${mockupScale.scale / 3})
                `,
                // boxShadow: `0px ${mockupScale.scale / 2}px ${mockupScale.scale / 5}px rgba(0, 0, 0, 0.25)`,
            }}
          >
            <Image 
              src={mockupLayoutSource.layoutSrc} 
              alt="Device Shade" 
              width={500} 
              height={320} />
          </div>
        )}

        {/* Mockup Screen Image */}
        {file && (
          <div
            className={styles.mockupScreen}
            style={{
              transform: `
                translate(-50%, -50%) 
                rotate(${mockupRotation.rotation}deg) 
                translate(${mockupPosition.position_X}px, ${mockupPosition.position_Y}px)
                scale(${mockupScale.scale / 3})`,
            }}
          >
            <Image src={file} alt="Screen Image" style={{ borderRadius: '10px'}} width={452} height={278} />
          </div>
        )}

        {/* Mockup Shadow */}
        {/* {mockupShadow.shadowValue && (
          <div
            className={styles.mockupShadow}
            style={{
              transform: `scale(${mockupScale.scaleValue}) rotate(${mockupRotation.rotationValue}deg) translate(${mockupPositionX.position_X_Value}px, ${mockupPositionY.position_Y_Value}px)`,
              opacity: mockupShadowOpacity.shadowOpacityValue,
            }}
          >
            <Image src={mockupShadow.shadowValue} alt="Mockup Shadow" width={550} height={350} />
          </div>
        )} */}

        {/* Frame Shadow */}
        {frameShadow.shadowSrc && (
          <div
            className={styles.frameShadow}
            style={{
              backgroundImage: `url(${frameShadow.shadowSrc})`,
              opacity: frameShadow.shadowOpacity,
              transform: `scale(${(frameShadow.shadowScale + 0.1) * 10})`,
            }}
          />
        )}
        </div>
      </div>
      

    </div>
  );
};

export default Canvas;
