import ClientOnly from "../components/ClientOnly";
import { gershwinQuote, liveRecordingQuote } from "../data/quotes";
import { videos } from "../data/videos";
import { useReveal } from "../motion/useReveal";
import Section, { sectionLabelClass } from "./Section";
import Slider from "./Slider";
import SpotifySection from "./SpotifySection";
import BodyIcons from "./BodyIcons";
import Upcoming from "./Upcoming";

const copyClass =
  "font-(family-name:--lato) text-base leading-[1.7] text-(--ink-body) lg:text-lg [&_strong]:font-semibold [&_strong]:text-(--walnut)";

export default function Body() {
  const listen = useReveal<HTMLDivElement>();
  const listenReveal = listen.shown ? "reveal is-shown" : "reveal";

  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-(--paper)">
      <Section
        label="Press"
        id="press"
        place="top-end"
        video={videos.gershwin}
        quote={gershwinQuote}
      />
      <ClientOnly fallback={null}>
        <Upcoming />
      </ClientOnly>
      <Section
        label="Biography"
        id="biography"
        additionalStyles="lg:w-3/5 md:w-full lg:max-w-180"
        paragraph={
          <>
            Born in Hungary and partly raised in the States, I am half Japanese.
            I started learning piano at a super young age, and by the age of 16
            I finally found my path in playing all these notes. A crucial and
            decisive step in that was when I attended the{" "}
            <strong>Vántus István Music High School</strong> with Dr Lucz Ilona
            from 2009-2013 in <strong>Szeged, Hungary</strong>. Only smooth
            sailing from there: after graduating from{" "}
            <strong>The Royal Academy of Music, London</strong> in 2017 under
            the tutelage of Joanna MacGregor, I earned my Master’s Degree
            studying with Niklas Sivelöv at the{" "}
            <strong>Royal Danish Academy of Music</strong> in{" "}
            <strong>Copenhagen</strong>.
          </>
        }
      />
      <Section
        label="Press"
        id="press-2"
        place="bottom"
        video={videos.liveRecording}
        quote={liveRecordingQuote}
      />
      <Slider />
      <Section
        label="Approach"
        id="approach"
        place="side-end"
        firstLetter={false}
        additionalStyles="lg:w-3/5 md:w-full lg:max-w-150"
        video={videos.performance}
        paragraph={
          <>
            Music for me is the purest form of <strong>communication.</strong> I
            aim to tell my audiences a <strong>story,</strong> showing the
            beauty and ups and downs written into the music through my{" "}
            <strong>perspective.</strong> Often it is only my experiences and my
            being that I draw the tools from to shape my{" "}
            <strong>interpretation.</strong> This is why as an{" "}
            <strong>artist,</strong> my path is ever-evolving, honing itself
            more into something <strong>unique.</strong> <br />
            <br /> I outstandingly like playing music from{" "}
            <strong>Ravel, Bartók, Brahms and Bach,</strong> but also love
            experimenting with contemporary music and <strong>jazz.</strong>{" "}
          </>
        }
      />
      <Section
        label="Experiment"
        id="experiment"
        place="top-start"
        firstLetter={false}
        video={videos.electronics}
        paragraph="It's a little bit of a provocation. Why should classical music always be played in a concert hall? Why should the performance always be perfect? And why is the audience always a certain age group? This I what I want to get rid of..."
      />

      <section
        aria-labelledby="listen"
        className="flex w-full flex-col items-center"
      >
        <div
          ref={listen.ref}
          className={`${listenReveal} flex w-4/5 flex-col items-start pt-10 md:w-full lg:w-3/5 lg:max-w-150 lg:pt-30`}
        >
          <h2 id="listen" className={sectionLabelClass}>
            Listen
          </h2>
          <p className={copyClass}>
            Give a listen to our album with <strong>Aaron Hudson's </strong>{" "}
            Double Bass Sonata, which we recorded together with Astor
            Cortabarria in 2022 and 2023:
          </p>
        </div>
        <SpotifySection />
      </section>
      <Section
        label="Teaching & Other Interests"
        id="teaching"
        place="bottom"
        video={videos.teaching}
        firstLetter={false}
        additionalStyles="lg:w-3/5 md:w-full lg:max-w-150"
        paragraph={
          <>
            Meanwhile, I <strong>teach</strong> a class of a{" "}
            <strong>dozen talented pianists.</strong> They are the future
            generation of music-carriers, so it is of great importance to me to
            show all the different aspects of playing, listening to, and
            understanding good music.
          </>
        }
        extraParagraph={
          <>
            Before the pandemic, I founded a company in men’s skincare,
            <strong> Jun Grooming.</strong> During that period, I learned how to{" "}
            <strong> build websites</strong> and experimented with coding.
            Lastly, I dabble in
            <strong> woodworking, photography, </strong>
            and also love <strong>cooking</strong> for my friends. And lastly, I enjoy riding on and wrenching my motorcycles.
          </>
        }
      />
     {/* <Engagements /> */}
      <p className={`${copyClass} w-4/5 pt-10 lg:max-w-150 lg:pt-30`}>
        Thanks for checking out my website. I’d appreciate a follow, like or a
        thumbs up on any of my social media outputs here:
      </p>
      <BodyIcons />
    </div>
  );
}
