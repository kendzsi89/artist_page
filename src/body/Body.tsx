import Section from "./Section";
import Slider from "./Slider";
import SpotifySection from "./SpotifySection";
import BodyIcons from "./BodyIcons";

export default function Body() {
  return (
    <div className="bg-white">
      <Section
        video="https://youtu.be/CFD0RGI-iBo?si=Mofct1BKc04QS1M7"
        quote="… Kendzsi played Rhapsody in Blue with fantastic confidence, […]
            with huge, energetic fortes, and oftentimes with gentle, tender
            keystrokes."
      />
      <Section
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
        rowReverse={true}
        video="https://youtu.be/Rk6ekMRKa_Q?si=bzR2UdWZflfS8VOR"
        quote="The warmth and melancholy of this soulful piece is beautifully captured in this live recording by pianist Kendzsi Tanaka."
      />
      <Slider />
      <Section
        video="https://youtu.be/nEvbK84KEUI"
        paragraph={
          <>
            Music for me is the purest form of <strong>communication.</strong> I
            aim to tell my audiences a <strong>story,</strong>showing the beauty
            and ups and downs written into the music through my{" "}
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
        additionalStyles="w-3/5"
        firstLetter={false}
        paragraph={
          <>
            We recently released an album with <strong>Aaron Hudson's </strong>{" "}
            Double Bass Sonata, which I recorded together with Astor Cortabarria
            in 2022 and 2023:
          </>
        }
      />
      <SpotifySection />
      <Section
        rowReverse={true}
        video="https://youtu.be/wGovALom5O0"
        firstLetter={false}
        paragraph={
          <>
            Meanwhile, in my free time I <strong>teach</strong> a class of a{" "}
            <strong>dozen talented pianists.</strong> They are the future
            generation of music-carriers, so it is of great importance to me to
            show all the different aspects of playing, listening, and
            understanding good music. <br /> <br />
            Before the pandemic, I founded a company in men’s skincare,
            <strong> Jun Grooming.</strong> During that period, I learned how to{" "}
            <strong> build websites</strong> and experimented with coding.
            Lastly, I dabble in
            <strong> woodworking, photography,</strong>
            and also love <strong>cooking</strong> for my friends.
          </>
        }
      />
      <Section
        additionalStyles="w-3/5"
        firstLetter={false}
        paragraph={
          <>
            Thanks for checking out my website. I’d appreciate a follow, like or
            a thumbs up on any of my social media outputs here:
          </>
        }
      />
      <BodyIcons />
    </div>
  );
}
