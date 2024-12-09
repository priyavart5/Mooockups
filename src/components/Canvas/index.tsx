import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { RootState } from '../../redux/store';
import styles from './styles.module.scss';
import {setMockupRotation, setMockupScale} from '../../redux/slices/mockLabSlice';
import { Spline, MoveDiagonal2 } from 'lucide-react';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';


const Canvas = () => {

  // Redux Dispatch
  const dispatch = useDispatch();

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
  const isPreview = useSelector((state: RootState) => state.preview.isPreview);

  // Dragging State
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState("");

  // Handle Drag Start
  const handleMouseDown = (e: any, type: string) => {
    e.preventDefault();
    setIsDragging(true);
    setDragType(type);
  };

  // Handle Drag Move
  const handleMouseMove = (e: any) => {
    if (!isDragging) return;

    const delta = e.movementX;
    if (dragType === "scale") {
      const newScale = Math.max(0.5, Math.min(mockupScale.scale + delta * 0.005, 10));
      dispatch(setMockupScale(newScale));
    } else if (dragType === "rotate") {
      const newRotation = mockupRotation.rotation + delta * 0.2;
      dispatch(setMockupRotation(newRotation));
    }
  };

  // Handle Drag End
  const handleMouseUp = () => {
    setIsDragging(false);
    setDragType("");
  };

  // Attach/Detach Mouse Listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, mockupScale.scale, mockupRotation.rotation]);


  return (
    <div className={styles.canvas} >

      <div className={styles.canvasSafeArea}>

      <div 
        className={`${styles.frame} ${styles.previewFrame}`}
        style={{
          aspectRatio: 16/9,
          transform: 'none',
          transformOrigin: '50% 50% 0px',
        }}
      >

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
          <div className={styles.mockupWrapper}>
            <div
              className={styles.mockupLayout}
              style={{
                transform: `
                  translate(-50%, -50%) 
                  rotate(${mockupRotation.rotation}deg) 
                  translate(${mockupPosition.position_X}px, ${mockupPosition.position_Y}px)
                  scale(${mockupScale.scale / 3})`,
              }}
            >
              {
                !isPreview && (
                  <>
                  {/* @ts-expect-error is necessary */}
                    <Tooltip
                      title="Rotation"
                      position= "right"
                      trigger="mouseenter"
                      size="small"
                      animation="fade"
                      className={`${styles.corner} ${styles.topRight}`}
                      >
                      <Spline 
                        strokeWidth={2}
                        size={18}
                        className={`${styles.corner}`}
                        onMouseDown={(e) => handleMouseDown(e, "rotate")}
                        />
                    </Tooltip>
                    {/* @ts-expect-error is necessary */}
                    <Tooltip
                      title="Scale"
                      position= "right"
                      trigger="mouseenter"
                      size="small"
                      animation="fade"
                      className={`${styles.corner} ${styles.bottomRight}`}
                    >
                      <MoveDiagonal2 
                        strokeWidth={2}
                        size={18}
                        className={`${styles.corner}`}
                        onMouseDown={(e) => handleMouseDown(e, "scale")}
                      />
                    </Tooltip>
                  </>
                )
              }

              <Image
                src={mockupLayoutSource.layoutSrc}
                alt="Device Shade"
                width={500}
                height={320}
              />
            </div>
          </div>
        )}

        {file && (
          <div
            className={styles.mockupScreen}
            style={{
              position: 'absolute', // Align with layoutSrc
              width: 'auto', // Dynamically adjust to fit
              height: 'auto',
              transform: ` translate(-50%, -50%) 
              rotate(${mockupRotation.rotation}deg) 
              translate(${mockupPosition.position_X}px, ${mockupPosition.position_Y}px)
              scale(${mockupScale.scale / 3})`,
            }}
          >
            <Image src={file} alt="Screen Image" style={{ borderRadius: '10px' }} width={452} height={278} />
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
