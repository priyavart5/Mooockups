'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/HomeStyles.module.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


const Homepage = () => {

  const router = useRouter();

  const [currentImage, setCurrentImage] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev == 5 ? 1 : prev + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <main className={styles.homepage}>
      <h1 className={styles.heading}>
        Transform Your Concepts<br />
        <span className={styles.headingWrapper}>
          Into{' '}
          <Image
            src={`/hp_0${currentImage}.avif`}
            alt={'heading_image'}
            className={`${styles.heading_image} ${styles.zoom}`}
            width={100}
            height={40}
          />
          Visuals
        </span>
      </h1>
      <p className={styles.description}>Explore our revolutionary mockup editor!</p>
      <div style={{ display: 'flex', gap: '20px'}}>
        {/* <button onClick={() => router.push('/MockFit')} className={styles.button} >MockFit</button> */}
        <button onClick={() => router.push('/MockLab')} className={styles.button} >MockLab</button>
      </div>
    </main>
  );
};

export default Homepage;