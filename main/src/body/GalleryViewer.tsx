import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
  type TransitionEvent,
} from "react";
import { flushSync } from "react-dom";
import { photoName, photos, pileDepth } from "../data/gallery";

const total = photos.length;
const axisLock = 10;
const swipeThreshold = 50;
const closeThreshold = 100;
const dropFadeDistance = 300;

type Direction = 1 | -1;
type Slide = { to: number; dir: Direction };
type Gesture = { id: number; x: number; y: number; axis: "x" | "y" | null };

const wrap = (index: number) => (index + total) % total;

const named = (name: string) => ({ viewTransitionName: name }) as CSSProperties;

function ViewerBody({
  index,
  onIndex,
  onRequestClose,
  photoRef,
}: {
  index: number;
  onIndex: (index: number) => void;
  onRequestClose: () => void;
  photoRef: RefObject<HTMLImageElement | null>;
}) {
  const [base, setBase] = useState(index);
  const [slide, setSlide] = useState<Slide | null>(null);
  const [offset, setOffset] = useState(0);
  const [drop, setDrop] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [reduce] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const dragged = useRef(false);
  const latest = useRef({ index, pending: slide });
  latest.current = { index, pending: slide };

  const photo = photos[index];

  useEffect(() => {
    for (const neighbour of [wrap(index - 1), wrap(index + 1)]) {
      new Image().src = photos[neighbour].src;
    }
  }, [index]);

  const settle = () => {
    const pending = latest.current.pending;
    flushSync(() => {
      if (pending) setBase(pending.to);
      setSlide(null);
      setAnimating(false);
      setOffset(0);
    });
    void trackRef.current?.offsetWidth;
  };

  const go = (to: number, dir: Direction) => {
    if (latest.current.pending) settle();
    if (to === latest.current.index) {
      setAnimating(true);
      setOffset(0);
      return;
    }
    if (reduce) {
      setBase(to);
      onIndex(to);
      setOffset(0);
      return;
    }
    flushSync(() => {
      setSlide({ to, dir });
      onIndex(to);
    });
    void trackRef.current?.offsetWidth;
    setAnimating(true);
    setOffset(-dir * (stageRef.current?.clientWidth ?? 0));
  };

  const next = () => go(wrap(latest.current.index + 1), 1);
  const previous = () => go(wrap(latest.current.index - 1), -1);

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== trackRef.current || event.propertyName !== "transform") return;
    if (latest.current.pending) settle();
    else setAnimating(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: next,
      ArrowLeft: previous,
      Home: () => go(0, -1),
      End: () => go(total - 1, 1),
      Escape: onRequestClose,
    };
    const action = keys[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (latest.current.pending) settle();
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, axis: null };
    dragged.current = false;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    if (!current.axis) {
      if (Math.hypot(dx, dy) < axisLock) return;
      current.axis = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
      stageRef.current?.setPointerCapture(event.pointerId);
      dragged.current = true;
      setAnimating(false);
    }
    if (reduce) return;
    if (current.axis === "x") setOffset(dx);
    else setDrop(Math.max(0, dy));
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    gesture.current = null;
    if (!current.axis) return;
    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    const cancelled = event.type === "pointercancel";

    if (current.axis === "x") {
      if (!cancelled && dx <= -swipeThreshold) next();
      else if (!cancelled && dx >= swipeThreshold) previous();
      else {
        setAnimating(true);
        setOffset(0);
      }
    } else if (!cancelled && dy >= closeThreshold) {
      onRequestClose();
    } else {
      setAnimating(true);
      setDrop(0);
    }
  };

  const halfClick = (move: () => void) => () => {
    if (!dragged.current) move();
  };

  const slots: { photoIndex: number; rel: Direction | 0 }[] = [{ photoIndex: base, rel: 0 }];
  for (const rel of [-1, 1] as Direction[]) {
    const photoIndex = slide?.dir === rel ? slide.to : wrap(base + rel);
    if (!slots.some((slot) => slot.photoIndex === photoIndex)) slots.push({ photoIndex, rel });
  }

  const inPile = (photoIndex: number) => {
    const position = wrap(photoIndex - index);
    return position > 0 && position < pileDepth;
  };

  const transition = animating ? "var(--viewer-slide)" : "none";

  return (
    <div className="viewer-body" onKeyDown={handleKeyDown}>
      <div
        className="viewer-ground"
        style={{
          opacity: 1 - Math.min(drop / dropFadeDistance, 1) * 0.5,
          transition: animating ? "opacity var(--viewer-slide-timing)" : "none",
        }}
      />
      <div className="viewer-bar viewer-chrome">
        <p className="viewer-label">
          {index + 1} / {total}
        </p>
        <button
          type="button"
          className="viewer-close"
          aria-label="Close gallery"
          onClick={onRequestClose}
        />
      </div>

      <div
        ref={stageRef}
        className="viewer-stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          ref={trackRef}
          className="viewer-track"
          style={{ transform: `translate3d(${offset}px, ${drop}px, 0)`, transition }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slots.map(({ photoIndex, rel }) => {
            const current = photoIndex === index;
            return (
              <div
                key={photos[photoIndex].src}
                className="viewer-slot"
                style={{ transform: `translateX(${rel * 100}%)` }}
                aria-hidden={!current}
              >
                <img
                  ref={current ? photoRef : undefined}
                  src={photos[photoIndex].src}
                  alt={current ? photos[photoIndex].alt : ""}
                  className={reduce && current ? "viewer-photo is-fading-in" : "viewer-photo"}
                  style={current ? named(photoName(photoIndex)) : undefined}
                  draggable={false}
                  decoding="async"
                />
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className="viewer-half viewer-half-previous"
          aria-label="Previous photo"
          onClick={halfClick(previous)}
        >
          <span className="viewer-chevron" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="viewer-half viewer-half-next"
          aria-label="Next photo"
          onClick={halfClick(next)}
        >
          <span className="viewer-chevron" aria-hidden="true" />
        </button>
      </div>

      <div className="viewer-caption viewer-chrome">
        <p className="viewer-label">{photo.place}</p>
        <p className="viewer-description">{photo.description}</p>
      </div>

      <div className="viewer-thumbs">
        {photos.map((thumb, thumbIndex) => (
          <button
            key={thumb.src}
            type="button"
            className="viewer-thumb"
            aria-label={`Show photo ${thumbIndex + 1} of ${total}`}
            aria-current={thumbIndex === index ? "true" : undefined}
            onClick={() => {
              if (thumbIndex !== index) go(thumbIndex, thumbIndex > index ? 1 : -1);
            }}
          >
            <img
              src={thumb.src}
              alt=""
              style={inPile(thumbIndex) ? named(photoName(thumbIndex)) : undefined}
              draggable={false}
              decoding="async"
            />
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Photo {index + 1} of {total}: {photo.alt}
      </p>
    </div>
  );
}

const fadeClass = { in: " is-fading-in", out: " is-fading-out" };

export default function GalleryViewer({
  open,
  fade,
  index,
  onIndex,
  onRequestClose,
  onNativeClose,
  photoRef,
}: {
  open: boolean;
  fade: "in" | "out" | null;
  index: number;
  onIndex: (index: number) => void;
  onRequestClose: () => void;
  onNativeClose: () => void;
  photoRef: RefObject<HTMLImageElement | null>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Gallery"
      className={`gallery-viewer${fade ? fadeClass[fade] : ""}`}
      onCancel={(event) => {
        event.preventDefault();
        onRequestClose();
      }}
      onClose={onNativeClose}
    >
      {open && (
        <ViewerBody
          index={index}
          onIndex={onIndex}
          onRequestClose={onRequestClose}
          photoRef={photoRef}
        />
      )}
    </dialog>
  );
}
