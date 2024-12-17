import React, {useState, useEffect, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { RootState } from '../../redux/store';
import styles from './styles.module.scss';
import {setMockupRotation, setMockupScale} from '../../redux/slices/mockLabSlice';
import { Spline, MoveDiagonal2 } from 'lucide-react';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

const Canvas = forwardRef<HTMLDivElement>((_, ref) => {

  // const [imageLoaded, setImageLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState("");

  const dispatch = useDispatch();

  const {
    mockupLayoutSource,
    mockupScale,
    mockupRotation,
    mockupPosition,
    mockupShadow
  } = useSelector((state: RootState) => state.mockLab);

  const {
    frameLayout,
    frameTransparent,
    frameBackground,
    frameShadow,
    frameNoise,
    frameBlur,
  } = useSelector((state: RootState) => state.mockLab);

  const { file } = useSelector((state: RootState) => state.import);
  const isPreview = useSelector((state: RootState) => state.preview.isPreview);

  const handleMouseDown = (e: any, type: string) => {
    e.preventDefault();
    setIsDragging(true);
    setDragType(type);
  };

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

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragType("");
  };

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
  }, [isDragging, mockupScale.scale, mockupRotation.rotation, handleMouseMove]);

  // useEffect(() => {
  //   const img = new window.Image();
  //   img.src = frameBackground.backgroundSrc;
  
  //   img.onload = () => {
  //     setImageLoaded(true);
  //   };
  
  //   img.onerror = () => {
  //     console.error("Failed to load background image.");
  //     setImageLoaded(false);
  //   };
  // }, [frameBackground.backgroundSrc]);



  return (
    <>
    <div className={styles.canvas}>
      <div className={styles.canvasSafeArea} >
        <div className={styles.previewframe} style={{aspectRatio: frameLayout.aspectRatio}}>
          <div className={styles.frameContent} ref={ref} >
            <div className={styles.canvasBackGround}>
              {/* Frame Shadow */}
              { !frameTransparent.transparent && frameShadow.shadowSrc && (
                <Image
                  unoptimized
                  crossOrigin='anonymous'
                  loading='eager'
                  className={styles.canvas_frameShadow}
                  alt='shadow'
                  src= {frameShadow.shadowSrc}
                  fill
                  style={{
                    opacity: frameShadow.shadowOpacity,
                    transform: `scale(${(frameShadow.shadowScale + 0.1) * 10})`
                  }}
                />
              )}
              
              {/* Frame Noise */}
              {frameNoise.noise > 0 && !frameTransparent.transparent && (
                <div className={styles.canvas_frameNoise} style={{ opacity: frameNoise.noise}} ></div>
              )}
              
              {/* Frame Background */}
              {!frameTransparent.transparent && (
                <img
                  crossOrigin='anonymous'
                  loading='eager'
                  className={styles.canvas_frameBackground}
                  alt='background'
                  // src= {frameBackground.backgroundSrc || 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Frame/Gradient/Canvas+Image/Galactic20Ring20-2016.webp'}
                  src= {frameBackground.backgroundSrc}
                  style={{
                    backgroundColor: 'transparent',
                    opacity: frameBackground.backgroundOpacity,
                    scale: (frameBackground.backgroundScale + 0.1) * 10,
                    filter: `blur(${frameBlur.blur}px)`,
                  }}
                />
              )}
            </div>
            <div className={styles.canvasDevice}>
              {/* Device Shadow */}
              <div className={styles.shadow} style={{ 
                borderRadius: "2.5em",
                transform: `rotate(${mockupRotation.rotation}deg)`
                }}>
                <div
                  className={styles.shadowLayer}
                  style={{
                    transform: `translateX(0.46875em) translateY(0.65625em) scale(${mockupScale.scale / 3})`,
                    filter: "blur(1em)",
                    opacity: `${mockupShadow.shadowOpacity}`,
                    position: "absolute",
                  }}
                ></div>
                <div
                  className={styles.shadowLayer}
                  style={{
                    transform: `translateX(1.40625em) translateY(1.96875em) scale(${mockupScale.scale / 3})`,
                    filter: "blur(0.975em)",
                    opacity: `${mockupShadow.shadowOpacity}`,
                    position: "absolute",
                  }}
                ></div>
              </div>

              {/* Device Layout */}
              {mockupLayoutSource.layoutSrc && (
                  <div
                    className={styles.canvasDevice_layout}
                    style={{
                      transform:`
                        rotate(${mockupRotation.rotation}deg) 
                        translate(${mockupPosition.position_X}px, ${mockupPosition.position_Y}px)
                        scale(${mockupScale.scale / 3})`,
                    }}
                  >
                    {
                      !isPreview && (
                        <>
                        <div className={styles.topRight}>
                          {/* @ts-expect-error is necessary */}
                          <Tooltip
                            title="Rotation"
                            position= "right"
                            trigger="mouseenter"
                            size="small"
                            animation="fade"
                            className={`${styles.corner}`}
                            >
                            <Spline 
                              strokeWidth={2}
                              size={18}
                              className={styles.corner}
                              onMouseDown={(e) => handleMouseDown(e, "rotate")}
                              />
                          </Tooltip>
                        </div>
                        <div className={styles.bottomRight}>
                          {/* @ts-expect-error is necessary */}
                          <Tooltip
                            title="Scale"
                            position= "right"
                            trigger="mouseenter"
                            size="small"
                            animation="fade"
                            className={styles.corner}
                          >
                            <MoveDiagonal2 
                              strokeWidth={2}
                              size={18}
                              className={styles.corner}
                              onMouseDown={(e) => handleMouseDown(e, "scale")}
                            />
                          </Tooltip>
                        </div>
                        </>
                    )}

                    <Image
                      crossOrigin='anonymous'
                      loading='eager'
                      src={mockupLayoutSource.layoutSrc}
                      alt="Device Shade"
                      width={500}
                      height={320}
                      className={styles.layoutimage}
                      unoptimized
                    />
                  </div>
              )}

              {/* Device Screen */}
              {file  && (
                <div
                  className={styles.canvasDevice_screen}
                  style={{
                    transform:` 
                    rotate(${mockupRotation.rotation}deg) 
                    translate(${mockupPosition.position_X}px, ${mockupPosition.position_Y}px)
                    scale(${mockupScale.scale / 3})`,
                  }}
                >
                  <Image unoptimized crossOrigin='anonymous' loading='eager' src={file} alt="Screen Image" style={{ borderRadius: '10px' }} width={452} height={278} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
});

Canvas.displayName = 'Canvas';
export default Canvas;
