'use client'

import { ChevronLeft, Maximize2, Undo2, Redo2, EqualNot, SquareDashed } from 'lucide-react';
import styles from './DocksStyles.module.scss';
import Icon from '../Icon';
import { useDispatch, useSelector } from 'react-redux';
import { togglePreview } from '../../redux/slices/previewSlice';
import { RootState } from '../../redux/store';
import Link from 'next/link';


const Docks = () => {

    // *****************
    //States - Start
    // *****************

    // *****************
    //States - End
    // *****************

    const dispatch = useDispatch();
    const isPreview = useSelector((state: RootState) => state.preview.isPreview);
    
    const handlePreview = () => {
        dispatch(togglePreview()); // Dispatch action to toggle preview
    };

    return (
        <div className={styles.dock}>
            <div className={styles.dock_back}>
                <Link href='/'>
                    <Icon 
                        icon={ChevronLeft} 
                        color='#EFEFEF' 
                        size={20} 
                        strokeWidth={1} 
                        tipTitle="Back"
                        tipPosition='right'
                    />
                </Link>
            </div>
            <div className={styles.dock_other}>
                {
                    !isPreview && (
                        <>
                            <Icon 
                                icon={EqualNot} 
                                color='#EFEFEF' 
                                size={20} 
                                strokeWidth={1} 
                                tipTitle="Hide Mockup"
                                tipPosition='right'
                            />
                            <Icon 
                                icon={SquareDashed} 
                                color='#EFEFEF' 
                                size={20} 
                                strokeWidth={1} 
                                tipTitle="Hide Background"
                                tipPosition='right'
                            />
                            <Icon 
                                icon={Undo2} 
                                color='#EFEFEF' 
                                size={20} 
                                strokeWidth={1} 
                                tipTitle="Undo"
                                tipPosition='right'
                            />
                            <Icon 
                                icon={Redo2} 
                                color='#EFEFEF' 
                                size={20} 
                                strokeWidth={1} 
                                tipTitle="Redo"
                                tipPosition='right'
                            />
                        </>
                    )
                }
                <Icon 
                    icon={Maximize2} 
                    color='#EFEFEF' 
                    size={20} 
                    strokeWidth={1} 
                    tipTitle="Preview"
                    tipPosition='right'
                    onClick={handlePreview}
                />
            </div>
        </div>
    )
}

export default Docks;
