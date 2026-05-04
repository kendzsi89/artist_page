import { useRef, useState, useEffect} from "react";
import type { PortfolioItem } from "../data/Data";

interface Props {
  item: PortfolioItem;
  onClick: (item: PortfolioItem) => void;
  setActiveId: (id: number | null) => void;
  activeId: number | null;
}

const Element = ({ item, onClick, setActiveId, activeId}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  const [index, setIndex] = useState(0);
const [hovered, setHovered] = useState(false);

  useEffect(() => {
  if (!hovered || !item.previews?.length) return;

  const max = Math.min(3, item.previews.length);

  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % max);
  }, 800);

  return () => clearInterval(interval);
}, [hovered, item.previews]);

  const handleMove = (e: React.MouseEvent) => {
  const el = ref.current;
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const midX = rect.width / 2;
  const midY = rect.height / 2;

  const dx = (x - midX) / midX;
  const dy = (y - midY) / midY;

  // 👉 magnetic transform
  el.style.transform = `
    scale(1.03)
    rotateX(${dy * -6}deg)
    rotateY(${dx * 6}deg)
    translate(${dx * 6}px, ${dy * 6}px)
  `;

  // 👉 THIS is what you were missing
  el.style.setProperty("--x", `${x}px`);
  el.style.setProperty("--y", `${y}px`);
  const force = 200; // tweak this

  el.style.setProperty("--tx", `${dx * force}px`);
  el.style.setProperty("--ty", `${dy * force}px`);
  setTx(dx * force);
  setTy(dy * force);
};

  const reset = () => {
    if (ref.current) {
      ref.current.style.transform = "";
      setTx(0);
      setTy(0);
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        reset();
        setActiveId(null)
        setHovered(false);
        setIndex(0); // reset when leaving;
      }}
      onMouseEnter={() => {
        setActiveId(item.id);
        setHovered(true);
      }}
      onClick={() => onClick(item)}
      className={`
        
        group relative cursor-pointer overflow-hidden rounded-xl
        transition-transform duration-300 will-change-transform w-full h-64
      `}
    >
      

      {/* PEEL LAYER */}
      <div
        className={`
          absolute inset-0
         bg-white/60
          transition-[opacity, transform] duration-[1200ms,700ms] ease-[cubic-bezier(0.22,1,0.36,1)]
          opacity-90
          group-hover:opacity-0
          rounded-lg
    
        `}
        style={{ 
          transformOrigin: `var(--x) var(--y)`,
          transform: `translate(${-tx * 2}px, ${-ty * 2}px)`}}
      />

      {/* DARK OVERLAY */}
      <div className={`absolute inset-0 bg-black/20 group-hover:bg-black/40 transition`} />
      

      {/* TITLE */}
      <div className="absolute bottom-4 left-4 z-10">
        <h3 className={`"text-lg font-medium group-hover:translate-y-full group-hover:opacity-0 transition duration-500
        ${activeId === item.id ? "" : "opacity-100"}
        `}>{item.title}</h3>
      </div>

      {/* UNDERLAY (revealed after peel) */}
      <div className="absolute inset-0 opacity-30 group-hover:opacity-100 transition duration-700">
        {/* Replace later with canvas / animation */}
        {
        item.previews?.slice(0, 3).map((src, i) => (
          <>
            <img
              key={i}
              src={src}
              className={`
                absolute inset-0 w-full h-full object-cover rounded-lg
                transition-opacity duration-700
                ${index === i ? "opacity-100" : "opacity-0"}
              `}
              draggable={false}
            />
          
         
          {item.type === "internal" && (
            <div
              className="absolute w-full h-full inset-0 flex bg-black/40 items-center justify-center"
            >
            <p className="absolute text-md font-extralight text-white transition duration-500 delay-75 -translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 ">Click to start the app</p>
          
            </div>)}
          </>
          ))
}

      </div>
    </div>
  );
};

export default Element;