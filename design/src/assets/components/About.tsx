import { aboutText, icons } from "../data/Data";

export function About({ faded, open, toggle }: { faded: boolean, open: boolean, toggle: () => void;}) {
  
  return (
    <div className={`grid col-span-full mt-10 lg:mt-0 md:flex flex-1 text-right h-full justify-end ${faded ? '' : ''}`}>
      <button
        onClick={toggle}
        className="flex  items-center self-end justify-end text-lg group uppercase text-(--muted) hover:text-white transition cursor-pointer"
        style={{ color: faded ? 'black' : '' }}
      ><span
          className={`pr-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] fill-(--muted) group-hover:fill-white
           ${open ? "group-hover:-rotate-270" : "group-hover:-rotate-90"}
          ${open ? "-rotate-180" : "rotate-0"}`}
          style={{ fill: faded ? 'black' : open ? 'white' : '' }}
        >
          {icons.arrow}
        </span>
            <div className="relative">

        <span className={`relative inset-0 transition-all duration-500 ${open ? "opacity-0 -translate-y-2 rotate-45" : "opacity-100 translate-y-0 rotate-0"}`}>
          About me
        </span>
         <span className={` absolute inset-0 transition-all duration-500  ${
      open
        ? "opacity-100 translate-y-0 rotate-0 text-white"
        : "opacity-0 translate-y-2 -rotate-45"
    }`}
    style={{ color: faded ? 'black' : '' }}>
    Close me
    </span>
    </div>
      </button>
    </div>
  );
};



export function AboutOpened({ open, faded }: { open: boolean; faded: boolean }) {
  return (
    <div
      className={`flex flex-col md:flex-row justify-stretch px-4 md:px-10 lg:px-20 transition-all duration-500 overflow-hidden gap-5 md:gap-30 ${
        open ? "max-h-100 mt-12 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      {/* IMAGE CONTAINER */}
      <div className={`relative flex-1 md:max-w-80 rounded-xl transition
      ${faded ? 'blur-sm opacity-50 brightness-30 scale-90 translate-x-10' : 'blur-0 grayscale-0'}`}>
  <img
    src="/images/profile/kendzsi-profile.jpeg"
    alt="Profile photo of Kendzsi Tanaka"
    className={`
      hidden md:block w-full h-full object-cover object-center md:object-bottom
      transition-all duration-400 rounded-xl
      ${open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
    `}
  />
</div>

      {/* TEXT */}
      <p
        className="relative flex-2 text-right text-(--text) font-light tracking-normal leading-normal transition-all duration-500"
        style={{ color: faded ? "black" : "white", filter: faded ? "blur(2px) " : "none", transform: faded ? "scale(0.95) translateX(10px)" : "none" }}
      >
        {aboutText}
      </p>
    </div>
  );
}