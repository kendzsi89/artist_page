export default function Footer() {
  return (
    <div className="flex relative w-screen h-screen overflow-hidden">
      {/* Background image */}

      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/footer.jpeg"
        alt="portrait of Kendzsi"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-transparent opacity-40 z-10" />

      {/* Content Layer */}
      <div className="relative px-[10%] top-40 z-20 flex flex-col items-start h-full w-full">
        <h2 className="font-(family-name:--playfair) text-white text-5xl md:text-7xl lg:text-10xl ">
          Contact
        </h2>
        <div className="relative z-20 flex flex-col items-start w-full mt-30">
          <h3 className="font-(family-name:--playfair) text-[#0a0505] text-xl md:text-2xl lg:text-3xl">
            akendzsi (@) gmail.com
          </h3>
          <h3 className="font-(family-name:--playfair) text-[#0a0505] text-xl md:text-2xl lg:text-3xl">
            +455o394351
          </h3>
        </div>
        <div className="relative z-20 flex flex-col items-start w-1/3 mt-30 max-w-100">
          <h3 className="font-(family-name:--playfair) text-[#0a0505] leading-[1.9em] text-xl md:text-xl lg:text-2xl">
            Let's have a chat! I am always open for new projects and
            collaborations.
          </h3>
        </div>
      </div>
    </div>
  );
}
