import { useRef, useState } from "react";
import { EXCERPT } from "../data/audio";

export default function ListenButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  if (!EXCERPT || hidden) return null;

  const excerpt = EXCERPT;

  function stop(audio: HTMLAudioElement) {
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);
    setProgress(0);
  }

  function toggle() {
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(excerpt.src);
      audio.preload = "none";
      audio.addEventListener("timeupdate", () => {
        const duration = audio?.duration;
        setProgress(duration ? (audio?.currentTime ?? 0) / duration : 0);
      });
      audio.addEventListener("ended", () => {
        setPlaying(false);
        setProgress(0);
      });
      audio.addEventListener("error", () => setHidden(true));
      audioRef.current = audio;
    }

    if (!audio.paused) {
      stop(audio);
      return;
    }

    void audio.play().then(
      () => setPlaying(true),
      () => setHidden(true),
    );
  }

  return (
    <button
      type="button"
      className="listen font-(family-name:--lato) text-[11px] tracking-[0.14em] uppercase text-[rgb(250_247_242/0.8)]"
      aria-label={
        playing
          ? `Stop: ${excerpt.piece}`
          : `Listen: ${excerpt.piece}, ${excerpt.seconds} seconds`
      }
      onClick={toggle}
    >
      <span
        className={playing ? "listen-disc ambient" : "listen-disc"}
        aria-hidden="true"
      />
      {playing ? "Stop" : "Listen"}
      <span
        className="listen-progress"
        style={{ width: `${Math.round(progress * 100)}%` }}
      />
    </button>
  );
}
