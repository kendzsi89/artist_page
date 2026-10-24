import { useEffect, useRef, useState, type CSSProperties, type Ref } from "react";
import { photoName, photos, pileDepth } from "../data/gallery";

const total = photos.length;

function useShuffleOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shuffling, setShuffling] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const touch = window.matchMedia("(hover: none)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!touch || reduce) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShuffling(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, shuffling };
}

export default function GalleryPile({
  index,
  open,
  onOpen,
  buttonRef,
}: {
  index: number;
  open: boolean;
  onOpen: () => void;
  buttonRef: Ref<HTMLButtonElement>;
}) {
  const { ref, shuffling } = useShuffleOnce<HTMLDivElement>();

  return (
    <div ref={ref} className="flex flex-col items-center">
      <button
        ref={buttonRef}
        type="button"
        aria-label={`Open gallery, ${total} photographs`}
        onClick={onOpen}
        className={shuffling ? "gallery-pile is-shuffling" : "gallery-pile"}
      >
        {Array.from({ length: pileDepth }, (_, position) => {
          const photoIndex = (index + position) % total;
          const photo = photos[photoIndex];
          const style = open
            ? undefined
            : ({ viewTransitionName: photoName(photoIndex) } as CSSProperties);
          return (
            <span key={photo.src} className="pile-print" data-pos={position}>
              <img
                src={photo.src}
                alt={photo.alt}
                style={style}
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </span>
          );
        })}
      </button>

    </div>
  );
}
