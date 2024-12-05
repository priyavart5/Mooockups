'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import { GalleryHorizontalEnd, Frame, Ellipsis, ChevronDown, ChevronUp, ImageUp, Minus, X } from 'lucide-react';
import { mockLabFrame, mockLabMockup, shadow } from '../../utils/defaultData';
import Slider from '../Slider';
import InputSlider from '../InputSlider';
import Icon from '../Icon';
import BackGroundIntegrations from "../Background Integrations";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { 
    setMockupSelectedDevice,
    setMockupShade,
    // setMockupLayout,
    setMockupShadow,
    setMockupShadowOpacity,
    setMockupScale,
    setMockupRotation,
    setMockupPositionX,
    setMockupPositionY,
    setFrameTransparent,
    setFrameBackgroundType,
    setFrameBackgroundSrc,
    setFrameBackgroundScale,
    setFrameBackgroundOpacity,
    setFrameShadow,
    setFrameShadowOpacity,
    setFrameShadowScale,
    setFrameSolidColor,
    setFrameSolidColorOpacity,
    setFrameNoise,
    setFrameBlur,
} from '../../redux/slices/mockLabSlice';


type DeviceCategory = "Phone" | "Tablet";

interface Shade {
    name: string;
    featuredSrc: string;
    canvasSrc: string;
}

interface Device {
    brand: string;
    model: string;
    screenPixels: string;
    image: string;
    shade: Shade[];
    Layout: unknown[];
}


const MockLabEditor = () => {
    
    // Redux Dispatch
    const dispatch = useDispatch();
    
    // *******************
    // Frame ToolBox
    // *******************
    const [editorService, setEditorService] = useState<string>('Mockup');
    const [visibleBGImportImage, setVisibleBGImportImage] = useState(false);
    const [bgImportImageName, setBgImportImageName] = useState('Import image');
    const [showAllGradient, setShowAllGradient] = useState<boolean>(false);
    const [selectedGradientImageIndex, setSelectedGradientImageIndex] = useState<number | null>(null);
    const [showAllShadow, setShowAllShadow] = useState<boolean>(false);
    const [selectedShadowImageIndex, setSelectedShadowImageIndex] = useState<number | null>(null);
    const [visibleUnsplash, setVisibleUnsplash] = useState(false);
    const [visiblePixabay, setVisiblePixabay] = useState(false);

    const [visibleClearBackground, setVisibleClearBackground] = useState(false);
    const [visibleClearGradient, setVisibleClearGradient] = useState(false);
    const [visibleClearShadow, setVisibleClearShadow] = useState(false);
    const [visibleClearSolidColor, setVisibleClearSolidColor] = useState(false);

    // Frame Use Selector
    const selectedSolidColor = useSelector((state: RootState) => state.mockLab.frameSolidColor);
    const { frameTransparent } = useSelector((state: any) => state.mockLab);


    // *******************
    // Mockup ToolBox
    // *******************
    const [deviceToogle, setDeviceToogle] = useState<boolean>(false);

    const selectedDevice = useSelector((state: RootState) => state.mockLab.mockupSelectedDevice);

    
    const categoryRefs: Record<DeviceCategory, React.RefObject<HTMLDivElement>> = {
        Phone: useRef<HTMLDivElement>(null),
        Tablet: useRef<HTMLDivElement>(null),
    };

    const scrollToCategory = (category: DeviceCategory) => {
        if (categoryRefs[category]?.current) {
            categoryRefs[category].current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const renderDevicesByType = (type: DeviceCategory) => {
        const key = type.toLowerCase() as keyof typeof mockLabMockup; // Explicit cast
        const devices = Object.entries(mockLabMockup[key] || {}) as [string, Device][];
        return devices.map(([_, device], index) => (
            <div
                key={index}
                className={styles.EM_devices_category_device}
                onClick={() => handleMockupDevice(device)}
            >
                <Image
                    src={device.image}
                    alt={device.model}
                    className={styles.EM_devices_category_deviceImage}
                    width={54}
                    height={68}
                    loading="lazy"
                />
                <p className={styles.EM_devices_category_deviceModel}>{device.model}</p>
            </div>
        ));
    };

    const handleBGImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];
        if (image) {
            const reader = new FileReader();

            reader.onloadend = () => {
                if (reader.result) {
                    const img = new window.Image();
                    img.src = reader.result as string;
                    img.onload = () => {
                        dispatch(setFrameTransparent(false));
                        dispatch(setFrameBackgroundType('importImage'));
                        dispatch(setFrameBackgroundSrc(reader.result as string));
                        setBgImportImageName(image.name);
                    };
                }
            };
            
            reader.readAsDataURL(image);
        }
    };
    
    const handleClearImportImage = () => {
        const ImageInput = document.getElementById('importBGFile') as HTMLInputElement;
        if (ImageInput) ImageInput.value = '';
        dispatch(setFrameBackgroundType('none'));
        dispatch(setFrameBackgroundSrc(''));
        setBgImportImageName('Import image');
    };

    // ************************
    // Mockup Functions
    // ************************
    
    const handleMockupDevice = (device: Device) => {
        dispatch(setMockupSelectedDevice(device));
    };

    const handleMockupShade = (shade: string) => {
        dispatch(setMockupShade(shade));
    };

    const handleMockupShadow = (shadow: string) => {
        dispatch(setMockupShadow(shadow));
    }

    const handleMockupShadowOpacity = (opacity: number) => {
        dispatch(setMockupShadowOpacity(opacity));
    }

    const handleMockupScale = (scale: number) => {
        dispatch(setMockupScale(scale));
    }

    const handleMockupRotation = (rotation: number) => {
        dispatch(setMockupRotation(rotation));
    }

    const handleMockupPositionX = (x: number) => {
        dispatch(setMockupPositionX(x));
    }

    const handleMockupPositionY = (y: number) => {
        dispatch(setMockupPositionY(y));
    }


    // *************************
    // Clear Button Function
    // *************************

    const handleClearBackground = () => {
        dispatch(setFrameBackgroundType('none'));
        dispatch(setFrameBackgroundSrc(''));
        dispatch(setFrameNoise(0));
        setVisibleClearBackground(false);
      };
      
      const handleClearGradient = () => {
        dispatch(setFrameBackgroundType('none'));
        dispatch(setFrameBackgroundSrc(''));
        setVisibleClearGradient(false);
        setSelectedGradientImageIndex(null)
      };
      
      const handleClearShadow = () => {
        dispatch(setFrameShadow(''));
        setVisibleClearShadow(false);
        setSelectedShadowImageIndex(null);
      };
      
      const handleClearSolidColor = () => {
        dispatch(setFrameSolidColor("#121212"));
        dispatch(setFrameSolidColorOpacity(1));
        setVisibleClearSolidColor(false);
      };

    return (
        <>
        <div className={styles.EditorBox}>
            <div className={styles.EditorServices}>
                <button className={`${styles.EditorServicesCTA} ${
                        editorService === 'Mockup' ? styles.active_service : ''
                    }`} onClick={() => setEditorService('Mockup')}>
                    <GalleryHorizontalEnd strokeWidth={1.5}  color="#EFEFEF" size={18}/>
                    Mockup
                </button>
                <button className={`${styles.EditorServicesCTA} ${
                        editorService === 'Frame' ? styles.active_service : ''
                    }`} onClick={() => setEditorService('Frame')}>
                    <Frame strokeWidth={1.5}  color="#EFEFEF" size={17}/>
                    Frame
                </button>
            </div>

            {/* Mockup ToolBox */}
            {
                editorService === 'Mockup' && (
                    <>
                    <div className={styles.EditorMockup}>

                        {/* Devices Tool */}
                        <div className={styles.EM_devices}>
                            <div className={styles.EM_devices_selected} onClick={() => setDeviceToogle(!deviceToogle)}>
                                {selectedDevice && (
                                    <>
                                        <Image
                                            src={selectedDevice.image}
                                            alt={selectedDevice.model}
                                            className={styles.EM_devices_selected_image}
                                            width={28}
                                            height={36}
                                            loading="lazy"
                                        />
                                        <div className={styles.EM_devices_selected_specification}>
                                            <p className={styles.EM_devices_selected_brand}>{selectedDevice.brand}</p>
                                            <p className={styles.EM_devices_selected_model}>{selectedDevice.model}</p>
                                        </div>
                                    </>
                                )}
                                {!deviceToogle ? (
                                    <ChevronDown className={styles.EM_devices_selected_icon} color="#EFEFEF" size={20} />
                                ) : (
                                    <ChevronUp className={styles.EM_devices_selected_icon} color="#EFEFEF" size={20} />
                                )}
                            </div>

                            {deviceToogle && (
                                <>
                                    <div className={styles.EM_devices_list_categories}>
                                        {Object.keys(categoryRefs).map((category, index) => (
                                            <button
                                                key={index}
                                                className={styles.categoryButton}
                                                onClick={() =>
                                                    scrollToCategory(category as DeviceCategory)
                                                }
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>

                                    <div className={styles.EM_devices_category}>
                                        {Object.keys(categoryRefs).map((category, index) => (
                                            <div
                                                key={index}
                                                id={`${category.toLowerCase()}-category`}
                                                ref={categoryRefs[category as keyof typeof categoryRefs]}
                                                className={styles.EM_devices_category_section}
                                            >
                                                <p className={styles.EM_devices_category_name}>{category}</p>
                                                <div className={styles.EM_devices_category_devices}>
                                                    {renderDevicesByType(category as DeviceCategory)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Shade Tool */}
                        <div className={styles.EM_panels}>
                            <p>Shade</p>
                            <div className={styles.EM_panels_shade_featuredImage}>
                                {selectedDevice.shade.map((shade : Shade, index) => (
                                    <div key={index} className={styles.EM_panels_shade_image_div} onClick={() => handleMockupShade(shade.canvasSrc)}>
                                        <Image
                                            src={shade.featuredSrc}
                                            alt={shade.name || "Imported image"}
                                            className={styles.EM_panels_shade_image}
                                            width={77}
                                            height={50}
                                            // loading="lazy"
                                            priority
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shadow Tool */}
                        <div className={styles.EM_panels}>
                            <p>Shadow</p>
                            <div className={styles.EM_panels_shadow_featuredImage}>
                                {shadow.map((sahdows, index) => (
                                <Image
                                    key={index}
                                    src={sahdows.featuredSrc}
                                    alt={sahdows.name || "Imported image"}
                                    className={styles.EM_panels_shadow_image}
                                    width={77}
                                    height={50}
                                    loading="lazy"
                                    onClick={() => handleMockupShadow(sahdows.featuredSrc)}
                                />
                                ))}
                            </div>
                            <Slider 
                                title="Opacity"
                                min={0}
                                max={100}
                                step={1}
                                initialValue={100}
                                onValueChange={(opacity) => handleMockupShadowOpacity(opacity)}
                            />
                        </div>

                        {/* Scale Tool */}
                        <div className={styles.EM_panels}>
                            <p>Scale</p>
                            <div>
                                <InputSlider 
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    initialValue={0.1}
                                    onValueChange={(scale) => handleMockupScale(scale)}
                                />
                            </div>
                        </div>

                        {/* Rotation Tool */}
                        <div className={styles.EM_panels}>
                            <p>Rotate</p>
                            <div>
                                <InputSlider 
                                    min={0}
                                    max={360}
                                    step={1}
                                    initialValue={180}
                                    onValueChange={(rotation) => handleMockupRotation(rotation)}
                                />
                            </div>
                        </div>

                        {/* Position Tool */}
                        <div className={styles.EM_panels}>
                            <p>Position</p>
                                <Slider 
                                    title="x - Axis"
                                    min={0}
                                    max={100}
                                    step={1}
                                    initialValue={50}
                                    onValueChange={(x) => handleMockupPositionX(x)}
                                />
                                <Slider 
                                    title="y - Axis"
                                    min={0}
                                    max={100}
                                    step={1}
                                    initialValue={50}
                                    onValueChange={(y) => handleMockupPositionY(y)}
                                />
                        </div>

                        {/* Mockup Overview */}
                        <div className={styles.EM_panels}>
                            <p>Mockup Overview</p>
                            <div className={styles.EM_panels_deviceOverview}>
                                <span className={styles.EM_panels_deviceOverview_span}>
                                    <p className={styles.EM_panels_deviceOverview_key}>Device</p>
                                    <p className={styles.EM_panels_deviceOverview_value}>{selectedDevice.brand} {selectedDevice.model}</p>
                                </span>
                                <span className={styles.EM_panels_deviceOverview_span}>
                                    <p className={styles.EM_panels_deviceOverview_key}>Screen Pixels</p>
                                    <p className={styles.EM_panels_deviceOverview_value}>{selectedDevice.screenPixels}</p>
                                </span>
                            </div>
                        </div>


                    </div>
                    </>
                )
            }

            {/* Frame ToolBox */}
            {
                editorService === 'Frame' && (
                    <>
                    <div className={styles.EditorFrame}>

                        {/* Background Tool */}
                        <div className={styles.EF_background}>
                            <div className={styles.EF_panels_title_clear}>
                                <p className={styles.EF_panels_title}>Background</p>
                                { visibleClearBackground && <p className={styles.EF_panels_clear} onClick={handleClearBackground}>Clear</p> }
                            </div>
                            <div className={styles.EF_background_buttons}>
                                <button onClick={() => dispatch(setFrameTransparent(!frameTransparent.transparent))}>Transparent</button>
                                <button onClick={()=> {
                                    setVisibleBGImportImage(true)
                                    setVisibleUnsplash(false)
                                    setVisiblePixabay(false)
                                }}>
                                    Import image
                                </button>
                                <button onClick={() => {
                                    setVisibleBGImportImage(false)
                                    setVisibleUnsplash(true)
                                    setVisiblePixabay(false)
                                }}>
                                    Unsplash
                                </button>
                                <button onClick={() => {
                                    setVisibleBGImportImage(false)
                                    setVisibleUnsplash(false)
                                    setVisiblePixabay(true)
                                }}>
                                    Pixabay
                                </button>
                            </div>

                            { visibleBGImportImage && 
                                <div className={styles.EF_background_imageImport}>
                                    <div className={styles.EF_background_image}>
                                        <Icon
                                        icon={ImageUp}
                                        color='#EFEFEF'
                                        size={20}
                                        strokeWidth={1}
                                        tipTitle="Import File"
                                        tipPosition='bottom'
                                        />
                                        <input
                                            style={{ display: 'none' }}
                                            type="file"
                                            id="importBGFile"
                                            onChange={handleBGImageChange}
                                            accept="image/*, video/*"
                                        />
                                        <label className={styles.EF_background_imageLabel} htmlFor="importBGFile">{bgImportImageName}</label>
                                    </div>
                                    {  
                                        <Icon
                                            icon={Minus}
                                            color='#EFEFEF'
                                            size={20}
                                            strokeWidth={1}
                                            tipTitle="Clear file"
                                            tipPosition='bottom'
                                            onClick={handleClearImportImage}
                                        />
                                    }
                                    <Icon
                                        icon={X}
                                        color='#EFEFEF'
                                        size={20}
                                        strokeWidth={1}
                                        tipTitle="Close"
                                        tipPosition='bottom'
                                        onClick={() => setVisibleBGImportImage(false)}
                                    />
                                </div>
                            }
                            { visibleUnsplash && <BackGroundIntegrations onClose={() => {setVisibleUnsplash(false)}} source="unsplash" onSetVisibleClearBackground={() => setVisibleClearBackground(true)} /> }
                            { visiblePixabay && <BackGroundIntegrations onClose={() => setVisiblePixabay(false)} source="pixabay" onSetVisibleClearBackground={() => setVisibleClearBackground(true)} /> }
                        </div>

                        {/* Gradient Tool */}
                        <div className={styles.EF_panels}>
                            <div className={styles.EF_panels_title_clear}>
                                <p className={styles.EF_panels_title}>Gradient</p>
                                { visibleClearGradient && <p className={styles.EF_panels_clear} onClick={handleClearGradient}>Clear</p> }
                            </div>
                            <div className={styles.EF_panels_featuredImage}>
                                {mockLabFrame.gradient.slice(0, showAllGradient ? mockLabFrame.gradient.length : 5).map((image, index) => (
                                <Image
                                    key={index}
                                    src={image.featuredSrc}
                                    alt={image.name || "Imported image"}
                                    className={styles.EF_panels_image}
                                    width={77}
                                    height={50}
                                    loading="lazy"
                                    onClick={() => {
                                        dispatch(setFrameTransparent(false));
                                        dispatch(setFrameBackgroundType('gradient'));
                                        dispatch(setFrameBackgroundSrc(image.canvasSrc));
                                        setVisibleClearGradient(true);
                                        setSelectedGradientImageIndex(index);
                                    }}
                                    style={{
                                        border: selectedGradientImageIndex === index ? "2px solid #5C5C5C" : "none"
                                    }}
                                />
                                ))}
                                { mockLabFrame.gradient.length > 5 && (
                                <button className={styles.panelsMoreButton} onClick={() => setShowAllGradient(!showAllGradient)}>
                                    <Ellipsis color="#EFEFEF" size={24}/>
                                </button>
                                )}
                            </div>
                            <Slider 
                                title="Opacity"
                                min={0}
                                max={1}
                                step={0.1}
                                initialValue={1}
                                onValueChange={(opacity) => dispatch(setFrameBackgroundOpacity(opacity))}
                            />
                            <Slider 
                                title="Scale"
                                min={0}
                                max={0.3}
                                step={0.1}
                                initialValue={0}
                                onValueChange={(scale) => dispatch(setFrameBackgroundScale(scale))}
                            />
                        </div>

                        {/* Shadow Tool */}
                        <div className={styles.EF_panels}>
                            <div className={styles.EF_panels_title_clear}>
                                <p className={styles.EF_panels_title}>Shadow</p>
                                { visibleClearShadow && <p className={styles.EF_panels_clear} onClick={handleClearShadow}>Clear</p> }
                            </div>
                            <div className={styles.EF_panels_featuredImage}>
                                {mockLabFrame.shadow.slice(0, showAllShadow ? mockLabFrame.shadow.length : 5).map((image, index) => (
                                <Image
                                    key={index}
                                    src={image.featuredSrc}
                                    alt={image.name || "Imported image"}
                                    className={styles.EF_panels_image}
                                    width={77}
                                    height={50}
                                    loading="lazy"
                                    onClick={() => {
                                        dispatch(setFrameShadow(image.canvasSrc));
                                        setVisibleClearShadow(true);
                                        setSelectedShadowImageIndex(index);
                                    }}
                                    style={{
                                        border: selectedShadowImageIndex === index ? "2px solid #5C5C5C" : "none"
                                    }}
                                />
                                ))}
                                { mockLabFrame.shadow.length > 5 && (
                                <button className={styles.panelsMoreButton} onClick={() => setShowAllShadow(!showAllShadow)}>
                                    <Ellipsis color="#EFEFEF" size={24}/>
                                </button>
                                )}
                            </div>
                            <Slider 
                                title="Opacity"
                                min={0}
                                max={1}
                                step={0.1}
                                initialValue={0.5}
                                onValueChange={(opacity) => dispatch(setFrameShadowOpacity(opacity))}
                            />
                            <Slider 
                                title="Scale"
                                min={0}
                                max={0.3}
                                step={0.1}
                                initialValue={0}
                                onValueChange={(scale) => dispatch(setFrameShadowScale(scale))}
                            />
                        </div>

                        {/* Color Tool */}
                        <div className={styles.EF_panels}>
                            <div className={styles.EF_panels_title_clear}>
                                <p className={styles.EF_panels_title}>Solid Color</p>
                                { visibleClearSolidColor && <p className={styles.EF_panels_clear} onClick={handleClearSolidColor}>Clear</p> }
                            </div>
                            <div className={styles.EF_panels_solidColor}>
                                {mockLabFrame.solidColor.map((color, index) => {
                                    return(
                                        <span 
                                            key={index} 
                                            className={styles.EF_panels_solidColor_selective} 
                                            style={{ backgroundColor: color}}
                                            onClick={() => {
                                                dispatch(setFrameTransparent(false));
                                                dispatch(setFrameSolidColor(color))
                                                setVisibleClearSolidColor(true)
                                            }}
                                            >
                                        </span>
                                    )
                                })}
                                <input
                                    type="color"
                                    value={selectedSolidColor.color}
                                    onChange={(e) => {
                                        dispatch(setFrameTransparent(false));
                                        dispatch(setFrameSolidColor(e.target.value))
                                        setVisibleClearSolidColor(true)
                                    }}
                                    className={styles.customColorPicker}
                                />
                            </div>
                            <Slider 
                                title="Opacity"
                                min={0}
                                max={1}
                                step={0.1}
                                initialValue={1}
                                onValueChange={(opacity) => dispatch(setFrameSolidColorOpacity(opacity))}
                            />
                        </div>

                        {/* Noise Tool */}
                        <div className={styles.EF_panels}>
                            <p>Noise</p>
                            <div>
                                <InputSlider 
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    initialValue={0.1}
                                    onValueChange={(noise) => dispatch(setFrameNoise(noise))}
                                />
                            </div>
                        </div>

                        {/* Blur Tool */}
                        <div className={styles.EF_panels}>
                            <p>Blur</p>
                            <div>
                                <InputSlider 
                                    min={0}
                                    max={10}
                                    step={0.1}
                                    initialValue={0}
                                    onValueChange={(blur) => dispatch(setFrameBlur(blur))}
                                />
                            </div>
                        </div>

                        {/* Frame Overview */}
                        <div className={styles.EF_panels}>
                            <p>Frame Overview</p>
                            <div className={styles.EF_panels_FrameOverview}>
                                <span className={styles.EF_panels_FrameOverview_span}>
                                    <p className={styles.EF_panels_FrameOverview_key}>Frame</p>
                                    <p className={styles.EF_panels_FrameOverview_value}>Behance Project</p>
                                </span>
                                <span className={styles.EF_panels_FrameOverview_span}>
                                    <p className={styles.EF_panels_FrameOverview_key}>Frame Pixels</p>
                                    <p className={styles.EF_panels_FrameOverview_value}>1440 x 768</p>
                                </span>
                            </div>
                        </div>

                    </div>
                    </>
                )
            }
        </div>
        </>
    )
}

export default MockLabEditor;
