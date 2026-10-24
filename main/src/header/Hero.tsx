import type { MouseEvent } from "react";
import { EXCERPT } from "../data/audio";
import Icons from "./Icons";
import ListenButton from "./ListenButton";

function focusContact(event: MouseEvent<HTMLAnchorElement>) {
  if (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  ) {
    return;
  }
  window.setTimeout(() => {
    document.getElementById("contact-heading")?.focus();
  }, 0);
}

export default function Hero() {
  return (
    <div className="relative flex h-screen w-screen overflow-hidden">
      <img
        className="kenburns ambient absolute inset-0 h-full w-full object-cover"
        src="/images/hero-1920.jpg"
        srcSet="/images/hero-960.jpg 960w, /images/hero-1440.jpg 1440w, /images/hero-1920.jpg 1920w, /images/hero-2560.jpg 2560w"
        sizes="100vw"
        fetchPriority="high"
        decoding="async"
        width={1920}
        height={1280}
        alt="Kendzsi Tanaka pianist, photographed by Agnete Schlichtkrull"
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-(--walnut) via-transparent to-transparent opacity-[0.72]" />
      <div className="vignette-hero pointer-events-none absolute inset-0 z-10" />

      <div className="relative z-20 h-full w-full">
        <Icons />
        <div className="absolute bottom-[12vh] left-[8vw] max-w-[min(36rem,78vw)]">
          <p className="font-(family-name:--lato) text-[11px] tracking-[0.14em] text-[rgb(250_247_242/0.8)] uppercase mb-4">
              Pianist
            </p>
             <div className="rule rule-draw my-4" />
          <h1 className="rise font-(family-name:--playfair) text-left text-5xl leading-[0.95] tracking-[-0.02em] text-(--paper-raised) lg:text-7xl">
            Kendzsi <br /> Tanaka
          </h1>
          <div className="rule rule-draw my-4" />
          <div className="rise rise-late flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            {EXCERPT ? (
              <>
                
                <ListenButton />
              </>
            ) : null}
            <span className="hidden text-(--clay)/60 md:inline" aria-hidden="true">
              ·
            </span>
            <a
              href="#contact"
              onClick={focusContact}
              className="link-quiet font-(family-name:--lato) text-[11px] tracking-[0.14em] text-[rgb(250_247_242/0.8)] uppercase"
            >
              Get in touch
            </a>
          </div>
        </div>
        <p className="absolute right-4 bottom-4 font-(family-name:--lato) text-[11px] tracking-[0.14em] text-[rgb(250_247_242/0.8)] uppercase">
          awesome photo by{" "}
          <a
            className="link-quiet text-[rgb(250_247_242/0.8)]"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.schlichtkrull.com"
          >
            Agnete Schlichtkrull
          </a>
        </p>
      </div>
    </div>
  );
}
