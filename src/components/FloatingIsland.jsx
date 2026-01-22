import { useGLTF, useTexture, shaderMaterial } from "@react-three/drei";
import { useFrame, extend } from "@react-three/fiber";
import { useRef, useMemo, memo } from "react";
import { RigidBody, } from "@react-three/rapier";
import * as THREE from 'three';
import portalVertexShaders from '../shaders/portal/vertex.glsl';
import fragmentShader from '../shaders/portal/fragment.glsl';
import { BarrierWalls } from './BarrierWalls';

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ffffff'),
        uColorEnd: new THREE.Color('#6e1c83')
    },
    portalVertexShaders,
    fragmentShader
)

extend({ PortalMaterial })

const Ground = memo(({ node, texture, flipY }) => {
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
});

const House = memo(({ node, texture, flipY }) => {
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
});

const Portal = memo(({ node, texture, flipY, }) => {
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
});

const PortalLight = memo(({ node, portalRef }) => {
    return (
        <RigidBody type="fixed" colliders="trimesh">
            <mesh
                geometry={node.geometry}
                position={node.position}
                rotation={node.rotation}
                scale={node.scale}
            >
                <portalMaterial ref={portalRef} />
            </mesh>
        </RigidBody>
    );
});



export const FloatingIsland = () => {
    const { nodes } = useGLTF("/model/floating_island.glb");
    const groundTexture = useTexture("/model/Ground.png");
    const houseTexture = useTexture("/model/House.png");
    const portalTexture = useTexture("/model/Baked.jpg");

    // Optimize textures
    useMemo(() => {
        [groundTexture, houseTexture, portalTexture].forEach(texture => {
            texture.anisotropy = 1; // Reduce anisotropic filtering
            texture.generateMipmaps = true;
        });
    }, [groundTexture, houseTexture, portalTexture]);
    const portalMaterialRef = useRef();

    useFrame((state, delta) => {
        if (portalMaterialRef.current) {
            portalMaterialRef.current.uTime += delta * 0.5;
        }
    });
    const islandRef = useRef();

    // Categorize nodes by type
    const { groundNodes, houseNodes, portalNodes, portalLightNodes } = useMemo(() => {
        const ground = [];
        const house = [];
        const portal = [];
        const portalLight = [];


        Object.keys(nodes).forEach((key) => {
            const node = nodes[key];
            if (node.isMesh) {
                const nodeName = node.name.toLowerCase();
                if (nodeName.includes("ground")) {
                    ground.push(node);
                } else if (nodeName.includes("house")) {
                    house.push(node);
                } else if (nodeName.includes("portal_light_geometry")) {
                    portalLight.push(node);
                } else if (nodeName.includes("portal")) {
                    portal.push(node);
                }
            }
        });

        return { groundNodes: ground, houseNodes: house, portalNodes: portal, portalLightNodes: portalLight };
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

            {portalLightNodes.map((node) => (
                <PortalLight key={node.uuid} portalRef={portalMaterialRef} node={node} />
            ))}

            {/* Invisible barrier walls to prevent falling off */}
            <BarrierWalls />
        </group>
    );
};
useGLTF.preload('/model/floating_island.glb');