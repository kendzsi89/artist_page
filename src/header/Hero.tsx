import Icons from "./Icons";

export default function Hero() {
  return (
    <div className="flex relative w-screen h-screen overflow-hidden">
      {/* Background image */}

      <img
        className="absolute inset-0 w-full h-full object-cover animate-[zoomout_2s_ease]"
        src="/images/hero.jpg"
        alt="portrait of Kendzsi"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-black to-transparent opacity-50 z-10" />

      {/* Content Layer */}
      <div className="relative z-20 flex flex-row items-end justify-between h-full w-full text-white">
        <Icons />
        <h1 className="font-(family-name:--playfair) relative bottom-50 left-[10%] text-[#0a0505] text-5xl md:text-5xl lg:text-6xl text-left animate-[appear_2s_ease]">
          Kendzsi <br /> Tanaka
        </h1>
        <p className="font-(family-name:--playfair) relative bottom-2 right-3 text-[#0a0505] text-xs">
          awesome photo by{" "}
          <a
            className="text-[#0a0505]!"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.schlichtkrull.com"
          >
            <u>Agnete Schlichtkrull</u>
          </a>
        </p>
      </div>
    </div>
  );
}
