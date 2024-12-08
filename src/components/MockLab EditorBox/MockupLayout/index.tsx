// import React, { useEffect } from 'react';
// import Image from 'next/image';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const MockupLayout = ({ layouts, layoutSrc }: any) => {

    const {
        // frameTransparent,
        frameBackground,
        // frameShadow,
        // frameNoise,
        frameBlur,
      } = useSelector((state: RootState) => state.mockLab);
    

    return (
        <div className={styles.EM_layout_panel}>
            <p>Layout</p>
            <div className={styles.layoutsSection}>
                {layouts.map((layout: any, index: any) => (
                    <div 
                        key={index} 
                        className={styles.indiviualLayouts}
                        style={{
                            // backgroundImage: `url(${frameBackground.backgroundSrc})`, 
                            backgroundColor: '#121212',
                            opacity: frameBackground.backgroundOpacity,
                            filter: `blur(${frameBlur.blur}px)`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            aspectRatio: 16/9,
                        }}
                    >
                        <img 
                            src={layoutSrc} 
                            style={{
                                transform: `rotate(${layout.rotation}deg)`
                            }} 
                            className={styles.indiviualLayoutsImage} 
                            alt={layout.name}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MockupLayout;
