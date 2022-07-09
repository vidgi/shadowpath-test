import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, ContactShadows, OrbitControls } from "@react-three/drei";
import { LayerMaterial, Color, Depth, Noise } from "lamina";

export default function App() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 20, 10] }} style={{ height: "100vh", width: "100vw" }}>
      <OrbitControls enablePan={false} minDistance={5} maxDistance={20} autoRotate={false} />
      <pointLight position={[10, 10, 5]} />
      <pointLight position={[-10, -10, -5]} />
      <ambientLight intensity={0.4} />
      <group position={[0, -1.5, 0]}>
        <Float position={[0, 10, 0]} speed={1} rotationIntensity={5} floatIntensity={20}>
          <mesh transform rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <torusKnotGeometry args={[3, 0.1, 1000, 20, 10, 500]} />
            <meshStandardMaterial color="white" roughness={0.01} metalness={0.925} />
          </mesh>
        </Float>

        <Float position={[0, 10, 0]} speed={1} rotationIntensity={30} floatIntensity={2}>
          <mesh transform rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
            <torusKnotGeometry args={[0.5, 0.05, 1000, 20, 10, 100]} />
            <meshStandardMaterial color="white" roughness={0.01} metalness={0.925} />
          </mesh>
        </Float>

        <Float position={[0, 10, 0]} speed={0.5} rotationIntensity={20} floatIntensity={2}>
          <mesh transform rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
            <torusKnotGeometry args={[1.5, 0.05, 1000, 20, 5, 200]} />

            <meshStandardMaterial color="white" roughness={0.01} metalness={0.925} />
          </mesh>
        </Float>

        <Float position={[0, 10, 0]} speed={0.25} rotationIntensity={10} floatIntensity={2}>
          <mesh transform rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
            <torusKnotGeometry args={[3, 0.05, 1000, 20, 5, 2]} />

            <meshStandardMaterial color="white" roughness={0.01} metalness={0.925} />
          </mesh>
        </Float>
        <ContactShadows scale={10} blur={0.1} opacity={0.5} far={100} />
      </group>

      {/* We're building a cube-mapped environment declaratively.
          Anything you put in here will be filmed (once) by a cubemap-camera
          and applied to the scenes environment, and optionally background. */}
      <Environment background resolution={64}>
        {/* <Striplight position={[0, 200, 0]} scale={[1, 3, 10]} /> */}
        <Noise mapping="local" type="cell" alpha={0.4} scale={0.5} mode="softlight" />

        {/* <Striplight position={[10, 2, 0]} scale={[1, 3, 10]} /> */}
        {/* <Striplight position={[-10, 2, 0]} scale={[1, 3, 10]} /> */}
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <LayerMaterial side={THREE.BackSide}>
            <Color color="blue" alpha={1} mode="normal" />
            <Depth colorA="#00ffff" colorB="#ff8f00" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
            <Noise mapping="local" type="cell" alpha={0.4} scale={0.5} mode="softlight" />
          </LayerMaterial>
        </mesh>
        {/* <mesh receiveShadow>
          <planeGeometry args={[1000, 1000]} />
          <MeshReflectorMaterial
            color="#878790"
            blur={[400, 400]}
            resolution={1024}
            mixBlur={1}
            mixStrength={3}
            depthScale={1}
            minDepthThreshold={0.85}
            metalness={0}
            roughness={1}
          />
        </mesh> */}
        {/* <group position={[0, -3.5, 0]}>
          <mesh receiveShadow castShadow>
            <boxBufferGeometry attach="geometry" args={[4, 1, 1]} />
            <meshStandardMaterial attach="material" />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" transparent opacity={0.4} />
          </mesh>
          <Spheres />
        </group> */}
      </Environment>
    </Canvas>
  );
}

// function Striplight(props) {
//   return (
//     <mesh {...props}>
//       <boxGeometry />
//       <meshBasicMaterial color="white" />
//     </mesh>
//   );
// }
