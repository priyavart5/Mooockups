'use client';

import { useState } from 'react';
import { Files, Settings2 } from 'lucide-react';
import styles from './styles.module.scss';
import Icon from '../Icon';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Export = () => {
  const { file, width: originalWidth, height: originalHeight } = useSelector(
    (state: RootState) => state.import
  );

  // *****************
  // States - Start
  // *****************

  const [exportSetting, setExportSetting] = useState<boolean>(false);
  const [selectedFormat, setSelectedFormat] = useState<string>('PNG');
  const [selectedSize, setSelectedSize] = useState<string>('1x');

  // *****************
  // States - End
  // *****************

  const roundToEven = (value: number) => (value % 2 === 0 ? value : value + 1);

  const getMultiplier = (size: string) => {
    switch (size) {
      case '0.5x':
        return 0.5;
      case '1x':
        return 1;
      case '2x':
        return 2;
      case '3x':
        return 3;
      case '4x':
        return 4;
      default:
        return 1;
    }
  };

  const calculateDimensions = (multiplier: number) => {
    return {
      width: roundToEven(
        Math.round((originalWidth ?? 0) * multiplier)
      ),
      height: roundToEven(
        Math.round((originalHeight ?? 0) * multiplier)
      ),
    };
  };
  

  const currentDimensions = calculateDimensions(getMultiplier(selectedSize));

  // Export the canvas
  const handleExport = () => {
    if (!file) {
      alert('No image to export!');
      return;
    }

    // Create a canvas element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas dimensions
    canvas.width = currentDimensions.width;
    canvas.height = currentDimensions.height;

    // Load the image into the canvas
    const img = new Image();
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Get the image data in the desired format
      const mimeType =
        selectedFormat === 'JPG'
          ? 'image/jpeg'
          : selectedFormat === 'WEBP'
          ? 'image/webp'
          : 'image/png';

      // Trigger download
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `mockup.${selectedFormat.toLowerCase()}`;
            link.click();
            URL.revokeObjectURL(url);
          }
        },
        mimeType,
        1.0 // Image quality (only applies to JPG and WEBP)
      );
    };

    img.src = file;
  };

  // Copy the image to clipboard
  const handleCopy = () => {
    if (!file) {
      alert('No image to copy!');
      return;
    }

    // Create a canvas element for copying
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas dimensions
    canvas.width = currentDimensions.width;
    canvas.height = currentDimensions.height;

    // Load the image into the canvas
    const img = new Image();
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Copy the canvas image to clipboard
      canvas.toBlob((blob) => {
        if (blob) {
          const clipboardItem = new ClipboardItem({ 'image/png': blob });
          navigator.clipboard.write([clipboardItem])
            .then(() => {
              alert('Image copied to clipboard!');
            })
            .catch((err) => {
              console.error('Failed to copy image to clipboard: ', err);
            });
        }
      }, 'image/png');
    };
    img.src = file;
  };

  return (
    <>
      <div className={styles.export_container}>
        <div
          className={`${styles.export_setting_container} ${
            exportSetting ? styles.show_settings : styles.hide_settings
          }`}
        >
          <div className={styles.export_setting}>
            <div className={styles.export_formats}>
              {['PNG', 'JPG', 'WEBP'].map((format) => (
                <button
                  key={format}
                  className={`${styles.format_button} ${
                    selectedFormat === format ? styles.active_button : ''
                  }`}
                  onClick={() => setSelectedFormat(format)}
                >
                  {format}
                </button>
              ))}
            </div>
            <div className={styles.export_sizes}>
              {['0.5x', '1x', '2x', '3x', '4x'].map((size) => (
                <button
                  key={size}
                  className={`${styles.size_button} ${
                    selectedSize === size ? styles.active_button : ''
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className={styles.export_overview}>
              <p className={styles.export_overview_resolution}>Image Resolution</p>
              <p className={styles.export_overview_size}>
                {currentDimensions.width} x {currentDimensions.height}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.export}>
          <button className={styles.export_button} onClick={handleExport}>
            Export
          </button>
          <Icon
            icon={Files}
            color="#EFEFEF"
            size={20}
            strokeWidth={1}
            tipTitle="Copy Mockup"
            tipPosition="top"
            onClick={handleCopy}
          />
          <Icon
            icon={Settings2}
            color="#EFEFEF"
            size={20}
            strokeWidth={1}
            tipTitle="Export Setting"
            tipPosition="top"
            onClick={() => setExportSetting(!exportSetting)}
          />
        </div>
      </div>
    </>
  );
};

export default Export;
