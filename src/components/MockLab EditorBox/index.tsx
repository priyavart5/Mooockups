'use client';

import React, { useState } from 'react';
import styles from './styles.module.scss';
import { GalleryHorizontalEnd, Frame, Ellipsis } from 'lucide-react';
import Image from 'next/image';
import { mockLabFrame } from '../../utils/defaultData';
import Slider from '../Slider';

const MockLabEditor = () => {

    const [editorService, setEditorService] = useState<string>('Frame');
    const [showAllGradient, setShowAllGradient] = useState<boolean>(false);
    const [showAllShadow, setShowAllShadow] = useState<boolean>(false);


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
                            initialValue={98}
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
                            initialValue={98}
                            // onValueChange={handleOpacityChange}
                        />
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
