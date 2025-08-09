import { Spotify } from "react-spotify-embed";

export default function SpotifySection() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-[80vh] mx-auto mt-20 bg-[url('../src/assets/images/celeste-background.jpeg')] bg-cover bg-center bg-no-repeat">
        <Spotify
          link="https://open.spotify.com/album/1EGlTgldbnDa9VkMBnsroS?si=P5aO8TbVTqK1qbHFe6_FSQ"
          className="relative w-2/5 min-h-115 rounded-xl!"
        />
      </div>
    </>
  );
}
