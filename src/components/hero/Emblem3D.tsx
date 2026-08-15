"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/**
 * The signature: a 3D brushed-brass medallion in a dark studio.
 * Extruded brass body, olive arrowhead inlay, rank chevrons flanking.
 * It drifts ~8° on its Y axis and tilts toward the cursor with spring
 * physics; a warm key light arcs across the metal so a specular highlight
 * sweeps the brass. Volumetric olive-to-bone air ribbons flow past it.
 *
 * No blue in any light or reflection — the environment is built from warm
 * bone/brass Lightformers only (no external HDR fetch), so reflections stay
 * metallic and warm.
 */

const BRASS = "#A97939";
const BRASS_LIGHT = "#E0B478";
const OLIVE = "#3E461F";

function arrowheadShape(): THREE.Shape {
  // Arrowhead shield, centered near origin, ~1.4 tall.
  const s = new THREE.Shape();
  s.moveTo(0, 0.72);
  s.lineTo(0.5, 0.4);
  s.lineTo(0.5, -0.1);
  s.quadraticCurveTo(0.5, -0.55, 0, -0.85);
  s.quadraticCurveTo(-0.5, -0.55, -0.5, -0.1);
  s.lineTo(-0.5, 0.4);
  s.lineTo(0, 0.72);
  return s;
}

function Medallion({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const keyLight = useRef<THREE.PointLight>(null);
  const tilt = useRef({ x: 0, y: 0 });

  const shieldGeo = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(arrowheadShape(), {
      depth: 0.14,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 3,
      steps: 1,
    });
    geo.center();
    return geo;
  }, []);

  const brassMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: BRASS,
        metalness: 1,
        roughness: 0.34,
        envMapIntensity: 1.15,
      }),
    [],
  );
  const brassBright = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: BRASS_LIGHT,
        metalness: 1,
        roughness: 0.28,
        envMapIntensity: 1.25,
      }),
    [],
  );
  const oliveMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: OLIVE,
        metalness: 0.55,
        roughness: 0.55,
        envMapIntensity: 0.7,
      }),
    [],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;

    // ~8° continuous drift on Y.
    const drift = Math.sin(t * 0.35) * THREE.MathUtils.degToRad(8);

    // Spring toward pointer target.
    const targetY = pointer.current.x * 0.35;
    const targetX = -pointer.current.y * 0.28;
    tilt.current.x += (targetX - tilt.current.x) * Math.min(1, delta * 4);
    tilt.current.y += (targetY - tilt.current.y) * Math.min(1, delta * 4);

    g.rotation.y = drift + tilt.current.y;
    g.rotation.x = tilt.current.x;

    // Warm key light arcs across so the specular highlight sweeps the metal.
    if (keyLight.current) {
      keyLight.current.position.x = Math.sin(t * 0.6) * 4.2;
      keyLight.current.position.y = 2.4 + Math.cos(t * 0.6) * 0.8;
    }
  });

  return (
    <>
      {/* Warm sweeping key light (pale bone, never blue) */}
      <pointLight
        ref={keyLight}
        color={"#FFF2D6"}
        intensity={90}
        distance={18}
        position={[3, 3, 4]}
      />
      <group ref={group}>
        {/* Medallion body */}
        <mesh material={brassMat} castShadow>
          <cylinderGeometry args={[1.5, 1.5, 0.24, 96]} />
        </mesh>
        {/* rotate the disk so its flat face points at camera (+z) */}
        <group rotation={[Math.PI / 2, 0, 0]}>
          {/* Raised rim */}
          <mesh material={brassBright} position={[0, 0.12, 0]}>
            <torusGeometry args={[1.44, 0.055, 20, 96]} />
          </mesh>
          {/* Inner recessed ring */}
          <mesh material={brassMat} position={[0, 0.11, 0]}>
            <torusGeometry args={[1.16, 0.03, 16, 96]} />
          </mesh>
        </group>

        {/* Olive arrowhead inlay, proud of the face */}
        <mesh
          geometry={shieldGeo}
          material={oliveMat}
          position={[0, 0, 0.16]}
          scale={0.92}
        />
        {/* Brass eagle stand-in: a raised brass diamond at the shield center */}
        <mesh material={brassBright} position={[0, 0.08, 0.26]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.34, 0.34, 0.08]} />
        </mesh>

        {/* Rank chevrons — olive left, brass right */}
        {[0, 1, 2].map((i) => (
          <group key={`cl${i}`}>
            <mesh
              material={oliveMat}
              position={[-1.02 - i * 0.02, 0.18 - i * 0.24, 0.12]}
              rotation={[0, 0, -Math.PI / 4]}
            >
              <boxGeometry args={[0.36, 0.07, 0.07]} />
            </mesh>
            <mesh
              material={oliveMat}
              position={[-1.22 - i * 0.02, 0.02 - i * 0.24, 0.12]}
              rotation={[0, 0, Math.PI / 4]}
            >
              <boxGeometry args={[0.36, 0.07, 0.07]} />
            </mesh>
          </group>
        ))}
        {[0, 1, 2].map((i) => (
          <group key={`cr${i}`}>
            <mesh
              material={brassBright}
              position={[1.02 + i * 0.02, 0.18 - i * 0.24, 0.12]}
              rotation={[0, 0, Math.PI / 4]}
            >
              <boxGeometry args={[0.36, 0.07, 0.07]} />
            </mesh>
            <mesh
              material={brassBright}
              position={[1.22 + i * 0.02, 0.02 - i * 0.24, 0.12]}
              rotation={[0, 0, -Math.PI / 4]}
            >
              <boxGeometry args={[0.36, 0.07, 0.07]} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}

function AirRibbons({ count = 46 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const ribbons = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const y = THREE.MathUtils.randFloatSpread(6);
      const z = THREE.MathUtils.randFloat(-2.5, 2.5);
      const speed = THREE.MathUtils.randFloat(0.4, 1.3);
      const width = THREE.MathUtils.randFloat(0.006, 0.02);
      const length = THREE.MathUtils.randFloat(1.4, 3.2);
      const curve = THREE.MathUtils.randFloatSpread(0.6);
      const mix = Math.random(); // olive -> bone
      const color = new THREE.Color(OLIVE).lerp(new THREE.Color("#EDE7DA"), mix);
      const opacity = THREE.MathUtils.randFloat(0.05, 0.14);
      const offset = Math.random() * 12;
      arr.push({ y, z, speed, width, length, curve, color, opacity, offset });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const span = Math.max(12, viewport.width * 1.4);
    const t = state.clock.elapsedTime;
    g.children.forEach((child, i) => {
      const r = ribbons[i];
      const x = (((t * r.speed + r.offset) % (span * 1.4)) - span * 0.7);
      child.position.x = x;
      child.position.y = r.y + Math.sin(t * 0.5 + r.offset) * r.curve * 0.3;
    });
  });

  return (
    <group ref={group}>
      {ribbons.map((r, i) => (
        <mesh key={i} position={[0, r.y, r.z]}>
          <boxGeometry args={[r.length, r.width, r.width]} />
          <meshBasicMaterial
            color={r.color}
            transparent
            opacity={r.opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Emblem3D({
  pointer,
  frameloop = "always",
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  frameloop?: "always" | "never" | "demand";
}) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#0B0C08"]} />
      <ambientLight intensity={0.25} color={"#EDE7DA"} />
      <directionalLight position={[-4, 2, 3]} intensity={0.6} color={"#E0B478"} />

      {/* Warm procedural environment for metallic reflections — no HDR fetch */}
      <Environment resolution={256}>
        <Lightformer intensity={2} color="#FFF2D6" position={[0, 3, 4]} scale={[8, 3, 1]} />
        <Lightformer intensity={1.1} color="#E0B478" position={[-4, 0, 2]} scale={[3, 6, 1]} />
        <Lightformer intensity={0.8} color="#6C7A38" position={[4, -1, 2]} scale={[3, 5, 1]} />
        <Lightformer intensity={0.5} color="#5E4119" position={[0, -3, 1]} scale={[8, 2, 1]} />
      </Environment>

      <Medallion pointer={pointer} />
      <AirRibbons />
    </Canvas>
  );
}
