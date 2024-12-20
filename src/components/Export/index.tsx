import { useState } from 'react';
import { Files, Settings2 } from 'lucide-react';
import styles from './styles.module.scss';
import Icon from '../Icon';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import * as htmlToImage from 'html-to-image';
import { Toaster, toast } from 'react-hot-toast';
import { detectOS } from '../../utils/osDetection';
import useShortcut from '../../hooks/useShortcut';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

const Export = ({ canvasRef }: { canvasRef: React.RefObject<HTMLDivElement> }) => {

  const os = detectOS();
  const { frameLayout } = useSelector((state: RootState) => state.mockLab);

  // *****************
  // States - Start
  // *****************

  const [exportSetting, setExportSetting] = useState<boolean>(false);
  const [selectedFormat, setSelectedFormat] = useState<string>('PNG');
  const [selectedSize, setSelectedSize] = useState<string>('3x');
  const [disableExportActions, setDisableExportActions] = useState<boolean>(false);

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
        Math.round((frameLayout.width ?? 0) * multiplier)
      ),
      height: roundToEven(
        Math.round((frameLayout.height ?? 0) * multiplier)
      ),
    };
  };
  

  const currentDimensions = calculateDimensions(getMultiplier(selectedSize));

  // Handle Export
  const handleExport = async () => {
    setDisableExportActions(true);
    if (!canvasRef.current) {
      setDisableExportActions(false);
      toast.error('Failed to Export Image. Please try again.',
        {
          style: {
            borderRadius: '100px',
            background: '#2a2a2a',
            color: '#FF5959',
          },
        }
      );
      return;
    }
  
    const loadingToast = toast.loading('Preparing...',
      {
        style: {
          borderRadius: '100px',
          background: '#2a2a2a',
          color: '#efefef',
        },
      }
    );
    try {
      let dataUrl: string | Blob | null = null;
      if (selectedFormat === 'PNG') {
        dataUrl = await htmlToImage.toPng(canvasRef.current, {
          pixelRatio: getMultiplier(selectedSize),
          cacheBust: true,
          canvasWidth: frameLayout.width,
          canvasHeight: frameLayout.height,
        });
      } else if (selectedFormat === 'JPG') {
        dataUrl = await htmlToImage.toJpeg(canvasRef.current, {
          pixelRatio: getMultiplier(selectedSize),
          cacheBust: true,
          canvasWidth: frameLayout.width,
          canvasHeight: frameLayout.height
        });
      } else if (selectedFormat === 'WEBP') {
        dataUrl = await htmlToImage.toBlob(canvasRef.current, {
          pixelRatio: getMultiplier(selectedSize),
          cacheBust: true,
          canvasWidth: frameLayout.width,
          canvasHeight: frameLayout.height
        });
      }
  
      if (dataUrl) {
        const url = typeof dataUrl === 'string' ? dataUrl : URL.createObjectURL(dataUrl);
        if (url) {
          const link = document.createElement('a');
          link.href = url;
          link.download = `mockup.${selectedFormat.toLowerCase()}`;
          link.click();
          URL.revokeObjectURL(url);
          setDisableExportActions(false);
          toast.success('Ready to Export Image',
            {
              id: loadingToast,
              style: {
                borderRadius: '100px',
                background: '#2a2a2a',
                color: '#00D547',
              },
            }
          );
        } else {
          throw new Error('Failed to generate download URL');
        }
      } else {
        throw new Error('Failed to generate image');
      }
    } catch (error) {
      console.error('Failed to export canvas:', error);
      setDisableExportActions(false);
      toast.error('Failed to Export Image. Please try again.',
        {
          id: loadingToast,
          style: {
            borderRadius: '100px',
            background: '#2a2a2a',
            color: '#FF5959',
          },
        }
      );
    }
  };

  // Handle Copy
  const handleCopy = async () => {
    setDisableExportActions(true);
    if (!canvasRef.current) {
      setDisableExportActions(false);
      toast.error('Failed to Copy Image. Please try again.',
        {
          style: {
            borderRadius: '100px',
            background: '#2a2a2a',
            color: '#FF5959',
          },
        }
      );
      return;
    }
  
    const loadingToast = toast.loading('Copying...',
      {
        style: {
          borderRadius: '100px',
          background: '#2a2a2a',
          color: '#efefef',
        },
      }
    );
    try {
      let dataUrl: string | Blob | null = null;
      if (selectedFormat === 'PNG') {
        dataUrl = await htmlToImage.toPng(canvasRef.current, {
          pixelRatio: getMultiplier(selectedSize),
          cacheBust: true,
          canvasWidth: frameLayout.width,
          canvasHeight: frameLayout.height,
        });
      } else if (selectedFormat === 'JPG') {
        dataUrl = await htmlToImage.toJpeg(canvasRef.current, {
          pixelRatio: getMultiplier(selectedSize),
          cacheBust: true,
          canvasWidth: frameLayout.width,
          canvasHeight: frameLayout.height,
        });
      }
  
      if (dataUrl) {
        const blob = await (await fetch(dataUrl)).blob();
  
        if (navigator.clipboard && navigator.clipboard.write) {
          const clipboardItem = new ClipboardItem({
            [blob.type]: blob,
          });
          await navigator.clipboard.write([clipboardItem]);
          setDisableExportActions(false);
          toast.success('Image copied to clipboard!',
            {
              id: loadingToast,
              style: {
                borderRadius: '100px',
                background: '#2a2a2a',
                color: '#00D547',
              },
            }
          );
        } else {
          throw new Error('Clipboard API is not supported in this browser.');
        }
      } else {
        throw new Error('Failed to generate image');
      }
    } catch (error) {
      console.error('Failed to copy image:', error);
      setDisableExportActions(false);
      toast.error('Failed to copy image. Please try again.',
        {
          id: loadingToast,
          style: {
            borderRadius: '100px',
            background: '#2a2a2a',
            color: '#FF5959',
          },
        }
      );
    }
  };

  // Register shortcuts
  useShortcut(os, ['Meta', 'e'], handleExport);
  useShortcut(os, ['Meta', 'c'], handleCopy);
  

  return (
    <>
    <Toaster position="top-center"/>
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
          {/* @ts-expect-error is necessary */}
          <Tooltip
            title={os === 'mac' ? '(Cmd + E)' : '(Ctrl + E)'}
            position="top"
            trigger="mouseenter"
            size="small"
            animation="fade"
            className={styles.export_button_tooltip}
          >
            <button onClick={handleExport} disabled={disableExportActions} className={styles.export_button}>
              Export <span></span>
            </button>
          </Tooltip>
          <Icon
            icon={Files}
            color="#EFEFEF"
            size={20}
            strokeWidth={1}
            tipTitle={os === 'mac' ? 'Copy Mockup (Cmd + C)' : 'Copy Mockup (Ctrl + C)'}
            tipPosition="top"
            onClick={!disableExportActions ? handleCopy : undefined}
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
