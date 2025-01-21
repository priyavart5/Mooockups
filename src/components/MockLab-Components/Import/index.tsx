'use client';

import { ImageUp, Replace, Minus } from 'lucide-react';
import styles from './styles.module.scss';
import Icon from '../Icon';
import { useDispatch, useSelector } from 'react-redux';
import { setFile, clearFile } from '../../../redux/mockLab-slices/importSlice';
import { RootState } from '../../../redux/store';
import { toast, Toaster } from 'react-hot-toast';

const Import = () => {
    const { file, fileName } = useSelector((state: RootState) => state.import.present);
    const dispatch = useDispatch();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const fileType = selectedFile.type.split('/')[0];

            if (fileType === 'image') {
                handleImageFile(selectedFile);
            } else if (fileType === 'video') {
                handleVideoFile(selectedFile);
            } else {
                toast.error('Unsupported file type. Please upload an image or video file.', {
                    style: {
                        borderRadius: '100px',
                        background: '#2a2a2a',
                        color: '#FF5959',
                    },
                });
            }
        }
    };

    const handleImageFile = (image: File) => {
        console.log('image')
        const reader = new FileReader();

        reader.onloadend = () => {
            const img = new Image();
            img.onload = () => {
                const width = img.width;
                const height = img.height;

                dispatch(
                    setFile({
                        file: reader.result as string,
                        fileName: image.name,
                        width,
                        height,
                        type: 'image',
                    })
                );
            };
            img.src = reader.result as string;
        };

        reader.readAsDataURL(image);
    };

    const handleVideoFile = (file: File) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = URL.createObjectURL(file);
    
        video.onloadedmetadata = () => {
            window.URL.revokeObjectURL(video.src);
    
            const width = video.videoWidth;
            const height = video.videoHeight;
            const duration = video.duration;
    
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    dispatch(
                        setFile({
                            file: reader.result as string,
                            fileName: file.name,
                            width,
                            height,
                            duration,
                            type: 'video',
                        })
                    );
                }
            };
            reader.readAsDataURL(file);
        };
    
        video.onerror = () => {
            toast.error('Failed to load video metadata.', {
                style: {
                    borderRadius: '100px',
                    background: '#2a2a2a',
                    color: '#FF5959',
                },
            });
        };
    };
    
    

    const handleReplaceClick = () => {
        const fileInput = document.getElementById('importFile') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
            fileInput.click();
        }
    };    

    const handleClearFile = () => {
        const fileInput = document.getElementById('importFile') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        dispatch(clearFile());
    };

    return (
        <>
            <Toaster position="top-center" />
            <div className={styles.import}>
                <div className={styles.import_image}>
                    <Icon
                        icon={ImageUp}
                        color="#EFEFEF"
                        size={20}
                        strokeWidth={1}
                        tipTitle="Import File"
                        tipPosition="bottom"
                    />
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        id="importFile"
                        onChange={handleFileChange}
                        accept="image/*, video/*"
                    />
                    <label className={styles.import_label} htmlFor="importFile">{fileName}</label>
                </div>
                {file && fileName && (
                    <>
                        <Icon
                            icon={Replace}
                            color="#EFEFEF"
                            size={20}
                            strokeWidth={1}
                            tipTitle="Replace File"
                            tipPosition="bottom"
                            onClick={handleReplaceClick}
                        />
                        <Icon
                            icon={Minus}
                            color="#EFEFEF"
                            size={20}
                            strokeWidth={1}
                            tipTitle="Clear File"
                            tipPosition="bottom"
                            onClick={handleClearFile}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default Import;
