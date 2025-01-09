import React, {useState, useEffect, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import Image from 'next/image';
import { RootState } from '../../../redux/store';
import {setMockupRotation, setMockupScale} from '../../../redux/mockLab-slices/mockLabSlice';
import { setFile } from '../../../redux/mockLab-slices/importSlice';
import { Spline, MoveDiagonal2, ImageUp } from 'lucide-react';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import {Toaster, toast} from 'react-hot-toast';

const Canvas = forwardRef<HTMLDivElement>((_, ref) => {

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragType, setDragType] = useState<any>("");
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);

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

  const { file, type } = useSelector((state: RootState) => state.import);
  const { preview, hideMockup, hideBackground } = useSelector((state: RootState) => state.dock);
  const [borderRadius, setBorderRadius] = useState<number>(0);

  useEffect(() => {
    if (
      (mockupSelectedDevice.model === 'iPhone 16' || 
       mockupSelectedDevice.model === 'iPhone 16 Plus' || 
       mockupSelectedDevice.model === 'iPhone 16 Pro' || 
       mockupSelectedDevice.model === 'iPhone 16 Pro Max') &&
      frameLayout.type === 'Twitter' &&
      frameLayout.name === 'Cover'
    ) {
      setBorderRadius(12);
    } else {
      setBorderRadius(mockupSelectedDevice.screenStyle?.borderRadius);
    }
  }, [mockupSelectedDevice, frameLayout]);
  

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
    setIsDraggingFile(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      const fileType = droppedFile.type.split('/')[0];
      const reader = new FileReader();

      if (fileType === 'image') {
        reader.onloadend = () => {
          const img = new window.Image();
          img.onload = () => {
            const width = img.width;
            const height = img.height;

            dispatch(
              setFile({
                file: reader.result as string,
                fileName: droppedFile.name,
                width,
                height,
                type: 'image',
              })
            );
          };
          img.src = reader.result as string;
        };
        reader.readAsDataURL(droppedFile);
      } else if (fileType === 'video') {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = URL.createObjectURL(droppedFile);

        video.onloadedmetadata = () => {
          const width = video.videoWidth;
          const height = video.videoHeight;
          const duration = video.duration;

          reader.onloadend = () => {
            dispatch(
              setFile({
                file: reader.result as string,
                fileName: droppedFile.name,
                width,
                height,
                duration,
                type: 'video',
              })
            );
          };
          reader.readAsDataURL(droppedFile);
        };
      } else {
        toast.error('Unsupported file type. Please upload an image or video.', {
          style: {
            borderRadius: '100px',
            background: '#2a2a2a',
            color: '#FF5959',
          },
        });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileType = selectedFile.type.split('/')[0];
      const reader = new FileReader();

      if (fileType === 'image') {
        reader.onloadend = () => {
          const img = new window.Image();
          img.onload = () => {
            const width = img.width;
            const height = img.height;

            dispatch(
              setFile({
                file: reader.result as string,
                fileName: selectedFile.name,
                width,
                height,
                type: 'image',
              })
            );
          };
          img.src = reader.result as string;
        };
        reader.readAsDataURL(selectedFile);
      } else if (fileType === 'video') {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = URL.createObjectURL(selectedFile);

        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src);
          const width = video.videoWidth;
          const height = video.videoHeight;
          const duration = video.duration;

          reader.onloadend = () => {
            dispatch(
              setFile({
                file: reader.result as string,
                fileName: selectedFile.name,
                width,
                height,
                duration,
                type: 'video',
              })
            );
          };
          reader.readAsDataURL(selectedFile);
        };
      }
    }
  };


  return (
    <>
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
                  {
                    mockupSelectedDevice.showDeviceShadow && (
                      <div
                        className={styles.shadowLayer}
                        style={{
                          transform: `
                          scale(${mockupScale.scale / 3})
                          translate(${mockupPosition.position_X + 12}px, ${mockupPosition.position_Y + 12}px)
                          rotate(${mockupRotation.rotation}deg)`,
                          filter: "blur(10px)",
                          opacity: `${mockupShadow.shadowOpacity}`,
                          aspectRatio: mockupSelectedDevice.deviceAspectRatio
                        }}
                      ></div>
                    )
                  }

                  {/* Device Layout */}
                  {mockupLayoutSource.layoutSrc && (
                      <div
                        className={styles.canvasDevice_layout}
                        style={{
                          transform:` 
                            scale(${mockupScale.scale / 3})
                            translate(${mockupPosition.position_X}px, ${mockupPosition.position_Y}px)
                            rotate(${mockupRotation.rotation}deg)`,
                            aspectRatio: mockupSelectedDevice.deviceAspectRatio,
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
                      className={styles.canvasDevice_screenImportComponent}
                      style={{
                        transform:` 
                          scale(${mockupScale.scale / 3})
                          translate(${mockupPosition.position_X}px, ${mockupPosition.position_Y}px)`,
                          // rotate(${mockupRotation.rotation}deg)`,
                          aspectRatio: mockupSelectedDevice.screenPixelsWidth / mockupSelectedDevice.screenPixelsHeight,
                          zIndex: 7
                      }}
                    >
                        <div
                          className={`${styles.canvasDevice_screenImport} ${
                            isDraggingFile ? styles.dragActive : ''
                          }`}
                          onDragOver={(e:any) => {
                            e.preventDefault();
                            setIsDraggingFile(true);
                          }}
                          onDragLeave={() => setIsDraggingFile(false)}
                          onDrop={handleDrop}
                          style={{
                            padding: `${mockupSelectedDevice.screenStyle.padding}`,
                          }}
                        >
                          <input
                            type="file"
                            accept="image/*, video/*"
                            style={{ display: 'none' }}
                            id="imageUploadInput"
                            onChange={handleFileChange}
                            className={styles.canvasDevice_uploadImageInput}
                          />
                          <label htmlFor="imageUploadInput" className={styles.canvasDevice_uploadImageLabel} style={{ cursor: 'pointer' }}>
                            <ImageUp color="#EFEFEF" size={24} strokeWidth={1.5} style={{ marginBottom: '10px' }} />
                            <p>{isDraggingFile ? 'Drop the File here...' : 'Drag & Drop File'}</p>
                            <p>{mockupSelectedDevice.screenPixelsWidth} X {mockupSelectedDevice.screenPixelsHeight}</p>
                          </label>
                        </div>
                    </div>
                  )}

                  {/* Device Screen */}
                  {/* {file  && (
                    <div
                      className={styles.canvasDevice_screen}
                      style={{
                        transform:` 
                          scale(${mockupScale.scale / 3})
                          translate(${mockupPosition.position_X}px, ${mockupPosition.position_Y}px)
                          rotate(${mockupRotation.rotation}deg)`,
                          aspectRatio: mockupSelectedDevice.deviceAspectRatio,
                          zIndex: 3,
                      }}
                    >
                        <Image
                          unoptimized 
                          crossOrigin='anonymous' 
                          loading='eager' 
                          src={file} 
                          alt="Screen Image" 
                          fill 
                          // className={styles.canvasDevice_screenImage}
                          style={{
                            padding: `${mockupSelectedDevice.screenStyle.padding}`,
                            borderRadius: `${borderRadius}px`,
                          }}
                        />
                    </div>
                  )} */}

                  {file && (
                    <div
                    className={styles.canvasDevice_screen}
                    style={{
                      transform:` 
                        scale(${mockupScale.scale / 3})
                        translate(${mockupPosition.position_X}px, ${mockupPosition.position_Y}px)
                        rotate(${mockupRotation.rotation}deg)`,
                        aspectRatio: mockupSelectedDevice.deviceAspectRatio,
                        zIndex: 3,
                    }}
                    >
                      {type === 'image' ? (
                        <Image
                          unoptimized
                          crossOrigin="anonymous"
                          loading="eager"
                          src={file}
                          alt="Imported Content"
                          fill
                          style={{
                            padding: `${mockupSelectedDevice.screenStyle.padding}`,
                            borderRadius: `${borderRadius}px`,
                          }}
                        />
                      ) : (
                        <video  
                          key={file}
                          preload="none" 
                          autoPlay
                          loop
                          playsInline
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: `${borderRadius}px`,
                            padding: `${mockupSelectedDevice.screenStyle.padding}`,
                          }}
                        >
                          <source src={file} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
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
