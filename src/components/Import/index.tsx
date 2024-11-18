// src/components/Import/index.tsx

'use client';

import { ImageUp, Replace, Minus } from 'lucide-react';
import styles from './ImportStyles.module.scss';
import Icon from '../Icon';
import { useDispatch, useSelector } from 'react-redux';
import { setFile, clearFile } from '../../redux/slices/importSlice';
import { RootState } from '../../redux/store';

const Import = () => {

    const { file, fileName } = useSelector((state: RootState) => state.import);
    const dispatch = useDispatch();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];
        if (image) {
        const reader = new FileReader();

        reader.onloadend = () => {
            const img = new Image();
            img.onload = () => {
            const width = img.width;
            const height = img.height;

            dispatch(setFile({
                file: reader.result as string,
                fileName: image.name,
                width,
                height,
            }));
            };
            img.src = reader.result as string;
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
        const ImageInput = document.getElementById('importFile') as HTMLInputElement;
        if (ImageInput) ImageInput.value = '';
        dispatch(clearFile());
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
                accept="image/*, video/*"
                />
                <label className={styles.import_label} htmlFor="importFile">{fileName}</label>
            </div>
            {
                file && fileName && (
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
    );
};

export default Import;
