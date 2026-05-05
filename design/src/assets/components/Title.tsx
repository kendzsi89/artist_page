import {title} from "../data/Data";
import {About} from "./About";

export default function Title({
  faded,
  aboutOpened,
  setAboutOpen,
  menuOpen
}: {
  faded: boolean;
  aboutOpened: boolean;
  setAboutOpen: (v: boolean) => void;
  menuOpen: boolean;
}) {
  return (
    <div className={`relative grid grid-cols-2 lg:flex justify-between px-4 md:px-10 lg:px-20 pt-32 items-end transition-all duration-400 delay-75
    ${faded ? '' : ''}
    ${menuOpen ? 'blur-[2px] opacity-50 brightness-70 scale-95 translate-y-6' : 'blur-0 opacity-100 brightness-100 scale-100 translate-y-0'}`}>
      
      <h1 className={`relative inline text-5xl lg:text-7xl font-semibold tracking-tight `}
      style={{ color: faded ? 'black' : 'white' }}>
        {title.headline}
      </h1>
      <p className="relative ml-4 md:ml-0 lg:ml-12 inline text-left xl:text-center text-md lg:text-xl text-(--muted) max-w-lg font-light"
      style={{ color: faded ? 'black' : 'white' }}>
        {title.subheadline}
      </p>
      <About faded={faded} open={aboutOpened} toggle={() => setAboutOpen(!aboutOpened)}/>
    
    </div>
  );
};

