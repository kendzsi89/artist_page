import { CONTACT } from "../data/contact";
import { useReveal } from "../motion/useReveal";

export default function Footer() {
  const { ref, shown } = useReveal<HTMLElement>();
  const reveal = shown ? "reveal is-shown" : "reveal";

  return (
    <div className="relative flex h-screen w-screen overflow-hidden">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="/images/footer-1920.jpg"
        alt="portrait of Kendzsi"
        loading="lazy"
        decoding="async"
        width={1920}
        height={1080}
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-(--walnut) via-transparent to-transparent opacity-[0.78]" />
      <div className="vignette-contact pointer-events-none absolute inset-0 z-10" />

      <section
        id="contact"
        ref={ref}
        className="relative z-20 flex h-full w-full flex-col items-start px-[8vw] pt-[12vh]"
      >
        <h2
          id="contact-heading"
          tabIndex={-1}
          className={`${reveal} font-(family-name:--playfair) text-5xl leading-none text-(--paper-raised) lg:text-7xl`}
        >
          Contact
        </h2>
        <div className={`${reveal} reveal-delay-1 sheet mt-8 max-w-md`}>
          <a
            href={`mailto:${CONTACT.email}`}
            className="link-quiet block font-(family-name:--playfair) text-xl text-(--ink) lg:text-2xl"
          >
            {CONTACT.emailDisplay}
          </a>
          <a
            href={`tel:${CONTACT.phoneE164}`}
            className="link-quiet mt-2 block font-(family-name:--playfair) text-xl text-(--ink) lg:text-2xl"
          >
            {CONTACT.phoneDisplay}
          </a>
          <div className="rule my-6" />
          <p className="font-(family-name:--lato) text-lg leading-[1.7] text-(--ink-body)">
            Let's have a chat! I am always open for new projects and
            collaborations.
          </p>
        </div>
      </section>
    </div>
  );
}
