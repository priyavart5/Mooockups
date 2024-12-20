import React, {useState, useEffect, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { RootState } from '../../redux/store';
import styles from './styles.module.scss';
import {setMockupRotation, setMockupScale} from '../../redux/slices/mockLabSlice';
import { setFile } from '../../redux/slices/importSlice';
import { Spline, MoveDiagonal2, ImageUp } from 'lucide-react';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import {Toaster, toast} from 'react-hot-toast';

const Canvas = forwardRef<HTMLDivElement>((_, ref) => {

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragType, setDragType] = useState<any>("");
  const [isDraggingImage, setIsDraggingImage] = useState<boolean>(false);

  const dispatch = useDispatch();

  const {
    mockupSelectedDevice,
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
  const { preview, hideMockup, hideBackground } = useSelector((state: RootState) => state.dock);

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

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingImage(false);

    const image = e.dataTransfer.files?.[0];
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
          const img = new window.Image();
          img.onload = () => {
          const width = img.width;
          const height = img.height;

          dispatch(setFile({
              file: reader.result as string,
              fileName: image.name,
              width,
              height,
          }));
          };
          img.src = reader.result as string;
      };

      if (image) {
        reader.readAsDataURL(image);
      }else {
        toast.error('Please upload a valid image file.',
          {
            style: {
              borderRadius: '100px',
              background: '#2a2a2a',
              color: '#FF5959',
            },
          }
        );
      }
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
          const img = new window.Image();
          img.onload = () => {
          const width = img.width;
          const height = img.height;

          dispatch(setFile({
              file: reader.result as string,
              fileName: file.name,
              width,
              height,
          }));
          };
          img.src = reader.result as string;
      };

      if (file) {
        reader.readAsDataURL(file);
      }else {
        toast.error('Please upload a valid image file.',
          {
            style: {
              borderRadius: '100px',
              background: '#2a2a2a',
              color: '#FF5959',
            },
          }
        );
      }
    }
  };



  return (
    <>1
    <Toaster position="top-center"/>
    <div className={styles.canvas}>
      <div className={styles.canvasSafeArea} >
        <div className={styles.previewframe} style={{aspectRatio: frameLayout.aspectRatio}}>
          <div 
            className={styles.frameContent} 
            style={{
              backgroundColor: !frameTransparent.transparent ? (!hideBackground.isBackgroundHide ? '#121212' : 'transparent') : 'transparent'
            }} 
            ref={ref} >
            {
              !hideBackground.isBackgroundHide && (
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
              )
            }
            {
              !hideMockup.isMockupHide && (
                <div className={styles.canvasDevice}>
                  
                  {/* Device Shadow */}
                  <div
                    className={styles.shadowLayer}
                    style={{
                      transform: `
                      scale(${mockupScale.scale / 3})
                      translate(${mockupPosition.position_X + 12}px, ${mockupPosition.position_Y + 12}px)
                      rotate(${mockupRotation.rotation}deg)`,
                      filter: "blur(10px)",
                      opacity: `${mockupShadow.shadowOpacity}`,
                      aspectRatio: 738.24/508.8 
                    }}
                  ></div>

                  {/* Device Layout */}
                  {mockupLayoutSource.layoutSrc && (
                      <div
                        className={styles.canvasDevice_layout}
                        style={{
                          transform:` 
                            scale(${mockupScale.scale / 3})
                            translate(${mockupPosition.position_X}px, ${mockupPosition.position_Y}px)
                            rotate(${mockupRotation.rotation}deg)`,
                            aspectRatio: 738.24/508.8 
                        }}
                      >
                        {
                          !preview.isPreview && (
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
                          unoptimized
                          crossOrigin='anonymous'
                          loading='eager'
                          src={mockupLayoutSource.layoutSrc}
                          alt="Device Shade"
                          fill
                        />
                      </div>
                  )}

                  {/* Device Import */}
                  {!file  && (
                    <div
                      className={styles.canvasDevice_screen}
                      style={{
                        transform:` 
                          scale(${mockupScale.scale / 3})
                          translate(${mockupPosition.position_X}px, ${mockupPosition.position_Y}px)
                          rotate(${mockupRotation.rotation}deg)`,
                          aspectRatio: 2266/1488,
                          zIndex: 7
                      }}
                    >
                        <div
                          className={`${styles.canvasDevice_screenImport} ${
                            isDraggingImage ? styles.dragActive : ''
                          }`}
                          onDragOver={(e:any) => {
                            e.preventDefault();
                            setIsDraggingImage(true);
                          }}
                          onDragLeave={() => setIsDraggingImage(false)}
                          onDrop={handleDrop}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="imageUploadInput"
                            onChange={handleFileChange}
                            className={styles.canvasDevice_uploadImageInput}
                          />
                          <label htmlFor="imageUploadInput" className={styles.canvasDevice_uploadImageLabel} style={{ cursor: 'pointer' }}>
                            <ImageUp color="#EFEFEF" size={24} strokeWidth={1.5} style={{ marginBottom: '10px' }} />
                            <p>{isDraggingImage ? 'Drop the image here...' : 'Drag & Drop Image'}</p>
                            <p>{mockupSelectedDevice.screenPixels}</p>
                          </label>
                        </div>
                    </div>
                  )}

                  {/* Device Screen */}
                  {file  && (
                    <div
                      className={styles.canvasDevice_screen}
                      style={{
                        transform:` 
                          scale(${mockupScale.scale / 3})
                          translate(${mockupPosition.position_X}px, ${mockupPosition.position_Y}px)
                          rotate(${mockupRotation.rotation}deg)`,
                          aspectRatio: 2266/1488,
                          zIndex: 3,
                          maxHeight: '87%',
                      }}
                    >
                        <Image
                          unoptimized 
                          crossOrigin='anonymous' 
                          loading='eager' 
                          src={file} 
                          alt="Screen Image" 
                          fill 
                          className={styles.canvasDevice_screenImage}
                        />
                    </div>
                  )}
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
    </>
  );
});

Canvas.displayName = 'Canvas';
export default Canvas;
