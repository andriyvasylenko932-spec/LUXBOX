"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Float, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function SurpriseBox() {
  const group = useRef<THREE.Group>(null!);
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const logoTex = useLoader(THREE.TextureLoader, "/logo.svg");

  const materials = useMemo(() => {
    const base = new THREE.MeshStandardMaterial({ color: "#f8f7f4", roughness: 0.65, metalness: 0.02 });
    const lid = new THREE.MeshStandardMaterial({ color: "#fbfaf7", roughness: 0.55, metalness: 0.02 });
    const ribbon = new THREE.MeshStandardMaterial({ color: "#111827", roughness: 0.35, metalness: 0.12 });
    const label = new THREE.MeshStandardMaterial({ map: logoTex, roughness: 0.45, metalness: 0.0 });

    logoTex.wrapS = logoTex.wrapT = THREE.ClampToEdgeWrapping;
    logoTex.anisotropy = 8;
    logoTex.needsUpdate = true;

    return { base, lid, ribbon, label };
  }, [logoTex]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    target.current.set(state.pointer.x * 0.35, state.pointer.y * 0.25, 0);
    group.current.position.lerp(target.current, 0.08);
    group.current.rotation.y = t * 0.25 + state.pointer.x * 0.6;
    group.current.rotation.x = 0.15 + state.pointer.y * 0.3;
  });

  return (
    <group ref={group}>
      <RoundedBox args={[1.7, 1.1, 1.7]} radius={0.18} smoothness={6} position={[0, -0.15, 0]}>
        <primitive object={materials.base} attach="material" />
      </RoundedBox>

      <RoundedBox args={[1.78, 0.45, 1.78]} radius={0.18} smoothness={6} position={[0, 0.55, 0]}>
        <primitive object={materials.lid} attach="material" />
      </RoundedBox>

      <RoundedBox args={[0.22, 1.55, 1.82]} radius={0.08} smoothness={6} position={[0, 0.15, 0]}>
        <primitive object={materials.ribbon} attach="material" />
      </RoundedBox>

      <RoundedBox args={[1.82, 1.55, 0.22]} radius={0.08} smoothness={6} position={[0, 0.15, 0]}>
        <primitive object={materials.ribbon} attach="material" />
      </RoundedBox>

      <mesh position={[0, -0.05, 0.86]}>
        <planeGeometry args={[0.9, 0.9]} />
        <primitive object={materials.label} attach="material" />
      </mesh>

      <mesh position={[0.0, 0.78, 0.0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.06, 16, 48]} />
        <primitive object={materials.ribbon} attach="material" />
      </mesh>
      <mesh position={[0.0, 0.78, 0.0]} rotation={[Math.PI / 2, Math.PI / 2, 0]}>
        <torusGeometry args={[0.26, 0.06, 16, 48]} />
        <primitive object={materials.ribbon} attach="material" />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-3xl border border-white/30 bg-white/10 shadow-soft backdrop-blur md:h-[420px]">
      <div className="absolute inset-0">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="absolute -right-28 -bottom-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }}>
          <ambientLight intensity={0.85} />
          <directionalLight position={[3, 4, 2]} intensity={1.25} />
          <directionalLight position={[-3, 2, -2]} intensity={0.65} />
          <Float speed={1.0} rotationIntensity={0.25} floatIntensity={0.55}>
            <SurpriseBox />
          </Float>
          <Environment preset="warehouse" />
        </Canvas>
      </div>

      <div className="absolute inset-0 grid place-items-end p-5">
        <div className="rounded-2xl border border-white/30 bg-white/20 px-4 py-2 text-xs text-white/90 backdrop-blur">
          Закритий сюрприз‑бокс • рухай мишкою ✨
        </div>
      </div>
    </div>
  );
}
