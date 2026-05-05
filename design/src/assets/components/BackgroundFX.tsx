import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function BackgroundFX({ aboutOpen, menuOpen, activeId }: { aboutOpen: boolean; menuOpen: boolean; activeId: number | null }) {
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
        camera={{ position: [0, 0, 5] }}
      >
        <Scene mouse={mouse} aboutOpen={aboutOpen} menuOpen={menuOpen} activeId={activeId} />
      </Canvas>
    </div>
  );
}

function Scene({
  mouse,
  aboutOpen,
  menuOpen,
  activeId
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  aboutOpen: boolean;
  menuOpen: boolean;
  activeId: number | null;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
const smoothedMouse = useRef(new THREE.Vector2(0.2, 0.2));


const smooth = useRef({
  blur: 0.8,
  intensity: 0.25,
  pink: 3.8,
  mint: 0.2,
  grain: 0.6,
  scale: 0.1,
});

  useFrame((state) => {
  if (!materialRef.current) return;

  const mat = materialRef.current;

  mat.uniforms.uTime.value = state.clock.elapsedTime;

  // --- mouse smoothing (already good)
  smoothedMouse.current.lerp(
    new THREE.Vector2(mouse.current.x, mouse.current.y),
    0.02
  );
  mat.uniforms.uMouse.value.copy(smoothedMouse.current);
type Palette = {
  pink: number;
  mint: number;
  base: number;
};

const palettes: Record<number, Palette> = {
  0: { pink: 3.8, mint: 0.2, base: 0.65 },
  1: { pink: 2.5, mint: 0.8, base: 0.3 },
  2: { pink: 4.2, mint: 0.1, base: 0.22 },
  3: { pink: 1.5, mint: 1.2, base: 0.28 },
  4: { pink: 3.0, mint: 0.5, base: 0.24 },
  5: { pink: 2.0, mint: 1.0, base: 0.26 },
};
  // --- TARGET VALUES ---
  const base = {
  blur: 0.8,
  intensity: 0.25,
  pink: 1.8,
  mint: 0.2,
  grain: 21.6,
  scale: 0.9,
};

// --- ABOUT influence
if (aboutOpen) {
  base.blur *= 0.6;
  base.intensity *= 1.2;
  base.scale *= 0.5;
  base.pink = 0.4;
}

// --- MENU influence (more calm / background)
if (menuOpen) {
  base.intensity *= 0.5;
  base.grain *= 0.5;
  base.blur *= 1.2;
}

// --- HOVER (active project)
if (activeId !== null) {
  const p = palettes[activeId % 6];

  base.intensity += p.base;     // boost presence
  base.pink = p.pink;           // override color identity
  base.mint = p.mint;

  base.scale *= 0.2;            // slightly bigger blobs
  base.blur *= 0.9;             // tighter = more focus
}

// --- IDLE (no hover) subtle drift
if (activeId === null && !aboutOpen) {
  base.intensity *= 0.9;
  base.grain *= 1.1;
}

const target = base;
  // --- SMOOTHING (this is the magic)
  const speed = 0.05; // lower = smoother

  smooth.current.blur += (target.blur - smooth.current.blur) * speed;
  smooth.current.intensity += (target.intensity - smooth.current.intensity) * speed;
  smooth.current.pink += (target.pink - smooth.current.pink) * speed;
  smooth.current.mint += (target.mint - smooth.current.mint) * speed;
  smooth.current.grain += (target.grain - smooth.current.grain) * speed;
  smooth.current.scale += (target.scale - smooth.current.scale) * speed;

  // --- APPLY TO SHADER
  mat.uniforms.uBlur.value = smooth.current.blur;
  mat.uniforms.uIntensity.value = smooth.current.intensity;
  mat.uniforms.uPinkStrength.value = smooth.current.pink;
  mat.uniforms.uMintStrength.value = smooth.current.mint;
  mat.uniforms.uGrainStrength.value = smooth.current.grain;
  mat.uniforms.uScale.value = smooth.current.scale;
});

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.2, 0.2) },
          uBlur: { value: 4.0 },
          uIntensity: { value: 0.01 },

          // NEW
          uPinkStrength: { value: 0.6 },
          uMintStrength: { value: 0.4 },
          uGrainStrength: { value: 0.04 },
          uScale: { value: 0.1 },
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
// --- metaball field ---
float field(vec2 uv, vec2 pos, float strength) {
  float d = distance(uv, pos);
  return strength / (d * d + 0.001);
}

void main() {
  vec2 uv = vUv;

// mouse influence
vec2 m = uMouse;
uv += (m - 0.5) * 0.05;

// scale → bigger blobs
uv = (uv - 0.5) * 1.5 + 0.5;



float f = 0.0;
f += field(uv, m, 0.25);
f += field(uv, vec2(0.3, 0.7), 0.15);
f += field(uv, vec2(0.8, 0.2), 0.12);

// shape
float blobs = smoothstep(0.6, 1.2, f * uBlur);

// --- color blending ---
vec3 base = vec3(0.93, 0.93, 0.2);
vec3 pink = vec3(1.0, 0.9, 0.95);
vec3 mint = vec3(0.8, 1.0, 0.9);

vec3 col = mix(base, pink, smoothstep(0.7, 1.1, f));
col = mix(col, mint, smoothstep(1.0, 1.4, f));

col *= blobs;

// --- subtle movement
col *= 1.0 + sin(uTime * 0.3) * 0.05;

// --- colored grain
vec3 grain = vec3(
  noise(uv * 800.0 + uTime * 2.0),
  noise(uv * 800.0 + uTime * 2.0 + 10.0),
  noise(uv * 800.0 + uTime * 2.0 + 20.0)
);

col += (grain - 0.5) * 0.04;

// intensity
col *= uIntensity;

gl_FragColor = vec4(col, 1.0);
}
`;