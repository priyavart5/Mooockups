'use client'

import { useState } from 'react';
import {ImageUp, Replace, Minus} from 'lucide-react';
import styles from './ImportStyles.module.scss';
import Icon from '../Icon';


const Import = () => {

    // *****************
    //States - Start
    // *****************

    const [fileName, setFileName] = useState<string>('Import file');
    const [filePreview, setFilePreview] = useState<string | null>(null);

    // *****************
    //States - End
    // *****************

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];
        if (image) {
            setFileName(image.name);
            const reader = new FileReader();
            
            reader.onloadend = () => {
                setFilePreview(reader.result as string);
            };
        
            if (image) {
                reader.readAsDataURL(image);
            }
        }
    };

    const handleReplaceClick = () => {
        const ImageInput = document.getElementById('importFile') as HTMLInputElement;
        if (ImageInput) ImageInput.click();
    };

    const handleClearImage = () => {
        setFileName('Import file');
        setFilePreview(null);
        const ImageInput = document.getElementById('importFile') as HTMLInputElement;
        if (ImageInput) ImageInput.value = '';
    };

    return (
        <div className={styles.import}>
            <div className={styles.import_image}>
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
                    id="importFile" 
                    onChange={handleImageChange}
                    accept='image/*, video/*'
                />
                <label className={styles.import_label} htmlFor="importFile">{fileName}</label>
            </div>
            {
                fileName && filePreview && (
                    <>
                        <Icon 
                            icon={Replace} 
                            color='#EFEFEF' 
                            size={20} 
                            strokeWidth={1} 
                            tipTitle="Replace File"
                            tipPosition='bottom'
                            onClick={handleReplaceClick}
                        />
                        <Icon 
                            icon={Minus} 
                            color='#EFEFEF' 
                            size={20} 
                            strokeWidth={1} 
                            tipTitle="Clear File"
                            tipPosition='bottom'
                            onClick={handleClearImage} 
                        />
                    </>
                )
            }
        </div>
    )
}

export default Import;
