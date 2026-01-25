// Infinite.jsx with ecctrl character controller

import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import Ecctrl from '../ecctrl/src/Ecctrl'

export function Infinite({ disableControl = false, savedPosition, ...props }) {
    const { nodes, materials } = useGLTF('/model/Infinite.glb')
    const characterRef = useRef()

    // Apply saved position when component mounts or savedPosition changes
    useEffect(() => {
        if (savedPosition && characterRef.current && characterRef.current.group) {
            characterRef.current.group.setTranslation({ 
                x: savedPosition[0], 
                y: savedPosition[1], 
                z: savedPosition[2] 
            }, true);
            // Also reset velocity
            characterRef.current.group.setLinvel({ x: 0, y: 0, z: 0 }, true);
            characterRef.current.group.setAngvel({ x: 0, y: 0, z: 0 }, true);
        }
    }, [savedPosition]);

    // Freeze character when disableControl becomes true
    useEffect(() => {
        if (disableControl && characterRef.current && characterRef.current.group) {
            // Set velocity to zero immediately
            characterRef.current.group.setLinvel({ x: 0, y: 0, z: 0 }, true);
            characterRef.current.group.setAngvel({ x: 0, y: 0, z: 0 }, true);
        }
    }, [disableControl]);

    return (
        <Ecctrl
            ref={characterRef}
            capsuleHalfHeight={0.5}
            capsuleRadius={0.3}
            floatHeight={0.1}
            floatingDis={0.24}
            position={savedPosition || [2, 0, 25]}
            maxVelLimit={8}
            turnVelMultiplier={1}
            turnSpeed={7}
            sprintMult={1.2}
            mode="FixedCamera"
            camInitDis={-3.5}
            camMaxDis={-7}
            camMinDis={-3}
            camInitDir={{ x: 0.5, y: -3, z: 0 }}
            disableControl={disableControl}
            animated
            {...props}
        >
            {/* Character model - rotated 180 degrees to face correct direction */}
            <group>
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