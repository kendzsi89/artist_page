import Icons from "./Icons";

export default function Hero() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background image */}

      <img
        className="absolute inset-0 w-full h-full object-cover animate-[zoomout_2s_ease]"
        src="../src/assets/images/hero.jpg"
        alt="portrait of Kendzsi"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-black to-transparent opacity-50 z-10" />

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white">
        <Icons />
        <h1 className="font-(family-name:--playfair) absolute bottom-30 left-30 text-[#0a0505] text-5xl md:text-7xl lg:text-8xl text-center animate-[appear_2s_ease_2s]">
          Kendzsi <br /> Tanaka
        </h1>
      </div>
    </div>
  );
}
