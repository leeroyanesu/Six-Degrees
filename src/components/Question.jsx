import { useGLTF, useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const Question = ({ position, hasPassed = false, onPlayerEnter }) => {
    const { nodes } = useGLTF("/model/Question_mark.glb");
    const texture = useTexture("/model/question_mark.png");
    const meshRef = useRef();
    const glowRef = useRef();
    const sensorRef = useRef();
    
    texture.flipY = false;
    texture.needsUpdate = true;    
    
    useFrame((state, delta) => {
        if (!hasPassed && meshRef.current) {
            // Rotate the question mark
            meshRef.current.rotation.y += delta * 1.5;
            
            // Floating animation
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
        }
        
        // Pulsing glow effect
        if (!hasPassed && glowRef.current) {
            glowRef.current.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
        }
    });

    const handleIntersection = ({ other }) => {
        console.log("=== Intersection Detected ===");
        console.log("Other object:", other);
        console.log("RigidBody object:", other.rigidBodyObject);
        console.log("RigidBody name:", other.rigidBodyObject?.name);
        
        // Trigger the callback - no name check needed
        if (onPlayerEnter) {
            console.log("Calling onPlayerEnter callback");
            onPlayerEnter();
        }
    };

    // Hide the question if it has been passed - moved after all hooks
    if (hasPassed) return null;

    return (
        <group position={[position.x, 0, position.z]}>
            {/* Sensor to detect player proximity */}
            <RigidBody 
                ref={sensorRef}
                type="fixed" 
                sensor 
                onIntersectionEnter={handleIntersection}
                colliders="ball"
                name="questionSensor"
            >
               <mesh
                ref={meshRef}
                geometry={nodes.Icosphere.geometry}
                position={nodes.Icosphere.position}
                rotation={nodes.Icosphere.rotation}
                scale={nodes.Icosphere.scale}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    ref={glowRef}
                    map={texture}
                    emissive="#ffff00"
                    emissiveIntensity={0.5}
                    toneMapped={false}
                />
            </mesh>
            {/* Glow sphere behind the question mark */}
            <mesh position={[0, 0, 0]} scale={1.5}>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshBasicMaterial 
                    color="#ffff00"
                    transparent
                    opacity={0.15}
                />
            </mesh>
            </RigidBody>
           
            
            
        </group>
    );
};

useGLTF.preload('/model/Question_mark.glb');