'use client'

import { ChevronLeft, Maximize2, Undo2, Redo2, EqualNot, SquareDashed } from 'lucide-react';
import styles from './styles.module.scss';
import Icon from '../Icon';
import { useDispatch, useSelector } from 'react-redux';
import { setPreview, setHideMockup, setHideBackground } from '../../redux/slices/dockSlice';
import { RootState } from '../../redux/store';
import Link from 'next/link';


const Docks = () => {

    const dispatch = useDispatch();
    const { preview, hideMockup, hideBackground } = useSelector((state: RootState) => state.dock);

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
                    !preview.isPreview && (
                        <>
                            <Icon 
                                icon={EqualNot} 
                                color='#EFEFEF' 
                                size={20} 
                                strokeWidth={1} 
                                tipTitle={!hideMockup.isMockupHide ? 'Hide Mockup' : 'Unhide Mockup'}
                                tipPosition='right'
                                onClick={() => dispatch(setHideMockup(!hideMockup.isMockupHide))}
                            />
                            <Icon 
                                icon={SquareDashed} 
                                color='#EFEFEF' 
                                size={20} 
                                strokeWidth={1} 
                                tipTitle={!hideBackground.isBackgroundHide ? 'Hide Background' : 'Unhide Background'}
                                tipPosition='right'
                                onClick={() => dispatch(setHideBackground(!hideBackground.isBackgroundHide))}
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
                    tipTitle={!preview.isPreview ? 'Preview' : 'Unview'}
                    tipPosition='right'
                    onClick={() => dispatch(setPreview(!preview.isPreview))}
                />
            </div>
        </div>
    )
}

export default Docks;
