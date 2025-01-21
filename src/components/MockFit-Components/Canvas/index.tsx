import React, {forwardRef} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Image from 'next/image';
import styles from './styles.module.scss'


const Canvas = forwardRef<HTMLDivElement>((_, ref) => {

  const { selectedMockup, importFile } = useSelector((state: RootState) => state.mockFit.present);

  return (
    <>
    <div className={styles.MockFit_Canvas} ref={ref}  >
      <Image
        className={styles.SelectedMockup}
        src={selectedMockup.mockupSrc}
        alt={selectedMockup.mockupName}
        fill
        />
        {
          importFile.file && (
            <div style={{aspectRatio: 3456/2234}}  className={styles.importedImageContainer}>
              <Image
                className={styles.importedImage}
                src={importFile.file}
                alt={importFile.fileName}
                fill
              />
            </div>
          )
        }
    </div>
    </>
  )
})

Canvas.displayName = 'Canvas';
export default Canvas;
