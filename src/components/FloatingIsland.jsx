import { useGLTF, useTexture, shaderMaterial } from "@react-three/drei";
import { useFrame, extend } from "@react-three/fiber";
import { useRef, useMemo, useEffect, memo } from "react";
import { useControls } from "leva";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import * as THREE from 'three';
import portalVertexShaders from '../shaders/portal/vertex.glsl';
import fragmentShader from '../shaders/portal/fragment.glsl';
import { BarrierWalls } from './BarrierWalls';
import { Question } from './Question';
import { v4 as uuidv4 } from 'uuid';

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
    console.log(JSON.stringify(node))
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

const Signs = memo(({ node, texture, flipY }) => {
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

export const FloatingIsland = () => {
    const { nodes } = useGLTF("/model/floating_island.glb");
    const groundTexture = useTexture("/model/Ground.png");
    const houseTexture = useTexture("/model/House.png");
    const portalTexture = useTexture("/model/Baked.jpg");
    const signsTexture = useTexture("/model/Signs.png");

    // Optimize textures
    useMemo(() => {
        [groundTexture, houseTexture, portalTexture, signsTexture].forEach(texture => {
            texture.anisotropy = 1; // Reduce anisotropic filtering
            texture.generateMipmaps = true;
        });
    }, [groundTexture, houseTexture, portalTexture, signsTexture]);
    const portalMaterialRef = useRef();

    const questionPosition = useControls('Question Position', {
        x: { value: 5, min: -25, max: 25, step: 0.5 },
        z: { value: 5, min: -25, max: 25, step: 0.5 }
    });

    useFrame((state, delta) => {
        if (portalMaterialRef.current) {
            portalMaterialRef.current.uTime += delta * 0.5;
        }
    });
    const islandRef = useRef();

    // Categorize nodes by type
    const { groundNodes, houseNodes, portalNodes, portalLightNodes, signsNodes } = useMemo(() => {
        const ground = [];
        const house = [];
        const portal = [];
        const portalLight = [];
        const signs = [];


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
                } else if (nodeName.includes("signs")) {
                    signs.push(node);
                }
            }
        });

        return { groundNodes: ground, houseNodes: house, portalNodes: portal, signsNodes: signs, portalLightNodes: portalLight };
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

            {signsNodes.map((node) => (
                <Signs key={node.uuid} node={node} texture={signsTexture} flipY={false} />
            ))}

            {/* Question Mark */}
            <Question key={uuidv4()} position={{ x: -0.5, z: 19 }} hasPassed={false} />
            <Question key={uuidv4()} position={{ x: -23, z: -10 }} hasPassed={false} />
            <Question key={uuidv4()} position={{ x: -2, z: -4 }} hasPassed={false} />
            <Question key={uuidv4()} position={{ x: 18, z: -13 }} hasPassed={false} />

            {/* Invisible barrier walls to prevent falling off */}
            <BarrierWalls />
        </group>
    );
};
useGLTF.preload('/model/floating_island.glb');