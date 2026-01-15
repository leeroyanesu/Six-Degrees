import { RigidBody, CuboidCollider } from "@react-three/rapier";

export const BarrierWalls = () => {
    return (
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
    );
};
