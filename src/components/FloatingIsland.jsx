import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import { useControls } from "leva";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

const Ground = ({ node, texture, flipY }) => {
    texture.flipY = flipY;
    texture.needsUpdate = true;

    return (
        <RigidBody type="fixed" colliders="trimesh">
            <mesh
                geometry={node.geometry}
                position={node.position}
                rotation={node.rotation}
                scale={node.scale}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial map={texture} />
            </mesh>
        </RigidBody>
    );
};

const House = ({ node, texture, flipY }) => {
    texture.flipY = flipY;
    texture.needsUpdate = true;

    return (
        <RigidBody type="fixed" colliders="trimesh">
            <mesh
                geometry={node.geometry}
                position={node.position}
                rotation={node.rotation}
                scale={node.scale}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial map={texture} />
            </mesh>
        </RigidBody>
    );
};

const Portal = ({ node, texture, flipY }) => {
    texture.flipY = flipY;
    texture.needsUpdate = true;

    return (
        <RigidBody type="fixed" colliders="trimesh">
            <mesh
                geometry={node.geometry}
                position={node.position}
                rotation={node.rotation}
                scale={node.scale}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial map={texture} />
            </mesh>
        </RigidBody>
    );
};

export const FloatingIsland = () => {
    const { nodes } = useGLTF("/model/floating_island.glb");
    const groundTexture = useTexture("/model/Ground.png");
    const houseTexture = useTexture("/model/House.png");
    const portalTexture = useTexture("/model/Baked.jpg");

    const islandRef = useRef();

    // Categorize nodes by type
    const { groundNodes, houseNodes, portalNodes } = useMemo(() => {
        const ground = [];
        const house = [];
        const portal = [];

        Object.keys(nodes).forEach((key) => {
            const node = nodes[key];
            if (node.isMesh) {
                const nodeName = node.name.toLowerCase();
                if (nodeName.includes("ground")) {
                    ground.push(node);
                } else if (nodeName.includes("house")) {
                    house.push(node);
                } else if (nodeName.includes("portal")) {
                    portal.push(node);
                }
            }
        });

        return { groundNodes: ground, houseNodes: house, portalNodes: portal };
    }, [nodes]);


    return (
        <group ref={islandRef}>
            {/* Main Island (ground) */}
            {groundNodes.map((node) => (
                <Ground key={node.uuid} node={node} texture={groundTexture} flipY={false} />
            ))}

            {/* House meshes */}
            {houseNodes.map((node) => (
                <House key={node.uuid} node={node} texture={houseTexture} flipY={false} />
            ))}

            {/* Portal meshes */}
            {portalNodes.map((node) => (
                <Portal key={node.uuid} node={node} texture={portalTexture} flipY={false} />
            ))}
            
            {/* Invisible barrier walls to prevent falling off */}
            <RigidBody type="fixed" colliders={false}>
                {/* North wall */}
                <CuboidCollider 
                    args={[28, 3, 0.1]} 
                    position={[0, 3, -28]} 
                />
                
                {/* South wall */}
                <CuboidCollider 
                    args={[28, 3, 0.1]} 
                    position={[0, 3, 28]} 
                />
                {/* East wall */}
                <CuboidCollider 
                    args={[0.1, 3, 28]} 
                    position={[28, 3, 0]} 
                />
                
                {/* West wall */}
                <CuboidCollider 
                    args={[0.1, 3, 28]} 
                    position={[-28, 3, 0]} 
                />
                
                {/* Bottom floor (fallback) */}
                <CuboidCollider 
                    args={[28, 0.1, 28]} 
                    position={[0, 0, 0]} 
                />
            </RigidBody>
        </group>
    );
};
useGLTF.preload('/model/floating_island.glb');