import React, { forwardRef, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import styles from './styles.module.scss';
import { Canvas as ThreeCanvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import image from '../../../../public/hh.png';

const Demo = () => {
  const { nodes, materials } = useGLTF('/untitle.glb');

  const texture = useLoader(THREE.TextureLoader, image.src);

  return (
    <group>
      {/* <mesh geometry={nodes.Plane.geometry} material={nodes.Plane.material} scale={0.2} /> */}
      {/* <mesh geometry={nodes.Plane.geometry} scale={0.2} rotation={[0,3.2,0]} position={[0,0.017,-0.2]} >
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>
      <mesh
        geometry={nodes['mockfitImage-min'].geometry}
        material={materials['mockfitImage-min']}
        scale={1.5}
      /> */}
      <mesh
        geometry={nodes.Plane.geometry}
        // material={materials['Material.002']}
        position={[-0.008, -0.01, -0.606]}
        scale={0.655}
        rotation={[0,3.15,0]}
      >
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>
      <mesh
        geometry={nodes.mockfitImage.geometry}
        material={materials.mockfitImage}
        scale={5.019}
      />
    </group>
  );
};
useGLTF.preload('/untitle.glb');

const Canvas = forwardRef<HTMLDivElement>((_, ref) => {
  const { selectedMockup, importFile } = useSelector((state: RootState) => state.mockFit.present);
  const mockupRef = useRef<HTMLImageElement>(null);
  const [mockupDimensions, setMockupDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (mockupRef.current) {
      const { width, height } = mockupRef.current.getBoundingClientRect();
      setMockupDimensions({ width, height });
    }
  }, [selectedMockup.mockupSrc]);

  return (
    <div className={styles.canvas}>
      <div className={styles.canvasSafeArea}>
        <div className={styles.previewframe} style={{ aspectRatio: 1000 / 1500 }}>
          <div className={styles.frameContent} ref={ref} >
            <ThreeCanvas style={{ width:'100%', height: '100%'}} camera={{ position: [0, 90, 0], fov: 3 }}>
              <Environment preset='warehouse' />
              <axesHelper args={[5]} />
              {/* <OrbitControls /> */}
              <Demo/>
            </ThreeCanvas>
          </div>
        </div>
      </div>
    </div>
  );
});

Canvas.displayName = 'Canvas';
export default Canvas;
