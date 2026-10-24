import { Spotify } from "react-spotify-embed";
import ClientOnly from "../components/ClientOnly";
import { useReveal } from "../motion/useReveal";
import celeste from "../assets/images/celeste-1920.jpg";

export default function SpotifySection() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const reveal = shown ? "reveal is-shown" : "reveal";

  return (
    <div className="relative mx-auto mt-20 flex h-[80vh] w-full flex-col items-center justify-center overflow-hidden">
      <img
        src={celeste}
        alt=""
        className="spotify-pan ambient absolute inset-y-0 left-0 object-cover"
        loading="lazy"
        decoding="async"
        width={1280}
        height={1004}
      />
      <div className="scrim-walnut pointer-events-none absolute inset-0" />
      <div ref={ref} className={`${reveal} relative z-10 w-4/5 lg:w-2/5`}>
        <div className="ambient float-y">
          <ClientOnly
            fallback={
              <div className="mount min-h-115 w-full" aria-hidden="true" />
            }
          >
            <div className="mount w-full">
              <Spotify
                link="https://open.spotify.com/album/1EGlTgldbnDa9VkMBnsroS?si=P5aO8TbVTqK1qbHFe6_FSQ"
                className="min-h-115 w-full rounded-xl!"
              />
            </div>
          </ClientOnly>
        </div>
      </div>
    </div>
  );
}
