import React from 'react';
import { useSelector } from 'react-redux';
// import Image from 'next/image';
import { RootState } from '../../redux/store';
import styles from './styles.module.scss';

const Canvas = () => {
  // Fetch Mockup states
  // const {
  //   mockupSelectedDevice,
  //   mockupShade,
  //   mockupLayout,
  //   mockupShadow,
  //   mockupShadowOpacity,
  //   mockupScale,
  //   mockupRotation,
  //   mockupPositionX,
  //   mockupPositionY,
  // } = useSelector((state: RootState) => state.mockLab);

  // Fetch Frame states
  const {
    frameTransparent,
    frameBackground,
    frameShadow,
    frameNoise,
    frameBlur,
  } = useSelector((state: RootState) => state.mockLab);


  return (
    <div className={styles.canvas} >
      
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
          }}
        />
      )}

      {/* Mockup Device Shade */}
      {/* {mockupShade.shadeSrc && (
        <div
          className={styles.mockupShade}
          style={{
            transform: `scale(${mockupScale.scaleValue}) rotate(${mockupRotation.rotationValue}deg) translate(${mockupPositionX.position_X_Value}px, ${mockupPositionY.position_Y_Value}px)`,
          }}
        >
          <Image src={mockupShade.shadeSrc} alt="Device Shade" width={500} height={300} />
        </div>
      )} */}

      {/* Mockup Screen Image */}
      {/* {mockupSelectedDevice.image && (
        <div
          className={styles.mockupScreen}
          style={{
            transform: `scale(${mockupScale.scaleValue}) rotate(${mockupRotation.rotationValue}deg) translate(${mockupPositionX.position_X_Value}px, ${mockupPositionY.position_Y_Value}px)`,
          }}
        >
          <Image src={mockupSelectedDevice.image} alt="Screen Image" width={400} height={250} />
        </div>
      )} */}

      {/* Mockup Layout */}
      {/* {mockupLayout.layoutSrc && (
        <div
          className={styles.mockupLayout}
          style={{
            transform: `scale(${mockupScale.scaleValue}) rotate(${mockupRotation.rotationValue}deg) translate(${mockupPositionX.position_X_Value}px, ${mockupPositionY.position_Y_Value}px)`,
          }}
        >
          <Image src={mockupLayout.layoutSrc} alt="Mockup Layout" width={400} height={250} />
        </div>
      )} */}

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
  );
};

export default Canvas;
