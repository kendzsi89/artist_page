import { useEffect, useRef, useState } from "react";
import type { PortfolioItem } from "../data/Data";

interface Props {
  item: PortfolioItem | null;
  onClose: () => void;
}

let globalZ = 50;

const WindowOverlay = ({ item, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [zIndex, setZIndex] = useState(globalZ++);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ w: 800, h: 500 });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;

    if (item.useLoader) {
      setLoading(true);
      const t = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(t);
    } else {
      setLoading(false);
    }
  }, [item]);

  if (!item) return null;

  // --- Drag ---
  const onMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX - pos.x;
    const startY = e.clientY - pos.y;

    const move = (e: MouseEvent) => {
      setPos({
        x: e.clientX - startX,
        y: e.clientY - startY
      });
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    setZIndex(globalZ++);
  };

  // --- Resize ---
  const onResize = (e: React.MouseEvent) => {
    e.stopPropagation();

    const startW = size.w;
    const startH = size.h;
    const startX = e.clientX;
    const startY = e.clientY;

    const move = (e: MouseEvent) => {
      setSize({
        w: Math.max(400, startW + (e.clientX - startX)),
        h: Math.max(300, startH + (e.clientY - startY))
      });
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  return (
    <div className="fixed inset-0 z-40">
      {/* Background */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Window */}
      <div
        ref={ref}
        onMouseDown={() => setZIndex(globalZ++)}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          width: size.w,
          height: size.h,
          zIndex
        }}
        className="fixed
  top-1/2 left-1/2
  -translate-x-1/2 -translate-y-1/2
  bg-(--surface)
  rounded-xl
  shadow-2xl
  overflow-hidden
  flex flex-col "
      >
        {/* Header (drag handle) */}
        <div
          onMouseDown={onMouseDown}
          className="flex justify-between items-center px-4 py-2 cursor-move border-b border-white/10"
        >
          <h2 className="text-sm">{item.title}</h2>
          <button className="hover:text-white transition-all cursor-pointer" onClick={onClose}>✕</button>
        </div>

        {/* Content */}
        <div className="relative flex-1 bg-black">
  {/* Loader */}
  {loading && (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  )}

  {/* INTERNAL PROJECTS → iframe */}
  {!loading && item.type === "internal" && item.url && (
    <iframe
      src={item.url}
      className="w-full h-full"
    />
  )}

  {/* EXTERNAL PROJECTS → showcase + button */}
  {!loading && item.type === "external" && (
    <div className="p-6 flex flex-col md:flex-row items-start gap-6 h-full overflow-auto">
  
  {/* MEDIA */}
  {item.media && (
    <div className="flex-2 w-full aspect-video rounded-lg overflow-hidden bg-black">
      
      {/* IMAGE */}
      {item.media.type === "image" && (
        <img
          src={item.media.src}
          className="w-full h-full object-cover"
        />
      )}

      {/* VIDEO */}
      {item.media.type === "video" && (
        <video
          src={item.media.src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover pointer-events-none"
        />
      )}

    </div>
  )}
  <div className="flex-1 flex flex-col gap-4">
    <div className="flex gap-2 items-center justify-start">
    {/* LOGO */}
    {item.logo && (
      <img src={item.logo} alt={`${item.title} logo`} className="max-w-12 h-12 object-contain self-start" />
    )}
    {/* TITLE */}
      <h2 className="text-xl">{item.title}</h2>
    </div>

  {/* TEXT */}
  <p className="text-(--muted) mb-6">
    {item.description}
  </p>

  {/* BUTTON */} 
  <button
    onClick={() => window.open(item.url, "_blank")}
    className="
      self-start px-4 py-2
      border border-white/10
      rounded-lg
      text-(--muted)
      text-sm uppercase tracking-wide
      hover:bg-white hover:text-black
      transition
      cursor-pointer
    "
  >
    Open Live Site ↗
  </button>
  </div>
</div>
  )}
</div>

        {/* Resize handle */}
        <div
          onMouseDown={onResize}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        />
      </div>
    </div>
  );
};

export default WindowOverlay;