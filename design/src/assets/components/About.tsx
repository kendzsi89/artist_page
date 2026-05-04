import { aboutText, icons } from "../data/Data";

export function About({ faded, open, toggle }: { faded: boolean, open: boolean, toggle: () => void;}) {
  
  return (
    <div className={`text-right group ${faded ? '' : ''}`}>
      <button
        onClick={toggle}
        className="flex items-center gap-4 text-lg group uppercase text-(--muted) hover:text-white transition cursor-pointer"
      ><span
          className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:translate-x-1 group-hover:rotate-90 group-hover:fill-white
          ${open ? "rotate-180" : "rotate-0"}`}
        >
          {icons.arrow}
        </span>

        <span>{open ? "Close" : "About"}</span>
      </button>
    </div>
  );
};



export function AboutOpened({open}: {open: boolean;}) {
   
return (
<div
        className={`flex justify-end px-4 md:px-10 lg:px-20 transition-all duration-500 overflow-hidden  ${
          open ? "max-h-70 mt-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="relative text-right justify-end text-(--text) max-w-200 font-light tracking-tight leading-normal">
          {aboutText}
        </p>
      </div>
      )
    }