import { useEffect, useRef, useState } from "react";
import { icons } from "../data/Data";
import { menu } from "../data/Data";
import MenuHovered from "./MenuHovered";

interface Props {
  onToggle: (open: boolean) => void;
  nearMouse: boolean;
  buttonRef?: React.RefObject<HTMLDivElement | null>;
}

const Menu = ({ onToggle, nearMouse, buttonRef }: Props) => {
  
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(open);
  const [animateIn, setAnimateIn] = useState(false);
  const [_hovered, setHovered] = useState<string | null>(null);


  const [copyStep, setCopyStep] = useState<"phone" | "email">("phone");
  const [copied, setCopied] = useState<string | null>(null);
  

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      setVisible(window.scrollY < lastY);
      lastY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  if (open) {
    requestAnimationFrame(() => {
      setAnimateIn(true);
    });
  } else {
    setAnimateIn(false);
  }
}, [open]);

  const toggle = () => {
  if (!open) {
    setMounted(true);          // 1. mount invisible
    setOpen(true);             // 2. trigger animation AFTER mount
  } else {
    setOpen(false);            // 1. animate out
    setTimeout(() => setMounted(false), 700); // 2. unmount
  }

  onToggle(!open);
};


const handleCopy = async () => {
    const value =
      copyStep === "phone"
        ? "+45 50 39 43 51"
        : "akendzsi@gmail.com";

    try {
      await navigator.clipboard.writeText(value);

      setCopied(copyStep);

      // toggle next step
      setCopyStep(copyStep === "phone" ? "email" : "phone");

      // reset feedback
      setTimeout(() => setCopied(null), 1200);
    } catch (err) {
      console.error("Clipboard failed", err);
    }
  };


  return (
    <>
      {/* Ambient Blur Layer */}
      {open && <div className="menu-blur-bg"/>}

      {/* Center Button */}
      <div
      ref={buttonRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          (visible || nearMouse || open) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <button
          onClick={toggle}
          className="px-5 py-2 bg-(--surface) rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300 cursor-pointer z-60"
        >
          {/* Hamburger */}
  <span
    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
    ${
      open
        ? "opacity-0 -translate-y-2 rotate-45"
        : "opacity-100 translate-y-0 rotate-0"
    }`}
  >
    {icons.hamburger}
  </span>

  {/* Close */}
  <span
    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
    ${
      open
        ? "opacity-100 translate-y-0 rotate-0"
        : "opacity-0 translate-y-2 -rotate-45"
    }`}
  >
    {icons.close}
  </span>

  {/* Invisible spacer to keep size */}
  <span className="opacity-0">{icons.hamburger}</span>
        </button>
      </div>

      {/* Radial Items */}
     {mounted && <div className={`fixed inset-0 z-50}`}>
      
        
        {/* Top Left */}
        <div
          className={`hidden absolute top-6 left-6 text-9xl text-(--mint) transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-100
          ${animateIn 
            ? "opacity-100 translate-x-0 translate-y-0 scale-100"
            : "opacity-0 -translate-x-40 -translate-y-40 scale-50"
          }`}
        >
<button
    className="
      px-4 py-2
       text-9xl 

       
       rounded-xl
          cursor-pointer
      transition-all duration-500
      hover:scale-[1.1]
      hover:translate-x-3 hover:translate-y-3
      active:scale-95
    "
    onMouseEnter={() => setHovered(menu[0].name)}
  onMouseLeave={() => setHovered(null)}
  onClick={() => window.location.href = menu[0].href}
  >
    {menu[0].name}
  </button>        </div>

        {/* Top Right */}
        <div
          className={`absolute top-6 right-6 text-9xl text-(--mint) transition-all duration-700 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)] 
          ${animateIn
            ? "opacity-100 translate-x-0 translate-y-[150%] md:translate-y-0 scale-100 cursor-pointer"
            : "opacity-0 translate-x-40 -translate-y-40 scale-50"
          }`}
        >
          <button
    className="
      px-4 py-2
      text-9xl 

       
       rounded-xl
          cursor-pointer
      transition-all duration-500
      hover:scale-[1.1]
      hover:-translate-x-3 hover:translate-y-3
      active:scale-95
    "
    onMouseEnter={() => setHovered(menu[1].name)}
  onMouseLeave={() => setHovered(null)}
  onClick={() => window.location.href = menu[1].href}
  >
            {menu[1].name}
          </button>
        </div>

        {/* Bottom Left */}
        <div
          className={`absolute bottom-6 left-6 text-9xl text-(--mint) transition-all duration-700 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)] 
          ${animateIn
            ? "opacity-100 translate-x-0 translate-y-[-150%] md:translate-y-0 scale-100 cursor-pointer"
            : "opacity-0 -translate-x-40 translate-y-40 scale-50"
          }`}
        >
          <button
    className="
      px-4 py-2
     text-9xl 

       
       rounded-xl
          cursor-pointer
      transition-all duration-500
      hover:scale-[1.1]
      hover:translate-x-3 hover:-translate-y-3
      active:scale-95
    "
    onMouseEnter={() => setHovered(menu[2].name)}
  onMouseLeave={() => setHovered(null)}
    onClick={handleCopy}
  >{menu[2].name}</button>
        </div>

        {/* Bottom Right */}
        <div
          className={`absolute bottom-6 right-6 text-9xl transition-all duration-700 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] 
          ${animateIn
            ? "opacity-100 translate-x-0 translate-y-0 scale-100 cursor-pointer"
            : "opacity-0 translate-x-40 translate-y-40 scale-50"
          }`}
        >
          <button
    className="
      px-4 py-2
    text-(--mint) text-9xl 

       
       rounded-xl
          cursor-pointer
      transition-all duration-500
      hover:scale-[1.1]
      hover:-translate-x-3 hover:-translate-y-3
      active:scale-95
    "
    onMouseEnter={() => setHovered(menu[3].name)}
  onMouseLeave={() => setHovered(null)}
  onClick={() => window.open(menu[3].href, "_blank")}
  >
          {menu[3].name}</button>
        </div>
        <div className="hidden md:flex flex-col fixed inset-0 items-center justify-center pointer-events-none z-40">
  <MenuHovered hovered={_hovered} copied={copied} copyStep={copyStep} />
</div>
      </div>}
    </>
  );
};

export default Menu;