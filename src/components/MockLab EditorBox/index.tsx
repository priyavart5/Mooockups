'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import { GalleryHorizontalEnd, Frame, Ellipsis, ChevronDown, ChevronUp, ImageUp, Minus, X } from 'lucide-react';
import { mockLabFrame, mockLabMockup, shadow } from '../../utils/defaultData';
import Slider from '../Slider';
import InputSlider from '../InputSlider';
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
    setFrameBackground,
    setFrameGradient,
    setFrameGradientOpacity,
    setFrameGradientScale,
    setFrameGradientRotation,
    setFrameShadow,
    setFrameShadowOpacity,
    setFrameShadowScale,
    setFrameShadowRotation,
    setFrameSolidColor,
    setFrameSolidColorOpacity,
    setFrameNoise,
    setFrameBlur,
} from '../../redux/slices/mockLabSlice';
import Icon from '../Icon';

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

    // Frame ToolBox
    const [editorService, setEditorService] = useState<string>('Mockup');
    const [showAllGradient, setShowAllGradient] = useState<boolean>(false);
    const [showAllShadow, setShowAllShadow] = useState<boolean>(false);
    const [showBGImportImage, setShowBGImportImage] = useState(false);
    const [showBGImportImageFileName, setShowBGImportImageFileName] = useState('Import image');
    const [showUnsplash, setShowUnsplash] = useState(false);
    const [showPixabay, setShowPixabay] = useState(false);


    // Mockup ToolBox
    const [deviceToogle, setDeviceToogle] = useState<boolean>(false);
    const selectedDevice = useSelector((state: RootState) => state.mockLab.mockupSelectedDevice);
    const selectedSolidColor = useSelector((state: RootState) => state.mockLab.frameSolidColor);

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
                        dispatch(setFrameBackground(reader.result as string));
                        setShowBGImportImageFileName(image.name)
                    };
                }
            };

            reader.readAsDataURL(image);
        }
    };

    const handleClearImage = () => {
        const ImageInput = document.getElementById('importBGFile') as HTMLInputElement;
        if (ImageInput) ImageInput.value = '';
        dispatch(setFrameBackground('transparent'));
        setShowBGImportImageFileName('Import image');
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


    // ************************
    // Frame Functions
    // ************************

    const handleFrameBackGround = (background: string) => {
        dispatch(setFrameBackground(background));
    }

    const handleFrameGradient = (gradient: string) => {
        dispatch(setFrameGradient(gradient));
    }

    const handleFrameGradientOpacity = (opacity: number) => {
        dispatch(setFrameGradientOpacity(opacity));
    }

    const handleFrameGradientScale = (scale: number) => {
        dispatch(setFrameGradientScale(scale));
    }

    const handleFrameGradientRotation = (rotation: number) => {
        dispatch(setFrameGradientRotation(rotation));
    }

    const handleFrameShadow = (shadow: string) => {
        dispatch(setFrameShadow(shadow));
    }

    const handleFrameShadowOpacity = (opacity: number) => {
        dispatch(setFrameShadowOpacity(opacity));
    }

    const handleFrameShadowScale = (scale: number) => {
        dispatch(setFrameShadowScale(scale));
    }

    const handleFrameShadowRotation = (rotation: number) => {
        dispatch(setFrameShadowRotation(rotation));
    }

    const handleFrameSolidColor = (color: string) => {
        dispatch(setFrameSolidColor(color));
    }

    const handleFrameSolidColorOpacity = (opacity: number) => {
        dispatch(setFrameSolidColorOpacity(opacity));
    }

    const handleFrameNoise = (noise: number) => {
        dispatch(setFrameNoise(noise));
    }

    const handleFrameBlur = (blur: number) => {
        dispatch(setFrameBlur(blur));
    }

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
                            <p>Background</p>
                            <div className={styles.EF_background_buttons}>
                                <button onClick={() => handleFrameBackGround('transparent')}>Transparent</button>
                                <button onClick={()=> {
                                    setShowBGImportImage(true)
                                    setShowUnsplash(false)
                                    setShowPixabay(false)
                                }}>
                                    Import image
                                </button>
                                <button onClick={() => {
                                    setShowBGImportImage(false)
                                    setShowUnsplash(true)
                                    setShowPixabay(false)
                                }}>
                                    Unsplash
                                </button>
                                <button onClick={() => {
                                    setShowBGImportImage(false)
                                    setShowUnsplash(false)
                                    setShowPixabay(true)
                                }}>
                                    Pixabay
                                </button>
                            </div>

                            { showBGImportImage && 
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
                                        <label className={styles.EF_background_imageLabel} htmlFor="importBGFile">{showBGImportImageFileName}</label>
                                    </div>
                                    {  
                                        <Icon
                                            icon={Minus}
                                            color='#EFEFEF'
                                            size={20}
                                            strokeWidth={1}
                                            tipTitle="Clear file"
                                            tipPosition='bottom'
                                            onClick={handleClearImage}
                                        />
                                    }
                                    <Icon
                                        icon={X}
                                        color='#EFEFEF'
                                        size={20}
                                        strokeWidth={1}
                                        tipTitle="Close"
                                        tipPosition='bottom'
                                        onClick={() => setShowBGImportImage(false)}
                                    />
                                </div>
                            }
                            { showUnsplash && <BackGroundIntegrations onClose={() => setShowUnsplash(false)} source="unsplash" /> }
                            { showPixabay && <BackGroundIntegrations onClose={() => setShowPixabay(false)} source="pixabay" /> }
                        </div>

                        {/* Gradient Tool */}
                        <div className={styles.EF_panels}>
                            <p>Gradient</p>
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
                                    onClick={() => handleFrameGradient(image.canvasSrc)}
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
                                max={100}
                                step={1}
                                initialValue={100}
                                onValueChange={(opacity) => handleFrameGradientOpacity(opacity)}
                            />
                            <Slider 
                                title="Scale"
                                min={0}
                                max={100}
                                step={1}
                                initialValue={50}
                                onValueChange={(scale) => handleFrameGradientScale(scale)}
                            />
                             <Slider 
                                title="Rotation"
                                min={0}
                                max={360}
                                step={1}
                                initialValue={180}
                                onValueChange={(rotation) => handleFrameGradientRotation(rotation)}
                            />
                        </div>

                        {/* Shadow Tool */}
                        <div className={styles.EF_panels}>
                            <p>Shadow</p>
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
                                    onClick={() => handleFrameShadow(image.canvasSrc)}
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
                                max={100}
                                step={1}
                                initialValue={100}
                                onValueChange={(opacity) => handleFrameShadowOpacity(opacity)}
                            />
                            <Slider 
                                title="Scale"
                                min={0}
                                max={100}
                                step={1}
                                initialValue={50}
                                onValueChange={(scale) => handleFrameShadowScale(scale)}
                            />
                            <Slider 
                                title="Rotation"
                                min={0}
                                max={360}
                                step={1}
                                initialValue={180}
                                onValueChange={(rotation) => handleFrameShadowRotation(rotation)}
                            />
                        </div>

                        {/* Color Tool */}
                        <div className={styles.EF_panels}>
                            <p>Solid Color</p>
                            <div className={styles.EF_panels_solidColor}>
                                {mockLabFrame.solidColor.map((color, index) => {
                                    return(
                                        <span 
                                            key={index} 
                                            className={styles.EF_panels_solidColor_selective} 
                                            style={{ backgroundColor: color}}
                                            onClick={() => handleFrameSolidColor(color)}
                                            >
                                        </span>
                                    )
                                })}
                                <input
                                    type="color"
                                    value={selectedSolidColor.color}
                                    onChange={(e) => handleFrameSolidColor(e.target.value)}
                                    className={styles.customColorPicker}
                                />
                            </div>
                            <Slider 
                                title="Opacity"
                                min={0}
                                max={100}
                                step={1}
                                initialValue={100}
                                onValueChange={(opacity) => handleFrameSolidColorOpacity(opacity)}
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
                                    onValueChange={(noise) => handleFrameNoise(noise)}
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
                                    onValueChange={(blur) => handleFrameBlur(blur)}
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
