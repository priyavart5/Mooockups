import { useState } from 'react';
import { Files, Settings2 } from 'lucide-react';
import styles from './styles.module.scss';
import Icon from '../Icon';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import * as htmlToImage from 'html-to-image';
import { Toaster, toast } from 'react-hot-toast';
import { detectOS } from '../../../utils/osDetection';
import useShortcut from '../../../hooks/useShortcut';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

const Export = ({ canvasRef }: { canvasRef: React.RefObject<HTMLDivElement> }) => {
  const os = detectOS();
  const { frameLayout } = useSelector((state: RootState) => state.mockLab);

  const [exportSetting, setExportSetting] = useState<boolean>(false);
  const [selectedFormat, setSelectedFormat] = useState<string>('PNG');
  const [selectedSize, setSelectedSize] = useState<string>('3x');
  const [disableExportActions, setDisableExportActions] = useState<boolean>(false);

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
      width: roundToEven(Math.round((frameLayout.width ?? 0) * multiplier)),
      height: roundToEven(Math.round((frameLayout.height ?? 0) * multiplier)),
    };
  };

  const currentDimensions = calculateDimensions(getMultiplier(selectedSize));

  const generateImage = async (maxAttempts: number, minDataLength: number) => {
    if (!canvasRef.current) throw new Error('Canvas not found.');

    let dataUrl: string | Blob | null = null;
    let attempt = 0;

    while (attempt < maxAttempts) {
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
      } else if (selectedFormat === 'WEBP') {
        dataUrl = await htmlToImage.toBlob(canvasRef.current, {
          pixelRatio: getMultiplier(selectedSize),
          cacheBust: true,
          canvasWidth: frameLayout.width,
          canvasHeight: frameLayout.height,
        });
      }

      const isValidData = dataUrl && (typeof dataUrl === 'string' ? dataUrl.length : dataUrl.size) > minDataLength;
      if (isValidData) return dataUrl;

      attempt++;
    }

    throw new Error('Failed to generate a valid image after multiple attempts.');
  };

  const handleExport = async () => {
    setDisableExportActions(true);
    const loadingToast = toast.loading('Preparing...', {
      style: { borderRadius: '100px', background: '#2a2a2a', color: '#efefef' },
    });

    try {
      const dataUrl = await generateImage(10, 2000000);
      if (dataUrl) {
        const url = typeof dataUrl === 'string' ? dataUrl : URL.createObjectURL(dataUrl);
        const link = document.createElement('a');
        link.href = url;
        link.download = `mooockups.${selectedFormat.toLowerCase()}`;
        link.click();
        if (typeof dataUrl !== 'string') URL.revokeObjectURL(url);

        toast.success('Image exported successfully!', {
          id: loadingToast,
          style: { borderRadius: '100px', background: '#2a2a2a', color: '#00D547' },
        });
      }
    } catch (error) {
      console.error('Failed to export canvas:', error);
      toast.error('Failed to Export Image. Please try again.', {
        id: loadingToast,
        style: { borderRadius: '100px', background: '#2a2a2a', color: '#FF5959' },
      });
    } finally {
      setDisableExportActions(false);
    }
  };

  const handleCopy = async () => {
    setDisableExportActions(true);
    const loadingToast = toast.loading('Copying...', {
      style: { borderRadius: '100px', background: '#2a2a2a', color: '#efefef' },
    });

    try {
      const dataUrl = await generateImage(10, 2000000);
      if (dataUrl) {
        const blob = typeof dataUrl === 'string' ? await (await fetch(dataUrl)).blob() : dataUrl;
        if (navigator.clipboard && navigator.clipboard.write) {
          const clipboardItem = new ClipboardItem({ [blob.type]: blob });
          await navigator.clipboard.write([clipboardItem]);

          toast.success('Image copied to clipboard!', {
            id: loadingToast,
            style: { borderRadius: '100px', background: '#2a2a2a', color: '#00D547' },
          });
        } else {
          throw new Error('Clipboard API is not supported in this browser.');
        }
      }
    } catch (error) {
      console.error('Failed to copy image:', error);
      toast.error('Failed to copy image. Please try again.', {
        id: loadingToast,
        style: { borderRadius: '100px', background: '#2a2a2a', color: '#FF5959' },
      });
    } finally {
      setDisableExportActions(false);
    }
  };

  useShortcut(os, [os === 'mac' ? 'Meta' : 'Control', 'e'], handleExport);
  useShortcut(os, [os === 'mac' ? 'Meta' : 'Control', 'c'], handleCopy);
  

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
            title='Export Mockup (Ctrl + E)'
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
            tipTitle='Copy Mockup (Ctrl + C)'
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