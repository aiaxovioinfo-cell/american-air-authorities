"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { EMBLEM } from "@/lib/emblemGeometry";

/**
 * The signature: the REAL American Air Authorities mark, extruded in 3D and
 * lit like a machined brass-and-olive badge in a dark studio. The olive "A"
 * (with the eagle head as a genuine see-through cutout) and the three wing
 * bars each side are each extruded from the pixel-traced geometry in
 * src/lib/emblemGeometry.ts, using the exact colors sampled from the file.
 *
 * The whole piece drifts ~8° on Y and tilts toward the cursor with spring
 * physics; a warm key light arcs across so a specular highlight sweeps the
 * metal. Volumetric olive-to-bone air ribbons flow past — and through the
 * eagle cutout. No blue in any light or reflection.
 */

const OLIVE = EMBLEM.colors.olive; // #3E461F
const BRASS = EMBLEM.colors.brass; // #A97939

// Center + flip the 195x99 image-space geometry into world space (Y up).
const CX = EMBLEM.viewW / 2;
const CY = EMBLEM.viewH / 2;
const SCALE = 3.0 / EMBLEM.viewW;

function shapeFrom(pts: readonly (readonly number[])[]): THREE.Shape {
  const s = new THREE.Shape();
  pts.forEach(([x, y], i) => {
    const X = (x - CX) * SCALE;
    const Y = (CY - y) * SCALE; // flip Y for three.js
    if (i === 0) s.moveTo(X, Y);
    else s.lineTo(X, Y);
  });
  s.closePath();
  return s;
}

const EXTRUDE = {
  depth: 0.16,
  bevelEnabled: true,
  bevelThickness: 0.025,
  bevelSize: 0.022,
  bevelSegments: 2,
  steps: 1,
};

function EmblemMesh({
  pointer,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const keyLight = useRef<THREE.PointLight>(null);
  const tilt = useRef({ x: 0, y: 0 });

  const oliveGeo = useMemo(
    () => new THREE.ExtrudeGeometry(shapeFrom(EMBLEM.oliveMain), EXTRUDE),
    [],
  );
  const oliveBarGeos = useMemo(
    () => EMBLEM.oliveBars.map((b) => new THREE.ExtrudeGeometry(shapeFrom(b), EXTRUDE)),
    [],
  );
  const brassBarGeos = useMemo(
    () => EMBLEM.brassBars.map((b) => new THREE.ExtrudeGeometry(shapeFrom(b), EXTRUDE)),
    [],
  );

  const brassMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: BRASS,
        metalness: 1,
        roughness: 0.33,
        envMapIntensity: 1.2,
      }),
    [],
  );
  const oliveMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: OLIVE,
        metalness: 0.85,
        roughness: 0.42,
        envMapIntensity: 0.95,
      }),
    [],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const drift = Math.sin(t * 0.35) * THREE.MathUtils.degToRad(8);

    const targetY = pointer.current.x * 0.35;
    const targetX = -pointer.current.y * 0.28;
    tilt.current.x += (targetX - tilt.current.x) * Math.min(1, delta * 4);
    tilt.current.y += (targetY - tilt.current.y) * Math.min(1, delta * 4);

    g.rotation.y = drift + tilt.current.y;
    g.rotation.x = tilt.current.x;

    if (keyLight.current) {
      keyLight.current.position.x = Math.sin(t * 0.6) * 4.4;
      keyLight.current.position.y = 2.2 + Math.cos(t * 0.6) * 0.9;
    }
  });

  return (
    <>
      <pointLight
        ref={keyLight}
        color={"#FFF2D6"}
        intensity={95}
        distance={20}
        position={[3, 3, 4]}
      />
      <group ref={group}>
        {/* Olive "A" + eagle cutout */}
        <mesh geometry={oliveGeo} material={oliveMat} />
        {/* Olive wing bars (left) */}
        {oliveBarGeos.map((geo, i) => (
          <mesh key={`o${i}`} geometry={geo} material={oliveMat} />
        ))}
        {/* Brass wing bars (right) */}
        {brassBarGeos.map((geo, i) => (
          <mesh key={`b${i}`} geometry={geo} material={brassMat} />
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
      const z = THREE.MathUtils.randFloat(-2.5, 1.5);
      const speed = THREE.MathUtils.randFloat(0.4, 1.3);
      const width = THREE.MathUtils.randFloat(0.006, 0.02);
      const length = THREE.MathUtils.randFloat(1.4, 3.2);
      const curve = THREE.MathUtils.randFloatSpread(0.6);
      const mix = Math.random();
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
      const x = ((t * r.speed + r.offset) % (span * 1.4)) - span * 0.7;
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
      <ambientLight intensity={0.28} color={"#EDE7DA"} />
      <directionalLight position={[-4, 2, 3]} intensity={0.6} color={"#E0B478"} />

      {/* Warm procedural environment for metallic reflections — no HDR fetch */}
      <Environment resolution={256}>
        <Lightformer intensity={2} color="#FFF2D6" position={[0, 3, 4]} scale={[8, 3, 1]} />
        <Lightformer intensity={1.1} color="#E0B478" position={[-4, 0, 2]} scale={[3, 6, 1]} />
        <Lightformer intensity={0.8} color="#6C7A38" position={[4, -1, 2]} scale={[3, 5, 1]} />
        <Lightformer intensity={0.5} color="#5E4119" position={[0, -3, 1]} scale={[8, 2, 1]} />
      </Environment>

      <EmblemMesh pointer={pointer} />
      <AirRibbons />
    </Canvas>
  );
}
