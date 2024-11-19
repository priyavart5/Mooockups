'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/HomeStyles.module.scss';
import Link from 'next/link';
import Image from 'next/image';


const Homepage = () => {

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
      <Link href="/MockLab" ><button className={styles.button} >MockLab</button></Link>
    </main>
  );
};

export default Homepage;