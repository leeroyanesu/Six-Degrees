// Infinite.jsx with ecctrl character controller

import React, { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import Ecctrl from '../ecctrl/src/Ecctrl'

export function Infinite({ ...props }) {
    const { nodes, materials } = useGLTF('/model/Infinite.glb')
    const characterRef = useRef()

    return (
        <Ecctrl
            key={`Infinite_Char`}
            ref={characterRef}
            capsuleHalfHeight={0.5}
            capsuleRadius={0.3}
            floatHeight={0.1}
            floatingDis={0.24}
            position={[2, 0, 25]}
            maxVelLimit={8}
            turnVelMultiplier={1}
            turnSpeed={7}
            sprintMult={1.2}
            mode="FixedCamera"
            camInitDis={-3.5}
            camMaxDis={-7}
            camMinDis={-3}
            camInitDir={{ x: 0.5, y: -3, z: 0 }}
            {...props}
        >
            {/* Character model - rotated 180 degrees to face correct direction */}
            <group >
                <mesh
                    name="infi"
                    castShadow
                    receiveShadow
                    geometry={nodes.infi.geometry}
                    material={materials.Material}
                    morphTargetDictionary={nodes.infi.morphTargetDictionary}
                    morphTargetInfluences={nodes.infi.morphTargetInfluences}
                />
            </group>
        </Ecctrl>
    )
}

useGLTF.preload('/model/Infinite.glb')