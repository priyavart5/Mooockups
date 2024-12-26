'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import { GalleryHorizontalEnd, Frame, Ellipsis, ChevronDown, ChevronUp, ImageUp, X, PencilRuler, Replace } from 'lucide-react';
import { mockLabFrame, mockLabMockup } from '../../utils/defaultData';
import Slider from '../Slider';
import InputSlider from '../InputSlider';
import Icon from '../Icon';
import BackGroundIntegrations from "../Background Integrations";
import { useDispatch, useSelector } from 'react-redux';
import { 
    setMockupSelectedDevice,
    setMockupLayoutSource,
    setMockupShadowOpacity,
    setMockupScale,
    setMockupRotation,
    setMockupPositionX,
    setMockupPositionY,

    setSelectedFrameLayout,
    setFrameTransparent,
    setFrameBackgroundType,
    setFrameBackgroundSrc,
    setFrameBackgroundScale,
    setFrameBackgroundOpacity,
    setFrameShadow,
    setFrameShadowOpacity,
    setFrameShadowScale,
    setFrameNoise,
    setFrameBlur,
} from '../../redux/slices/mockLabSlice';


type DeviceCategory = "Phone" | "Tablet" | "Laptop" | "Desktop";

type FrameLayoutCategory = "Default" | "Instagram" | "Twitter" | "Dribbble" | "Youtube" | "Pinterest";

interface Shade {
    name: string;
    shadeSrc: string;
    layoutSrc: string;
}

interface Layout {
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

interface Device {
    brand: string;
    model: string;
    screenPixelsWidth: number;
    screenPixelsHeight: number;
    deviceAspectRatio: number;
    screenStyle: any;
    image: string;
    shade: Shade[];
    layout: Layout[];
    showDeviceShadow: boolean;
}


const MockLabEditor = () => {
    
    // Redux Dispatch
    const dispatch = useDispatch();

    const {
        frameLayout,
        frameTransparent, 
        frameBackground, 
        frameShadow, 
        mockupSelectedDevice, 
        mockupScale, 
        mockupRotation,
        mockupPosition,
        mockupShadow,
        frameNoise,
        frameBlur
    } = useSelector((state: any) => state.mockLab);

    const { hideMockup, hideBackground } = useSelector((state: any) => state.dock);
    
    // *******************
    // Frame ToolBox
    // *******************
    const [frameLayoutToogle, setFrameLayoutToogle] = useState<boolean>(false);
    const [editorService, setEditorService] = useState<string>('Mockup');
    const [visibleBGImportImage, setVisibleBGImportImage] = useState<boolean>(false);
    const [bgImportImageName, setBgImportImageName] = useState<string>('Import image');
    const [showAllGradient, setShowAllGradient] = useState<boolean>(false);
    const [selectedGradientImageIndex, setSelectedGradientImageIndex] = useState<number | null>(null);
    const [showAllShadow, setShowAllShadow] = useState<boolean>(false);
    const [selectedShadowImageIndex, setSelectedShadowImageIndex] = useState<number | null>(null);
    const [visibleUnsplash, setVisibleUnsplash] = useState<boolean>(false);
    const [visiblePixabay, setVisiblePixabay] = useState<boolean>(false);

    // const [visibleClearBackground, setVisibleClearBackground] = useState<boolean>(false);
    // const [visibleClearGradient, setVisibleClearGradient] = useState<boolean>(false);
    const [visibleClearShadow, setVisibleClearShadow] = useState<boolean>(false);

    const [visibleBackgroundEffect, setVisibleBackgroundEffect] = useState<boolean>(false);
    const [visibleGradientEffect, setVisibleGradientEffect] = useState<boolean>(false);
    const [visibleShadowEffect, setVisibleShadowEffect] = useState<boolean>(false);

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
                        setVisibleBackgroundEffect(true);
                        setVisibleGradientEffect(false);
                        dispatch(setFrameBackgroundScale(0));
                        dispatch(setFrameBackgroundOpacity(1));
                        setSelectedGradientImageIndex(null);
                    };
                }
            };
            
            reader.readAsDataURL(image);
        }
    };
    
    const handleReplaceImportImage = () => {
        const ImageInput = document.getElementById('importBGFile') as HTMLInputElement;
        if (ImageInput) ImageInput.click();
    };

    const frameLayoutCategoryRefs: Record<FrameLayoutCategory, React.RefObject<HTMLDivElement>> = {
        Default: useRef<HTMLDivElement>(null),
        Instagram: useRef<HTMLDivElement>(null),
        Twitter: useRef<HTMLDivElement>(null),
        Dribbble: useRef<HTMLDivElement>(null),
        Youtube: useRef<HTMLDivElement>(null),
        Pinterest: useRef<HTMLDivElement>(null),
    };

    const renderFrameLayoutsByType = (type: FrameLayoutCategory) => {
        const layoutCategory = mockLabFrame.frameLayout.find((layout) => layout.type === type);
    
        if (!layoutCategory) return null;
    
        return layoutCategory.typeLayouts.map((device, index) => (
            <div
                key={index}
                className={`${styles.EM_devices_category_device} ${
                    frameLayout.type === layoutCategory.type &&
                    frameLayout.name === device.name &&
                    frameLayout.width === device.width &&
                    frameLayout.height === device.height
                        ? styles.EM_devices_category_selectedLayout
                        : ""
                }`}
                onClick={() => {
                    setSelectedFrameLayout({
                        type: layoutCategory.type,
                        name: device.name,
                        aspectRatio: device.aspectRatio,
                        width: device.width,
                        height: device.height,
                    });
                    dispatch(
                        setSelectedFrameLayout({
                            type: layoutCategory.type,
                            name: device.name,
                            aspectRatio: device.aspectRatio,
                            width: device.width,
                            height: device.height,
                        })
                    );
                }}
            >
                <button className={styles.frameItem}>
                    <div className={styles.iconWrapper}>
                        <div className={styles.frameIconDisplay}>
                            <div
                                className={styles.frameItemIcon}
                                style={{ aspectRatio: device.aspectRatio }}
                            >
                                <span className={styles.frameTextSpan}>
                                    {device.width} x {device.height}
                                    <PencilRuler
                                        className={styles.frameTextSpanIcon}
                                        color="#5C5C5C"
                                        size={16}
                                        strokeWidth={1.5}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.details}>
                        <p className={styles.frameType}>{device.name}</p>
                        <p className={styles.frameType}>
                            {device.width} x {device.height}
                        </p>
                    </div>
                </button>
            </div>
        ));
    };
    


    // *******************
    // Mockup ToolBox
    // *******************
    const [deviceToogle, setDeviceToogle] = useState<boolean>(false);
    const [selectedShadeIndex, setSelectedShadeIndex] = useState<number | null>(0);

    
    const categoryRefs: Record<DeviceCategory, React.RefObject<HTMLDivElement>> = {
        Phone: useRef<HTMLDivElement>(null),
        Tablet: useRef<HTMLDivElement>(null),
        Laptop: useRef<HTMLDivElement>(null),
        Desktop: useRef<HTMLDivElement>(null),
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
                onClick={
                    () => {
                        dispatch(setMockupSelectedDevice(device));
                        setSelectedShadeIndex(0);
                        dispatch(setMockupLayoutSource(device.shade[0].layoutSrc));
                    }
                }
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


    // *************************
    // Frame - Clear Button Function
    // *************************

    // const handleClearBackground = () => {
    //     dispatch(setFrameBackgroundType('none'));
    //     dispatch(setFrameBackgroundSrc(''));
    //     dispatch(setFrameBackgroundScale(0));
    //     dispatch(setFrameBackgroundOpacity(1));
    //     setVisibleClearBackground(false);
    //     setVisibleBackgroundEffect(false);
    // };
      
    // const handleClearGradient = () => {
    //     dispatch(setFrameBackgroundType('none'));
    //     dispatch(setFrameBackgroundSrc(''));
    //     dispatch(setFrameBackgroundScale(0));
    //     dispatch(setFrameBackgroundOpacity(1));
    //     setVisibleClearGradient(false);
    //     setSelectedGradientImageIndex(null);
    //     setVisibleGradientEffect(false);
    // };
      
    const handleClearShadow = () => {
        dispatch(setFrameShadow(''));
        setVisibleClearShadow(false);
        setSelectedShadowImageIndex(null);
        setVisibleShadowEffect(false);
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
                        <div className={styles.EditorMockup} style={{
                            filter: `${ hideMockup.isMockupHide ? 'blur(2px)' : 'none' }`,
                        }}>

                            {/* Devices Tool */}
                            <div className={styles.EM_devices}>
                                <div className={styles.EM_devices_selected} onClick={() => setDeviceToogle(!deviceToogle)}>
                                    {mockupSelectedDevice && (
                                        <>
                                            <Image
                                                src={mockupSelectedDevice.image}
                                                alt={mockupSelectedDevice.model}
                                                className={styles.EM_devices_selected_image}
                                                fill
                                                loading="lazy"
                                            />
                                            <div className={styles.EM_devices_selected_specification}>
                                                <p className={styles.EM_devices_selected_brand}>{mockupSelectedDevice.brand}</p>
                                                <p className={styles.EM_devices_selected_model}>{mockupSelectedDevice.model}</p>
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
                                    {mockupSelectedDevice.shade.map((shade : Shade, index: any) => (
                                        <div 
                                            key={index} 
                                            className={styles.EM_panels_shade_image_div} 
                                            style={{
                                                border: selectedShadeIndex === index ? "2px solid #5C5C5C" : "none"
                                            }}
                                            onClick={() => {
                                                dispatch(setMockupLayoutSource(shade.layoutSrc));
                                                setSelectedShadeIndex(index);
                                            }} >
                                            <Image
                                                src={shade.shadeSrc}
                                                alt={shade.name || "Imported image"}
                                                className={styles.EM_panels_shade_image}
                                                width={77}
                                                height={50}
                                                // loading="lazy"
                                                priority
                                            />
                                            <p className={styles.EM_panels_shade_name}>{shade.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Shadow Tool */}
                            {
                                mockupSelectedDevice.showDeviceShadow && (
                                    <div className={styles.EM_panels}>
                                        <p>Shadow</p>
                                        <div>
                                            <InputSlider 
                                                min={0}
                                                max={1}
                                                step={0.1}
                                                value={mockupShadow.shadowOpacity}
                                                onValueChange={(opacity) => dispatch(setMockupShadowOpacity(opacity))}
                                            />
                                        </div>
                                    </div>
                                )
                            }

                            {/* Scale Tool */}
                            <div className={styles.EM_panels}>
                                <p>Scale</p>
                                <div>
                                    <InputSlider 
                                        min={0}
                                        max={10}
                                        step={0.1}
                                        value={mockupScale.scale}
                                        onValueChange={(scale) => dispatch(setMockupScale(scale))}
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
                                        value={mockupRotation.rotation}
                                        onValueChange={(rotation) => dispatch(setMockupRotation(rotation))}
                                    />
                                </div>
                            </div>

                            {/* Position Tool */}
                            <div className={styles.EM_panels}>
                                <div className={styles.EM_panels_title_clear}>
                                    <p className={styles.EM_panels_title}>Position</p>
                                    <p className={styles.EM_panels_reset} onClick={ () =>{
                                        dispatch(setMockupPositionX(0))
                                        dispatch(setMockupPositionY(0))
                                    }
                                    }>Reset</p>
                                </div>
                                    <Slider 
                                        title="x - Axis"
                                        min={-500}
                                        max={500}
                                        step={1}
                                        initialValue={mockupPosition.position_X}
                                        onValueChange={(x) => dispatch(setMockupPositionX(x))}
                                    />
                                    <Slider 
                                        title="y - Axis"
                                        min={-500}
                                        max={500}
                                        step={1}
                                        initialValue={mockupPosition.position_Y}
                                        onValueChange={(y) => dispatch(setMockupPositionY(y))}
                                    />
                            </div>

                            {/* Mockup Overview */}
                            <div className={styles.EM_panels}>
                                <p>Mockup Overview</p>
                                <div className={styles.EM_panels_deviceOverview}>
                                    <span className={styles.EM_panels_deviceOverview_span}>
                                        <p className={styles.EM_panels_deviceOverview_key}>Device</p>
                                        <p className={styles.EM_panels_deviceOverview_value}>{mockupSelectedDevice.brand} {mockupSelectedDevice.model}</p>
                                    </span>
                                    <span className={styles.EM_panels_deviceOverview_span}>
                                        <p className={styles.EM_panels_deviceOverview_key}>Screen Pixels</p>
                                        <p className={styles.EM_panels_deviceOverview_value}>{`${mockupSelectedDevice.screenPixelsWidth} x ${mockupSelectedDevice.screenPixelsHeight}`}</p>
                                    </span>
                                </div>
                            </div>


                        </div>

                        {
                            hideMockup.isMockupHide && (
                                <div className={styles.EditorMockup_hidden}>
                                    <p>Unhide Mockup</p>
                                    <p className={styles.EditorMockup_commandText}>(Ctrl + Shift + M)</p>
                                </div>
                            )
                        }
                    </>
                )
            }

            {/* Frame ToolBox */}
            {
                editorService === 'Frame' && (
                    <>
                    <div className={styles.EditorFrame} style={{
                        filter: `${ hideBackground.isBackgroundHide ? 'blur(2px)' : 'none' }`,
                    }}>

                        {/* Layout Tool */}
                        <div className={styles.EF_layouts}>
                            <div className={styles.EF_layouts_selected} onClick={() => setFrameLayoutToogle(!frameLayoutToogle)}>
                                {frameLayout && (
                                    <>
                                        <div className={styles.EF_layouts_selected_preview}>
                                            <div className={styles.EF_layouts_selected_framePreview}>
                                                <div className={styles.EF_layouts_selected_currentframeIcon} style={{ aspectRatio: frameLayout.aspectRatio }}>
                                                    <PencilRuler className={styles.frameTextSpanIcon} color="#5C5C5C" size={14} strokeWidth={1.5} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.EF_layouts_selected_specification}>
                                            <p className={styles.EF_layouts_selected_model}>{frameLayout.type} {frameLayout.name}</p>
                                            <p className={styles.EF_layouts_selected_brand}>{frameLayout.width} x {frameLayout.height}</p>
                                        </div>
                                    </>
                                )}
                                {!frameLayoutToogle ? (
                                    <ChevronDown className={styles.EF_layouts_selected_icon} color="#EFEFEF" size={20} />
                                ) : (
                                    <ChevronUp className={styles.EF_layouts_selected_icon} color="#EFEFEF" size={20} />
                                )}
                            </div>

                            {frameLayoutToogle && (
                                <>

                                    <div className={styles.EF_layouts_category}>
                                        {Object.keys(frameLayoutCategoryRefs).map((category, index) => (
                                            <div
                                                key={index}
                                                id={`${category.toLowerCase()}-category`}
                                                ref={frameLayoutCategoryRefs[category as keyof typeof frameLayoutCategoryRefs]}
                                                className={styles.EF_layouts_category_section}
                                            >
                                                <div className={styles.EF_layouts_category_name_icon}>
                                                    {
                                                        mockLabFrame.frameLayout.map((item: any, index: any) => 
                                                        item.type === category && (
                                                            <Image 
                                                            className={styles.EF_layouts_category_icon}
                                                                key={index} 
                                                                src={item.typeImage} 
                                                                alt={`${category} icon`} 
                                                                width={22} 
                                                                height={22} 
                                                            />
                                                        ))
                                                    }
                                                    <p className={styles.EF_layouts_category_name}>{category}</p>
                                                </div>
                                                <div className={styles.EF_layouts_category_devices}>
                                                    {renderFrameLayoutsByType(category as FrameLayoutCategory)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Background Tool */}
                        <div className={styles.EF_background}>
                            <div className={styles.EF_panels_title_clear}>
                                <p className={styles.EF_panels_title}>Background</p>
                                {/* { visibleClearBackground && <p className={styles.EF_panels_clear} onClick={handleClearBackground}>Clear</p> } */}
                            </div>
                            <div className={styles.EF_background_buttons}>
                                <button onClick={() => dispatch(setFrameTransparent(!frameTransparent.transparent))}>{ frameTransparent.transparent ? 'Non - Transparent' : 'Transparent' }</button>
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
                                            icon={Replace}
                                            color='#EFEFEF'
                                            size={20}
                                            strokeWidth={1}
                                            tipTitle="Clear file"
                                            tipPosition='bottom'
                                            onClick={handleReplaceImportImage}
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
                            { visibleUnsplash && 
                                <BackGroundIntegrations 
                                    source="unsplash" 
                                    onClose={() => {setVisibleUnsplash(false)}} 
                                    // onSetVisibleClearBackground={() => setVisibleClearBackground(true)}
                                    onSetVisibleEffect={() => {
                                        setVisibleBackgroundEffect(true);
                                        setVisibleGradientEffect(false);
                                        setSelectedGradientImageIndex(null);
                                        // setVisibleClearGradient(false);
                                    }} 
                                    /> 
                                }
                            { visiblePixabay && 
                                <BackGroundIntegrations 
                                    source="pixabay" 
                                    onClose={() => setVisiblePixabay(false)} 
                                    // onSetVisibleClearBackground={() => setVisibleClearBackground(true)} 
                                    onSetVisibleEffect={() => {
                                        setVisibleBackgroundEffect(true);
                                        setVisibleGradientEffect(false);
                                        setSelectedGradientImageIndex(null);
                                        // setVisibleClearGradient(false);
                                    }} 
                                /> 
                            }
                            {   visibleBackgroundEffect && (
                                    <>
                                        <Slider 
                                            title="Opacity"
                                            min={0}
                                            max={1}
                                            step={0.1}
                                            initialValue={frameBackground.backgroundOpacity}
                                            onValueChange={(opacity) => dispatch(setFrameBackgroundOpacity(opacity))}
                                        />
                                        <Slider 
                                            title="Scale"
                                            min={0}
                                            max={0.3}
                                            step={0.1}
                                            initialValue={frameBackground.backgroundScale}
                                            onValueChange={(scale) => dispatch(setFrameBackgroundScale(scale))}
                                        />
                                    </>
                            )}
                        </div>

                        {/* Gradient Tool */}
                        <div className={styles.EF_panels}>
                            <div className={styles.EF_panels_title_clear}>
                                <p className={styles.EF_panels_title}>Gradient</p>
                                {/* { visibleClearGradient && <p className={styles.EF_panels_clear} onClick={handleClearGradient}>Clear</p> } */}
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
                                        // setVisibleClearGradient(true);
                                        setSelectedGradientImageIndex(index);
                                        setVisibleGradientEffect(true);
                                        setVisibleBackgroundEffect(false);
                                        // setVisibleClearBackground(false);
                                        setVisibleUnsplash(false);
                                        setVisiblePixabay(false);
                                        setVisibleBGImportImage(false);
                                        dispatch(setFrameBackgroundScale(0));
                                        dispatch(setFrameBackgroundOpacity(1));
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
                            {
                                visibleGradientEffect && (
                                    <>
                                        <Slider 
                                            title="Opacity"
                                            min={0}
                                            max={1}
                                            step={0.1}
                                            initialValue={frameBackground.backgroundOpacity}
                                            onValueChange={(opacity) => dispatch(setFrameBackgroundOpacity(opacity))}
                                        />
                                        <Slider 
                                            title="Scale"
                                            min={0}
                                            max={0.3}
                                            step={0.1}
                                            initialValue={frameBackground.backgroundScale}
                                            onValueChange={(scale) => dispatch(setFrameBackgroundScale(scale))}
                                        />
                                    </>
                                )
                            }
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
                                        setVisibleShadowEffect(true);
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
                            {
                                visibleShadowEffect && (
                                    <>
                                        <Slider 
                                            title="Opacity"
                                            min={0}
                                            max={1}
                                            step={0.1}
                                            initialValue={frameShadow.shadowOpacity}
                                            onValueChange={(opacity) => dispatch(setFrameShadowOpacity(opacity))}
                                        />
                                        <Slider 
                                            title="Scale"
                                            min={0}
                                            max={0.3}
                                            step={0.1}
                                            initialValue={frameShadow.shadowScale}
                                            onValueChange={(scale) => dispatch(setFrameShadowScale(scale))}
                                        />
                                    </>
                                )
                            }
                        </div>

                        {/* Noise Tool */}
                        <div className={styles.EF_panels}>
                            <p>Noise</p>
                            <div>
                                <InputSlider 
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    value={frameNoise.noise}
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
                                    max={100}
                                    step={1}
                                    value={frameBlur.blur}
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
                                    <p className={styles.EF_panels_FrameOverview_value}>{frameLayout.type} {frameLayout.name}</p>
                                </span>
                                <span className={styles.EF_panels_FrameOverview_span}>
                                    <p className={styles.EF_panels_FrameOverview_key}>Frame Pixels</p>
                                    <p className={styles.EF_panels_FrameOverview_value}>{frameLayout.width} x {frameLayout.height}</p>
                                </span>
                            </div>
                        </div>

                    </div>

                    {
                        hideBackground.isBackgroundHide && (
                            <div className={styles.EditorFrame_hidden}>
                                <p>Unhide Background</p>
                                <p className={styles.EditorFrame_commandText}>(Ctrl + Shift + B)</p>
                            </div>
                        )
                    }
                    </>
                )
            }
        </div>
        </>
    )
};

export default MockLabEditor;