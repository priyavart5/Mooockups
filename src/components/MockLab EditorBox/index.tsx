'use client';

import React, { useState } from 'react';
import styles from './styles.module.scss';
import { GalleryHorizontalEnd, Frame, Ellipsis } from 'lucide-react';
import Image from 'next/image';
import { mockLabFrame } from '../../utils/defaultData';
import Slider from '../Slider';
import InputSlider from '../InputSlider';

const MockLabEditor = () => {

    const [editorService, setEditorService] = useState<string>('Frame');
    const [showAllGradient, setShowAllGradient] = useState<boolean>(false);
    const [showAllShadow, setShowAllShadow] = useState<boolean>(false);
    const [selectedSolidColor, setSelectedSolidColor] = useState("#ffffff");

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
                    <p>Mockup Editor</p>
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
