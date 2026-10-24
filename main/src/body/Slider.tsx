import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { photoName, photos, pileDepth } from "../data/gallery";
import GalleryPile from "./GalleryPile";
import GalleryViewer from "./GalleryViewer";
import { sectionLabelClass } from "./Section";

const total = photos.length;
const fadeMs = 240;

type Phase = "open" | "close";

function startGalleryTransition(
  phase: Phase,
  update: () => void | Promise<void>
) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !document.startViewTransition) return false;
  const root = document.documentElement;
  root.dataset.galleryVt = phase;
  document.startViewTransition(update).finished.finally(() => {
    delete root.dataset.galleryVt;
  });
  return true;
}

function whenDecoded(image: HTMLImageElement | null) {
  if (!image) return Promise.resolve();
  return Promise.race([
    image.decode().catch(() => undefined),
    new Promise((resolve) => window.setTimeout(resolve, 300)),
  ]).then(() => undefined);
}

function staggerRules(index: number) {
  let rules = "";
  for (let position = 1; position < pileDepth; position += 1) {
    const name = photoName((index + position) % total);
    rules += `::view-transition-group(${name}){animation-delay:${position * 40}ms}`;
  }
  return rules;
}

const isGalleryEntry = () => Boolean(window.history.state?.gallery);

export default function Slider() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [fade, setFade] = useState<"in" | "out" | null>(null);
  const openRef = useRef(false);
  const closingRef = useRef(false);
  const wasOpen = useRef(false);
  const pileRef = useRef<HTMLButtonElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  const openViewer = () => {
    if (openRef.current) return;
    openRef.current = true;
    window.history.pushState({ gallery: true }, "");
    const show = (nextFade: "in" | null) =>
      flushSync(() => {
        setFade(nextFade);
        setOpen(true);
      });
    const animated = startGalleryTransition("open", () => {
      show(null);
      return whenDecoded(photoRef.current);
    });
    if (!animated) show("in");
  };

  const closeViewer = useCallback(() => {
    if (!openRef.current || closingRef.current) return;
    closingRef.current = true;
    const hide = () => {
      flushSync(() => {
        setOpen(false);
        setFade(null);
      });
      openRef.current = false;
      closingRef.current = false;
    };
    if (startGalleryTransition("close", hide)) return;
    setFade("out");
    window.setTimeout(hide, fadeMs);
  }, []);

  const requestClose = useCallback(() => {
    if (isGalleryEntry()) window.history.back();
    else closeViewer();
  }, [closeViewer]);

  const handleNativeClose = useCallback(() => {
    if (!openRef.current || closingRef.current) return;
    openRef.current = false;
    setOpen(false);
    setFade(null);
    if (isGalleryEntry()) window.history.back();
  }, []);

  useEffect(() => {
    if (isGalleryEntry()) window.history.replaceState(null, "");
    const onPopState = () => {
      if (openRef.current) closeViewer();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [closeViewer]);

  useLayoutEffect(() => {
    if (wasOpen.current && !open) pileRef.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);

  return (
    <section
      aria-labelledby="gallery"
      className="mt-40 mb-16 flex w-full flex-col items-center md:mb-12 lg:mb-10"
    >
      <h2 id="gallery" className={`${sectionLabelClass} w-full text-center`}>
        Gallery
      </h2>
      <style>{staggerRules(index)}</style>
      <GalleryPile
        index={index}
        open={open}
        onOpen={openViewer}
        buttonRef={pileRef}
      />
      <GalleryViewer
        open={open}
        fade={fade}
        index={index}
        onIndex={setIndex}
        onRequestClose={requestClose}
        onNativeClose={handleNativeClose}
        photoRef={photoRef}
      />
    </section>
  );
}
