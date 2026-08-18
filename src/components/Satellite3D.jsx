import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// A real satellite model (NASA's SAC-C, public domain — nasa/NASA-3D-Resources
// on GitHub), re-skinned to the site's monochrome/unlit "blueprint" language
// instead of its original textures: a barely-there fill plus bright edge
// lines, the same two-tier treatment the rest of the site uses for hairlines
// and card borders.
const FILL_COLOR = 0xf5f5f7;
const EDGE_COLOR = 0xe7e8ea;

// import.meta.env.BASE_URL rather than a hardcoded leading slash — correct
// under any deploy base (root, or a sub-path like GitHub Pages project sites).
const MODEL_URL = `${import.meta.env.BASE_URL}models/satellite.glb`;

// The model tumbles and banks continuously, so framing it by its current,
// momentary bounding box (as drei's <Bounds> would) clips it the instant it
// rotates to a wider angle than whatever pose it was fit against. Instead,
// every model gets normalized to the same fixed bounding-*sphere* radius —
// rotation-invariant — and the camera distance is solved once from that
// radius, so nothing can ever swing outside the frame.
const TARGET_RADIUS = 1.5;
const FOV = 30;
const MARGIN = 1.5;
const CAMERA_DISTANCE = (TARGET_RADIUS / Math.sin(THREE.MathUtils.degToRad(FOV / 2))) * MARGIN;
const CAMERA_DIR = new THREE.Vector3(0.62, 0.4, 0.68).normalize();
const CAMERA_POSITION = CAMERA_DIR.clone().multiplyScalar(CAMERA_DISTANCE).toArray();

const SatelliteMesh = () => {
  const { scene } = useGLTF(MODEL_URL);

  // Re-skin once per load, then normalize scale/position so the model's
  // bounding sphere always lands at TARGET_RADIUS regardless of its native
  // units. Cloned so repeated mounts (HMR, Suspense retries) don't mutate
  // the cached source scene.
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (!child.isMesh) return;
      child.material = new THREE.MeshBasicMaterial({
        color: FILL_COLOR,
        transparent: true,
        opacity: 0.05,
        side: THREE.DoubleSide,
      });
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(child.geometry, 20),
        new THREE.LineBasicMaterial({ color: EDGE_COLOR, transparent: true, opacity: 0.55 })
      );
      child.add(edges);
    });

    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const scale = TARGET_RADIUS / sphere.radius;

    clone.position.set(-center.x, -center.y, -center.z);

    const wrapper = new THREE.Group();
    wrapper.scale.setScalar(scale);
    wrapper.add(clone);
    return wrapper;
  }, [scene]);

  return <primitive object={model} />;
};

const SatelliteScene = ({ tilt }) => {
  const group = useRef(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    // slow tumble, like a body with no attitude control
    group.current.rotation.y += delta * 0.16;
    // bank angle from scroll velocity, read straight off the framer-motion
    // value each frame instead of through React state
    const bankDeg = tilt?.get ? tilt.get() : 0;
    group.current.rotation.z = THREE.MathUtils.degToRad(-bankDeg * 0.9);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.15;
  });

  return (
    <group ref={group}>
      <SatelliteMesh />
    </group>
  );
};

// Canvas wrapper — unlit MeshBasicMaterial throughout, so no lighting rig is
// needed; it's meant to read as a blueprint/hologram, not a shaded physical
// object. Camera framing is solved analytically (see CAMERA_* above) against
// the model's fixed normalized radius, with margin, so tumble/bank never
// clips against the canvas edge.
const Satellite3D = ({ tilt }) => (
  <Canvas
    camera={{ position: CAMERA_POSITION, fov: FOV }}
    gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
    dpr={[1, 2]}
    style={{ background: 'transparent' }}
  >
    <React.Suspense fallback={null}>
      <SatelliteScene tilt={tilt} />
    </React.Suspense>
  </Canvas>
);

useGLTF.preload(MODEL_URL);

export default Satellite3D;
