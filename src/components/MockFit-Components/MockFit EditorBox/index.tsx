import React, { useState } from 'react';
import styles from './style.module.scss';
import { GalleryHorizontalEnd, WandSparkles, AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal, AlignStartVertical, AlignCenterVertical, AlignEndVertical } from 'lucide-react';
import InputSlider from '../InputSlider';
import { useDispatch, useSelector } from 'react-redux';
import { setMockFitTools } from '@/redux/mockFit-slices/mockFitSlice';
import Slider from '../Slider';

const MockFitEditorBox = () => {

    const dispatch = useDispatch();

    const { mockFitTools } = useSelector((state: any) => state.mockFit.present);
    
    const [editorService, setEditorService] = useState<string>('Mockup');


    return (
        <>
            <div className={styles.MockLab_EditorBox}>
                <div className={styles.EditorServices}>
                    <button className={`${styles.EditorServicesCTA} ${
                            editorService === 'Mockup' ? styles.active_service : ''
                        }`} onClick={() => setEditorService('Mockup')}>
                        <GalleryHorizontalEnd strokeWidth={1.5}  color="#EFEFEF" size={18}/>
                        Mockup
                    </button>
                    <button className={`${styles.EditorServicesCTA} ${
                            editorService === 'Effects' ? styles.active_service : ''
                        }`} onClick={() => setEditorService('Effects')}>
                        <WandSparkles strokeWidth={1.5}  color="#EFEFEF" size={17}/>
                        Effects
                    </button>
                </div>

                {/* Mockup ToolBox */}
                {
                    editorService === 'Mockup' && (
                        <>

                            {/* Alignment Tool */}
                            <div className={styles.EM_panels} >
                                <p>Alignment</p>
                                <div className={styles.alignmentContainer}>
                                    <div className={styles.alignment_HV}>
                                        <span
                                            className={`${styles.icon} ${mockFitTools.alignHorizontal === 'top' ? styles.active : ''}`}
                                            onClick={() => dispatch(setMockFitTools({ property: 'alignHorizontal', value: 'top' })) }
                                        >
                                            <AlignStartHorizontal color="#EFEFEF" size={14} strokeWidth={2} />
                                        </span>
                                        <span
                                            className={`${styles.icon} ${mockFitTools.alignHorizontal === 'center' ? styles.active : ''}`}
                                            onClick={() => dispatch(setMockFitTools({ property: 'alignHorizontal', value: 'center' })) }
                                        >
                                            <AlignCenterHorizontal color="#EFEFEF" size={14} strokeWidth={2} />
                                        </span>
                                        <span
                                            className={`${styles.icon} ${mockFitTools.alignHorizontal === 'bottom' ? styles.active : ''}`}
                                            onClick={() => dispatch(setMockFitTools({ property: 'alignHorizontal', value: 'bottom' })) }
                                        >
                                            <AlignEndHorizontal color="#EFEFEF" size={14} strokeWidth={2} />
                                        </span>
                                    </div>
                                    <div className={styles.alignment_HV}>
                                        <span
                                            className={`${styles.icon} ${mockFitTools.alignVertical === 'left' ? styles.active : ''}`}
                                            onClick={() => dispatch(setMockFitTools({ property: 'alignVertical', value: 'left' })) }
                                        >
                                            <AlignStartVertical color="#EFEFEF" size={14} strokeWidth={2} />
                                        </span>
                                        <span
                                            className={`${styles.icon} ${mockFitTools.alignVertical === 'center'  ? styles.active : ''}`}
                                            onClick={() => dispatch(setMockFitTools({ property: 'alignVertical', value: 'center' })) }
                                        >
                                            <AlignCenterVertical color="#EFEFEF" size={14} strokeWidth={2} />
                                        </span>
                                        <span
                                            className={`${styles.icon} ${mockFitTools.alignVertical === 'right'  ? styles.active : ''}`}
                                            onClick={() => dispatch(setMockFitTools({ property: 'alignVertical', value: 'right' })) }
                                        >
                                            <AlignEndVertical color="#EFEFEF" size={14} strokeWidth={2} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        
                            {/* Scale Tool */}
                            <div className={styles.EM_panels}>
                                <p>Scale</p>
                                <div>
                                    <InputSlider 
                                        min={0}
                                        max={10}
                                        step={0.1}
                                        initialValue={mockFitTools.scale}
                                        onValueChange={(value) => dispatch(setMockFitTools({ property: 'scale', value: value })) }
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
                                        initialValue={mockFitTools.rotation}
                                        onValueChange={(value) => dispatch(setMockFitTools({ property: 'rotation', value: value })) }
                                    />
                                </div>
                            </div>

                            {/* Resize Tool */}
                            <div className={styles.EM_panel_resize}>
                                {['Fit', 'Fill', 'Stretch'].map((resize) => (
                                    <button
                                    key={resize}
                                    className={styles.resize_button}
                                    onClick={() => dispatch(setMockFitTools({ property: 'resize', value: resize })) }>
                                    {resize}
                                    </button>
                                ))}
                            </div>
                        </>
                    )
                }

                {/* Effects ToolBox */}
                {
                    editorService === 'Effects' && (
                        <>
                            <div className={styles.EE_panels}>
                                {/* <p className={styles.EE_panels_reset} onClick={ () =>{
                                    dispatch(setMockFitTools({ property: 'brightness', value: 0 }))
                                    dispatch(setMockFitTools({ property: 'contrast', value: 0 }))
                                    dispatch(setMockFitTools({ property: 'highlights', value: 0 }))
                                    dispatch(setMockFitTools({ property: 'saturation', value: 0 }))
                                    dispatch(setMockFitTools({ property: 'shadow', value: 0 }))
                                    dispatch(setMockFitTools({ property: 'noise', value: 0 }))
                                }
                                }>Reset</p> */}
                                <Slider 
                                    title="Brightness"
                                    min={-100}
                                    max={100}
                                    step={1}
                                    initialValue={mockFitTools.brightness}
                                    onValueChange={(value) => dispatch(setMockFitTools({ property: 'brightness', value: value })) }
                                />
                                <Slider 
                                    title="Contrast"
                                    min={-100}
                                    max={100}
                                    step={1}
                                    initialValue={mockFitTools.contrast}
                                    onValueChange={(value) => dispatch(setMockFitTools({ property: 'contrast', value: value })) }
                                />
                                <Slider 
                                    title="Highlights"
                                    min={-100}
                                    max={100}
                                    step={1}
                                    initialValue={mockFitTools.highlights}
                                    onValueChange={(value) => dispatch(setMockFitTools({ property: 'highlights', value: value })) }
                                />
                                <Slider 
                                    title="Saturation"
                                    min={-100}
                                    max={100}
                                    step={1}
                                    initialValue={mockFitTools.saturation}
                                    onValueChange={(value) => dispatch(setMockFitTools({ property: 'saturation', value: value })) }
                                />
                                <Slider 
                                    title="Shadow"
                                    min={-100}
                                    max={100}
                                    step={1}
                                    initialValue={mockFitTools.shadow}
                                    onValueChange={(value) => dispatch(setMockFitTools({ property: 'shadow', value: value })) }
                                />
                                <Slider 
                                    title="Noise"
                                    min={-100}
                                    max={100}
                                    step={1}
                                    initialValue={mockFitTools.noise}
                                    onValueChange={(value) => dispatch(setMockFitTools({ property: 'noise', value: value })) }
                                />
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default MockFitEditorBox;
