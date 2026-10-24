import { useState } from "react";
import type { Video } from "../data/videos";

export default function VideoPoster({
  video,
  playing,
  onPlay,
}: {
  video: Video;
  playing: boolean;
  onPlay?: () => void;
}) {
  const remotePoster = `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`;
  const fallbackPoster = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  const [posterSrc, setPosterSrc] = useState(video.poster ?? remotePoster);

  return (
    <div className="mount w-full">
      {playing ? (
        <iframe
          className="block w-full bg-black"
          style={{ aspectRatio: "16/9", border: 0 }}
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="relative block w-full cursor-pointer border-0 bg-black p-0"
          style={{ aspectRatio: "16/9" }}
          aria-label={`Play video: ${video.title}`}
          onClick={() => onPlay?.()}
        >
          <img
            src={posterSrc}
            alt={video.title}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            onError={() => {
              if (posterSrc !== fallbackPoster) setPosterSrc(fallbackPoster);
            }}
          />
          <span className="play-disc" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
