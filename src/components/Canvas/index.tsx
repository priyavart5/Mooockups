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
    frameSolidColor,
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
            backgroundColor: frameSolidColor.color || '#121212',
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
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="3" stitchTiles="stitch" result="turbulence"/><feComponentTransfer><feFuncR type="linear" slope="0.2"/><feFuncG type="linear" slope="0.2"/><feFuncB type="linear" slope="0.2"/></feComponentTransfer></filter><rect width="100%" height="100%" filter="url(%23noise)" fill="black" /></svg>')`,
            mixBlendMode: 'multiply',
            opacity: frameNoise.noise,
            filter: `blur(${frameBlur.blur}px)`,
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
