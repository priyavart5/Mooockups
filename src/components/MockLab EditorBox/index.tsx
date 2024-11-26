'use client';

import React, { useState, useRef } from 'react';
import styles from './styles.module.scss';
import { GalleryHorizontalEnd, Frame, Ellipsis, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { mockLabFrame, mockLabMockup, shadow } from '../../utils/defaultData';
import Slider from '../Slider';
import InputSlider from '../InputSlider';

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

    // Frame ToolBox
    const [editorService, setEditorService] = useState<string>('Mockup');
    const [showAllGradient, setShowAllGradient] = useState<boolean>(false);
    const [showAllShadow, setShowAllShadow] = useState<boolean>(false);
    const [selectedSolidColor, setSelectedSolidColor] = useState("#ffffff");


    const defaultDevice = {
        brand: 'Samsung',
        model: 'Galaxy S24 Ultra',
        screenPixels: '3120 x 1440',
        image: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Phone/Samsung+Galaxy+S24+Ultra/Shade/Featured+Image/Titanium+Violet.webp',
        shade: [
            {
                name: 'Titanium Gray',
                featuredSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Phone/Samsung+Galaxy+S24+Ultra/Shade/Featured+Image/Titanium+Gray.webp',
                canvasSrc: '',
            },
            {
                name: 'Titanium Black',
                featuredSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Phone/Samsung+Galaxy+S24+Ultra/Shade/Featured+Image/Titanium+Black.webp',
                canvasSrc: '',
            },
            {
                name: 'Titanium Violet',
                featuredSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Phone/Samsung+Galaxy+S24+Ultra/Shade/Featured+Image/Titanium+Violet.webp',
                canvasSrc: '',
            },
            {
                name: 'Titanium Yellow',
                featuredSrc: 'https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Phone/Samsung+Galaxy+S24+Ultra/Shade/Featured+Image/Titanium+Yellow.webp',
                canvasSrc: '',
            },
        ],
        Layout: [],
    };


    // Mockup ToolBox
    const [deviceToogle, setDeviceToogle] = useState<boolean>(false);
    const [selectedDevice, setSelectedDevice] = useState<Device>(defaultDevice);

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
                onClick={() => setSelectedDevice(device)}
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
                                    <div key={index} className={styles.EM_panels_shade_image_div}>
                                        <Image
                                            src={shade.featuredSrc}
                                            alt={shade.name || "Imported image"}
                                            className={styles.EM_panels_shade_image}
                                            width={77}
                                            height={50}
                                            loading="lazy"
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
                                />
                                ))}
                            </div>
                            <Slider 
                                title="Opacity"
                                min={0}
                                max={100}
                                step={1}
                                initialValue={98}
                                // onValueChange={handleOpacityChange}
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
                                    // onValueChange={handleOpacityChange}
                                />
                            </div>
                        </div>

                        {/* Rotate Tool */}
                        <div className={styles.EM_panels}>
                            <p>Rotate</p>
                            <div>
                                <InputSlider 
                                    min={0}
                                    max={360}
                                    step={1}
                                    initialValue={180}
                                    // onValueChange={handleOpacityChange}
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
                                    initialValue={98}
                                    // onValueChange={handleOpacityChange}
                                />
                                <Slider 
                                    title="y - Axis"
                                    min={0}
                                    max={100}
                                    step={1}
                                    initialValue={98}
                                    // onValueChange={handleOpacityChange}
                                />
                        </div>

                        {/* Frame Overview */}
                        <div className={styles.EM_panels}>
                            <p>Device Overview</p>
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
                                <button>Transparent</button>
                                <button>Import Image</button>
                                <button>Unsplash</button>
                                <button>Pixabay</button>
                                <button>Pexels</button>
                            </div>
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
                                />
                                ))}
                                { mockLabFrame.gradient.length > 5 && (
                                <button className={styles.panelsMoreButton} onClick={() => setShowAllGradient(!showAllGradient)}>
                                    <Ellipsis color="#EFEFEF" size={24}/>
                                </button>
                                )}
                            </div>
                            <Slider 
                                title="Scale"
                                min={0}
                                max={100}
                                step={1}
                                initialValue={50}
                                // onValueChange={handleOpacityChange}
                            />
                            <Slider 
                                title="Opacity"
                                min={0}
                                max={100}
                                step={1}
                                initialValue={100}
                                // onValueChange={handleOpacityChange}
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
                                />
                                ))}
                                { mockLabFrame.shadow.length > 5 && (
                                <button className={styles.panelsMoreButton} onClick={() => setShowAllShadow(!showAllShadow)}>
                                    <Ellipsis color="#EFEFEF" size={24}/>
                                </button>
                                )}
                            </div>
                            <Slider 
                                title="Scale"
                                min={0}
                                max={100}
                                step={1}
                                initialValue={50}
                                // onValueChange={handleOpacityChange}
                            />
                            <Slider 
                                title="Opacity"
                                min={0}
                                max={100}
                                step={1}
                                initialValue={100}
                                // onValueChange={handleOpacityChange}
                            />
                        </div>

                        {/* Color Tool */}
                        <div className={styles.EF_panels}>
                            <p>Solid Color</p>
                            <div className={styles.EF_panels_solidColor}>
                                {mockLabFrame.solidColor.map((color, index) => {
                                    return(
                                        <span key={index} className={styles.EF_panels_solidColor_selective} style={{ backgroundColor: color}}></span>
                                    )
                                })}
                                <input
                                    type="color"
                                    value={selectedSolidColor}
                                    onChange={(e) => setSelectedSolidColor(e.target.value)}
                                    className={styles.customColorPicker}
                                />
                            </div>
                            <Slider 
                                title="Opacity"
                                min={0}
                                max={100}
                                step={1}
                                initialValue={100}
                                // onValueChange={handleOpacityChange}
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
                                    // onValueChange={handleOpacityChange}
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
                                    // onValueChange={handleOpacityChange}
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
