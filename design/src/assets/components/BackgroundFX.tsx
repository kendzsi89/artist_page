import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function BackgroundFX({ aboutOpen }: { aboutOpen: boolean }) {
  const mouse = useRef({ x: 0.2, y: 0.2 });
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 1] }}
      >
        <Scene mouse={mouse} aboutOpen={aboutOpen} />
      </Canvas>
    </div>
  );
}

function Scene({
  mouse,
  aboutOpen
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  aboutOpen: boolean;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
const smoothedMouse = useRef(new THREE.Vector2(0.2, 0.2));

  useFrame((state) => {
  if (!materialRef.current) return;

  materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

  // stable smoothing buffer
  smoothedMouse.current.lerp(
    new THREE.Vector2(mouse.current.x, mouse.current.y),
    0.05
  );

  materialRef.current.uniforms.uMouse.value.copy(smoothedMouse.current);

  materialRef.current.uniforms.uBlur.value = aboutOpen ? 3 : 2.2;
  materialRef.current.uniforms.uIntensity.value = aboutOpen ? 0.3 : 0.5;
});

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.2, 0.2) },
          uBlur: { value: 1.0 },
          uIntensity: { value: 0.1 }
        }}
        vertexShader={vertex}
        fragmentShader={fragment}
      />
    </mesh>
  );
}

const vertex = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragment = `
varying vec2 vUv;

uniform float uTime;
uniform vec2 uMouse;
uniform float uBlur;
uniform float uIntensity;

// --- simple noise ---
float random(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
}

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
         (c - a)* u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

// --- soft blob ---
float blob(vec2 uv, vec2 pos, float size) {
  float d = distance(uv, pos);
  return smoothstep(size, size - uBlur * 0.2, d);
}

void main() {
  vec2 uv = vUv;

  // --- mouse offset ---
  vec2 m = uMouse;
  uv += (m - 0.5) * 0.05;

  // --- blobs (your gradients) ---
  float b1 = blob(uv, m, 0.35);
  float b2 = blob(uv, vec2(0.3, 0.7), 0.2);
  float b3 = blob(uv, vec2(0.8, 0.2), 0.1);

  vec3 col = vec3(0.0);

  col += b1 * vec3(0.93, 0.93, 1.0);
  col += b2 * vec3(1.0, 0.9, 0.95);
  col += b3 * vec3(0.8, 1.0, 0.9);

  // --- subtle movement ---
  col *= 1.0 + sin(uTime * 0.3) * 0.05;

  // --- grain ---
  float g = noise(uv * 500.0 + uTime * 2.0);
  col += (g - 0.5) * 0.08;

  // --- intensity control ---
  col *= uIntensity;

  gl_FragColor = vec4(col, 1.0);
}
`;