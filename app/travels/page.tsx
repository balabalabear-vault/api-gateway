'use client'

import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Center } from '@react-three/drei'
import { Geometry, Base } from '@react-three/csg'

import * as THREE from 'three';
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from 'three'

function Earth() {
    const meshRef = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);

    const [albedoMap, bumpMap] = useLoader(THREE.TextureLoader, [
        './earth-texture/Albedo.jpg',
        './earth-texture/Bump.jpg',
    ]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta / 4;
        }
    })

    return (
        <mesh
            visible
            ref={meshRef}
        >
            <Geometry useGroups>
                <Base>
                    <sphereGeometry args={[4, 64, 64]} />
                    <meshStandardMaterial
                        map={albedoMap}
                        bumpMap={bumpMap}
                        bumpScale={0.03}
                        side={THREE.DoubleSide}
                    />
                </Base>
            </Geometry>
        </mesh>
    )
}

function Cloud() {
    const meshRef = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);
    const [cloudsMap] = useLoader(THREE.TextureLoader, [
        './earth-texture/Clouds.png',
    ]);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta / 4;
        }
    })
    return (
        <mesh
            visible
            ref={meshRef}
        >
            <sphereGeometry args={[4.005, 64, 64]} />
            <meshStandardMaterial
                alphaMap={cloudsMap}
                transparent
            />
        </mesh>
    )

}

function Surrounding() {
    const meshRef = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta / 4;
        }
    })

    return (
        <mesh
            visible
            ref={meshRef}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <sphereGeometry args={[4.01, 64, 64]} />
            <meshStandardMaterial
                color={hovered ? "#2196F3" : "#ADDFFF"}
                transparent
                opacity={0.2}
            />
        </mesh>
    )

}

export default function Trips() {
    return (
        <section className='h-dvh'>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[5, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <group>
                    <OrbitControls />
                    <Center>
                        <Earth />
                        <Cloud />
                        <Surrounding />
                    </Center>
                </group>
            </Canvas>
        </section>
    );
}

