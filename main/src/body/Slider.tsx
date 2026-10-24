import {
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
  type KeyboardEvent,
  type MouseEvent,
  type TouchEvent,
} from "react";
import ClientOnly from "../components/ClientOnly";
import { sectionLabelClass } from "./Section";

const images = Object.values(
  import.meta.glob("../assets/slider/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  })
) as string[];

const captions = [
  "Preparing and trying the compeition piano in Vilnius",
  "Rehearsing Ravel Trio at the Radio in Budapest",
  "Performing Brahms Trio with amazing musicians in Nairobi",
  "Playing for a packed hall at Muthaiga Country Club in Nairobi",
  "Studio sessions with Aaron Hudson's Double Bass Sonata in Copenhagen",
  "Masterclass with talented young musicians in Nairobi",
  "Graduation concert at the Royal Danish Academy of Music",
];

export default function Slider() {
  const [current, setCurrent] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [centerOffset, setCenterOffset] = useState(0);

  const total = images.length;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstSlideRef = useRef<HTMLDivElement | null>(null);
  const slideWidth = useRef(0);
  const gapWidth = useRef(0);
  const draggedPast = useRef(false);

  const updateSizes = () => {
    if (!firstSlideRef.current || !trackRef.current) return;
    slideWidth.current = firstSlideRef.current.offsetWidth;
    const style = getComputedStyle(trackRef.current);
    const gapStr =
      style.getPropertyValue("column-gap") ||
      style.getPropertyValue("gap") ||
      "0px";
    gapWidth.current = parseFloat(gapStr) || 0;
    setCenterOffset((window.innerWidth - slideWidth.current) / 2);
  };
  const updateSizesRef = useRef(updateSizes);
  updateSizesRef.current = updateSizes;
  const bindTrack = useCallback((node: HTMLDivElement | null) => {
    trackRef.current = node;
    if (node) updateSizesRef.current();
  }, []);

  useLayoutEffect(() => {
    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  const step = () => slideWidth.current + gapWidth.current;

  const getClientX = (event: MouseEvent | TouchEvent) =>
    "touches" in event && event.touches.length
      ? event.touches[0].clientX
      : (event as MouseEvent).clientX;

  const handleDragStart = (event: MouseEvent | TouchEvent) => {
    setIsDragging(true);
    setStartX(getClientX(event));
  };

  const handleDragMove = (event: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    setTranslateX(getClientX(event) - startX);
  };

  const handleDragEnd = () => {
    const dx = translateX;
    setIsDragging(false);
    if (dx > 50) setCurrent((index) => Math.max(0, index - 1));
    else if (dx < -50) setCurrent((index) => Math.min(total - 1, index + 1));
    setTranslateX(0);
    if (Math.abs(dx) > 50) {
      draggedPast.current = true;
      window.setTimeout(() => {
        draggedPast.current = false;
      }, 0);
    }
  };

  const handleSlideClick = (index: number) => {
    if (draggedPast.current || index === current) return;
    setCurrent(index);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setCurrent((index) => Math.min(total - 1, index + 1));
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setCurrent((index) => Math.max(0, index - 1));
    }
  };

  const translate =
    slideWidth.current > 0 ? centerOffset - current * step() + translateX : 0;

  return (
    <section
      aria-labelledby="gallery"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="mt-40 flex w-full flex-col justify-center overflow-hidden select-none"
    >
      <h2 id="gallery" className={`${sectionLabelClass} w-full text-center`}>
        Gallery
      </h2>
      <ClientOnly
        fallback={
          <div className="flex w-full justify-center">
            <img
              src={images[0]}
              alt={captions[0]}
              className="h-[22rem] w-[min(42rem,78vw)] object-cover"
              decoding="async"
            />
          </div>
        }
      >
        <div
          ref={bindTrack}
          className={`flex cursor-pointer gap-5 ${
            isDragging ? "" : "transition-transform duration-300 ease-out"
          }`}
          style={{
            transform: `translateX(${translate}px)`,
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {images.map((src, index) => (
            <div
              key={src}
              ref={index === 0 ? firstSlideRef : null}
              className={`slide relative w-[min(42rem,78vw)] shrink-0 ${
                index === current ? "is-current" : ""
              }`}
              style={{
                boxShadow: index === current ? "var(--shadow-mount)" : "none",
              }}
              onClick={() => handleSlideClick(index)}
            >
              <img
                src={src}
                alt={captions[index]}
                className="print h-[22rem] w-full cursor-pointer object-cover select-none"
                style={{
                  transform: index === current ? "scale(1)" : "scale(0.94)",
                  opacity: index === current ? 1 : 0.82,
                }}
                draggable={false}
                loading="lazy"
                decoding="async"
                onLoad={updateSizes}
              />
              {index === current && captions[index] && (
                <div className="my-3 mx-auto">

                <p className="gallery-caption bg-(--paper) px-3 pt-3 text-center font-(family-name:--lato) text-sm text-(--ink) md:text-base">
                  {captions[index]}
                </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ClientOnly>
      <div className="mt-4 mb-16 flex justify-center gap-2 md:mb-12 lg:mb-10">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Show photo ${index + 1} of ${total}`}
            aria-current={index === current ? "true" : undefined}
            className="tick"
          />
        ))}
      </div>
    </section>
  );
}
