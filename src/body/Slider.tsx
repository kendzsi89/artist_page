import React, { useState, useRef, useLayoutEffect, useEffect } from "react";

// import images (Vite)
const images = Object.values(
  import.meta.glob("../assets/slider/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  })
) as string[];

export default function Slider() {
  const captions = [
    "Preparing and trying the compeition piano in Vilnius",
    "Rehearsing Ravel Trio at the Radio in Budapest",
    "Performing Brahms Trio with amazing musicians in Nairobi",
    "Playing for a packed hall at Muthaiga Country Club in Nairobi",
    "Studio sessions with Aaron Hudson's Double Bass Sonata in Copenhagen",
    "Masterclass with talented young musicians in Nairobi",
    "Graduation concert at the Royal Danish Academy of Music",
    // …same length as images
  ];

  const [current, setCurrent] = useState(1); // 0-based index for first slide
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [centerOffset, setCenterOffset] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [fadeBackground, setFadeBackground] = useState(0); // 0 to 1 fade amount
  const sliderWrapperRef = useRef<HTMLDivElement>(null);

  const total = images.length;

  const trackRef = useRef<HTMLDivElement | null>(null); // element that has gap
  const firstSlideRef = useRef<HTMLDivElement | null>(null); // measure slide width
  const slideWidth = useRef(0);
  const gapWidth = useRef(0);

  // Measure slide width + gap and calculate center offset (runs before paint)
  useLayoutEffect(() => {
    const updateSizes = () => {
      if (!firstSlideRef.current || !trackRef.current) return;

      // slide width in px
      slideWidth.current = firstSlideRef.current.offsetWidth;

      // read computed gap (column-gap/common 'gap'); computed value returns px
      const style = getComputedStyle(trackRef.current);
      // prefer column-gap then gap — older browsers may differ
      const gapStr =
        style.getPropertyValue("column-gap") ||
        style.getPropertyValue("gap") ||
        "0px";
      gapWidth.current = parseFloat(gapStr) || 0;

      // center offset so a slide sits in the middle of the viewport
      setCenterOffset((window.innerWidth - slideWidth.current) / 2);
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!sliderWrapperRef.current) return;

      const rect = sliderWrapperRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much the slider is visible in the viewport
      // For example, a simple linear fade when slider is between 0 and windowHeight
      const fadeRangeStart = windowHeight * 0.6; // start fading halfway down viewport
      const fadeRangeEnd = windowHeight * 0.8; // full fade near bottom of viewport

      // amount from 0 (not in range) to 1 (fully faded)
      let fadeAmount = 0;

      if (rect.top < fadeRangeEnd && rect.bottom > fadeRangeStart) {
        // Calculate fade amount based on slider's top position within the range
        fadeAmount =
          1 - (rect.top - fadeRangeStart) / (fadeRangeEnd - fadeRangeStart);

        fadeAmount = Math.min(Math.max(fadeAmount, 0), 1); // clamp 0-1
      }

      setFadeBackground(fadeAmount);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // call on mount in case already in view

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const step = () => slideWidth.current + gapWidth.current; // pixel step per index

  // Helpers to get clientX from mouse or touch
  const getClientX = (e: React.MouseEvent | React.TouchEvent) =>
    "touches" in e && e.touches.length
      ? e.touches[0].clientX
      : (e as React.MouseEvent).clientX;

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setStartX(getClientX(e));
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = getClientX(e);
    setTranslateX(clientX - startX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (translateX > 50) setCurrent((c) => Math.max(0, c - 1));
    else if (translateX < -50) setCurrent((c) => Math.min(total - 1, c + 1));
    setTranslateX(0);
  };

  // calculate translate; guard for measurement not ready yet
  const translate =
    slideWidth.current > 0 ? centerOffset - current * step() + translateX : 0;
  return (
    <div ref={sliderWrapperRef} className="relative">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black pointer-events-none transition-opacity duration-300"
        style={{ opacity: fadeBackground * 0.6 }}
      />

      <div className="overflow-hidden flex flex-col justify-center w-full mt-40 select-none">
        {/* Slider track: trackRef lets us read the computed gap */}
        <div
          ref={trackRef}
          className="flex gap-20 transition-transform ease-out duration-300 cursor-pointer"
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
          {images.map((src, i) => (
            <div
              key={i}
              ref={i === 0 ? firstSlideRef : null}
              className="flex-shrink-0 w-11/12 lg:w-3/5 relative"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className="w-full lg:h-120 object-cover cursor-pointer select-none"
                draggable={false}
              />

              {/* Caption overlay */}
              {hoveredIndex === i && (
                <div
                  className={`
                  absolute inset-0 flex items-end p-3 text-white font-semibold bg-black/30
                  ${i === hoveredIndex ? "lg:flex" : "lg:hidden"}
                  lg:justify-end
                  justify-center text-center
                  text-sm md:text-base
                `}
                >
                  <p className="max-w-[90%]">{captions[i]}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dots */}
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4 mb-16 md:mb-12 lg:mb-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-8 h-2 rounded-none transition-colors duration-300 ${
                i === current ? "bg-gray-800" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
