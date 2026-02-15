import React from 'react';
import { useGLTF } from '@react-three/drei'

export default function Demo(props : any) {
  const { nodes, materials } = useGLTF('/untitled.glb')

  console.log(nodes);
  return (
    <group {...props}>
     <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={nodes.Plane.material}
        // position={[0, 0, -0.125]}
        scale={0.2}
        
        />
      <mesh
        geometry={nodes['mockfitImage-min'].geometry}
        material={materials['mockfitImage-min']}
        // rotation={[1.6,0,0]}
        scale={1.5}
        // position={[0, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/untitled.glb')