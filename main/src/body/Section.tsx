import { useEffect, useState, type ReactNode } from "react";
import type { Quote } from "../data/quotes";
import type { Video } from "../data/videos";
import { useReveal } from "../motion/useReveal";
import VideoPoster from "./VideoPoster";

export const sectionLabelClass =
  "font-(family-name:--lato) text-[11px] tracking-[0.14em] uppercase text-(--olive) mb-3";

const copyClass =
  "font-(family-name:--lato) text-base leading-[1.7] text-(--ink-body) lg:text-lg [&_strong]:font-semibold [&_strong]:text-(--walnut)";

type Place = "top-end" | "top-start" | "side-start" | "side-end" | "bottom";

const dropCapClass =
  "first-letter:float-left first-letter:mr-2 first-letter:font-(family-name:--playfair) first-letter:text-[3.75rem] first-letter:leading-[0.8] first-letter:text-(--highlight)";

export default function Section({
  label,
  id,
  video,
  quote,
  kicker,
  paragraph,
  extraParagraph,
  place = "top-end",
  firstLetter = true,
  additionalStyles,
}: {
  label: string;
  id?: string;
  video?: Video;
  quote?: Quote;
  kicker?: ReactNode;
  paragraph?: ReactNode;
  extraParagraph?: ReactNode;
  place?: Place;
  firstLetter?: boolean;
  additionalStyles?: string;
}) {
  const { ref, shown } = useReveal<HTMLElement>();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPlaying(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [playing]);
  const reveal = shown ? "reveal is-shown" : "reveal";
  const headingId = id ?? label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const sourcedQuote = quote?.source ? quote : undefined;
  const plainQuote = quote && !quote.source ? quote.text : undefined;
  const bodyClass = `${copyClass} ${firstLetter ? dropCapClass : ""}`;
  const labelInSheet = Boolean(video);
  const heading = (
    <h2 id={headingId} className={sectionLabelClass}>
      {label}
    </h2>
  );
  const boxedTitle = labelInSheet ? (
    <>
      {heading}
      <div className="rule mb-4" />
    </>
  ) : null;

  const copy = (
    <>
      {kicker}
      {sourcedQuote?.source && (
        <blockquote className="sheet w-full max-w-xl">
          {boxedTitle}
          {labelInSheet ? null : <div className="rule mb-4" />}
          <p
            className="quote-mark font-(family-name:--playfair) text-6xl leading-none text-(--clay)"
            aria-hidden="true"
          >
            “
          </p>
          <p className="font-(family-name:--playfair) text-2xl leading-[1.45] text-(--ink) italic lg:text-3xl">
            {sourcedQuote.text}
          </p>
          <footer className="mt-4 font-(family-name:--playfair) text-sm text-(--ink-muted)">
            <cite className="not-italic">
              — {sourcedQuote.source.name}
              {sourcedQuote.source.outlet ? ", " : ""}
              {sourcedQuote.source.outlet && sourcedQuote.source.url ? (
                <a
                  href={sourcedQuote.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet"
                >
                  {sourcedQuote.source.outlet}
                </a>
              ) : (
                sourcedQuote.source.outlet
              )}
            </cite>
          </footer>
        </blockquote>
      )}
      {plainQuote && <p className={copyClass}>{plainQuote}</p>}
      {paragraph && video ? (
        <div className="sheet w-full">
          {boxedTitle}
          <p className={bodyClass}>{paragraph}</p>
          {extraParagraph && (
            <p className={`${copyClass} mt-5`}>{extraParagraph}</p>
          )}
        </div>
      ) : (
        <>
          {paragraph && <p className={bodyClass}>{paragraph}</p>}
          {extraParagraph && <p className={copyClass}>{extraParagraph}</p>}
        </>
      )}
    </>
  );

  if (video) {
    return (
      <section ref={ref} aria-labelledby={headingId} className="stage-section">
        {playing ? (
          <button
            type="button"
            className="stage-scrim"
            aria-label={`Close video: ${video.title}`}
            onClick={() => setPlaying(false)}
          />
        ) : null}
        <div className={`stage stage-${place}${playing ? " is-playing" : ""}`}>
          <div className={`${reveal} stage-mount`}>
            <VideoPoster
              video={video}
              playing={playing}
              onPlay={() => setPlaying(true)}
            />
          </div>
          <div
            className={`${reveal} reveal-delay-1 stage-copy`}
            onClick={playing ? () => setPlaying(false) : undefined}
          >
            {labelInSheet ? null : heading}
            {copy}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      aria-labelledby={headingId}
      className="flex w-[min(72rem,92vw)] flex-col items-center justify-center gap-10 py-10 lg:flex-row lg:gap-20 lg:py-[5.5rem]"
    >
      {(sourcedQuote || plainQuote || paragraph || kicker) && (
        <div
          className={`${reveal} flex min-w-0 w-full max-w-[40rem] flex-col items-start gap-5 ${
            additionalStyles || ""
          }`}
        >
          <h2 id={headingId} className={sectionLabelClass}>
            {label}
          </h2>
          {copy}
        </div>
      )}
    </section>
  );
}
