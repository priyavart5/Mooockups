'use client';

import React, { useState, useRef } from 'react';
import styles from './styles.module.scss';
import { GalleryHorizontalEnd, Frame, Ellipsis, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { mockLabFrame, mockLabMockup } from '../../utils/defaultData';
import Slider from '../Slider';
import InputSlider from '../InputSlider';

type DeviceCategory = "Phone" | "Tablet";

interface Device {
    brand: string;
    model: string;
    image: string;
}


const MockLabEditor = () => {

    // Frame ToolBox
    const [editorService, setEditorService] = useState<string>('Mockup');
    const [showAllGradient, setShowAllGradient] = useState<boolean>(false);
    const [showAllShadow, setShowAllShadow] = useState<boolean>(false);
    const [selectedSolidColor, setSelectedSolidColor] = useState("#ffffff");

    // Mockup ToolBox
    const [deviceToogle, setDeviceToogle] = useState<boolean>(false);
    const [selectedDevice, setSelectedDevice] = useState<Device>({
        brand: "Samsung",
        model: "Galaxy S24 Ultra",
        image: "https://mockup-by-pv.s3.ap-south-1.amazonaws.com/MockLab/Mockup/Phone/Samsung+Galaxy+S24+Ultra/Shade/Featured+Image/Titanium+Gray.webp",
    });


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
        const devices = Object.values(mockLabMockup[key] || {}) as Device[];
        return devices.map((device, index) => (
            <div
                key={index}
                className={styles.EM_devices_category_device}
                onClick={() =>
                    setSelectedDevice({
                        brand: device.brand,
                        model: device.model,
                        image: device.image,
                    })
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
                {/* <p className={styles.EM_devices_category_deviceBrand}>{device.brand}</p> */}
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
        {
            editorService === 'Mockup' && (
                <>
                <div className={styles.EditorMockup}>

                    {/* Devices Tool */}
                    <div className={styles.EM_devices}>
                        <div className={styles.EM_devices_selected} onClick={() => setDeviceToogle(!deviceToogle)} >
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
                            {!deviceToogle ? (
                                <ChevronDown className={styles.EM_devices_selected_icon} color="#EFEFEF" size={20}/>
                            ) : (
                                <ChevronUp className={styles.EM_devices_selected_icon} color="#EFEFEF" size={20}/>
                            )}
                        </div>

                        {deviceToogle && (
                            <>
                                <div className={styles.EM_devices_list_categories}>
                                    {Object.keys(categoryRefs).map((category, index) => (
                                        <button key={index} className={styles.categoryButton} onClick={() => scrollToCategory(category as DeviceCategory)} >
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

                </div>
                </>
            )
        }

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
