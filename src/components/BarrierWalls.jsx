import { RigidBody, CuboidCollider } from "@react-three/rapier";

export const BarrierWalls = () => {
    return (
        <RigidBody type="fixed" colliders={false}>
            {/* Wall 1 */}
           <CuboidCollider
                    args={[5.4, 3, 0.1]}
                    position={[-5.3, 3, -23.5]}
                    rotation={[0,0.07,0]}
                />

            {/* Wall 2 */}
            <CuboidCollider
                    args={[12.0, 3, 0.1]}
                    position={[8, 3, -20.9]}
                    rotation={[0, -0.32, 0]}
                />

            {/* Wall 3 */}
              <CuboidCollider
                    args={[0.1, 3, 6]}
                    position={[22, 3, -14.0]}
                    rotation={[0, -2.45, 0]}
                />

            {/* Wall 4 */}
             <CuboidCollider
                    args={[0.1, 3, 5.5]}
                    position={[26.0, 3, -4.0]}
                    rotation={[0, 0.05, 0]}
                />

            {/* Wall 5 */}
            <CuboidCollider
                    args={[6, 3, 0.1]}
                    position={[23.0, 3, 5]}
                    rotation={[0, -2.2, 0]}
                />

            {/* Wall 6 */}
            <CuboidCollider
                    args={[5.2, 3, 0.1]}
                    position={[18.0, 3, 14.8]}
                    rotation={[0, 1.3, 0]}
                />

            {/* Wall 7 */}
            <CuboidCollider
                    args={[5.5, 3, 0.1]}
                    position={[12.5, 3, 23]}
                    rotation={[0, 0.7, 0]}
                />

            {/* Wall 8 */}
            <CuboidCollider
                    args={[5.6, 3, 0.1]}
                    position={[3, 3, 27.2]}
                    rotation={[0, 0.15, 0]}
                />

            {/* Wall 9 */}
            <CuboidCollider
                    args={[5.8, 3, 0.1]}
                    position={[-8.2, 3, 27]}
                    rotation={[0, -0.22, 0]}
                />

            {/* Wall 10 */}
            <CuboidCollider
                    args={[5.7, 3, 0.1]}
                    position={[-18.2, 3, 22]}
                    rotation={[0, -0.69, 0]}
                />

            {/* Wall 11 */}
            <CuboidCollider
                    args={[0.1, 3, 4.8]}
                    position={[-25.2, 3, 15.1]}
                    rotation={[0, 0.69, 0]}
                />

            {/* Wall 12 */}
            <CuboidCollider
                    args={[0.1, 3, 12]}
                    position={[-28.1, 3, 0]}
                    rotation={[0, 0, 0]}
                />

            {/* Wall 13 */}
            <CuboidCollider
                    args={[6.5, 3, 0.1]}
                    position={[-23.9, 3, -14.5]}
                    rotation={[0, 0.8, 0]}
                />

            {/* Wall 14 */}
            <CuboidCollider
                    args={[5.4, 3, 0.1]}
                    position={[-15.0, 3, -21.0]}
                    rotation={[0, 0.45, 0]}
                />

            {/* Bottom floor (fallback) */}
            <CuboidCollider
                args={[28, 0.1, 28]}
                position={[0, 0, 0]}
            />
        </RigidBody>
    );
};
