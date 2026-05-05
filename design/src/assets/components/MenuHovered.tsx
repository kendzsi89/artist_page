import {contactInfo} from "../data/Data";

export default function MenuHovered({ hovered, copied, copyStep }: { hovered: string | null; copied: string | null; copyStep: "phone" | "email" }) {
    
  return (
    <>
    
    {/* CONTACT */}
{hovered === "Contact" && (
  <>
    {/* Phone */}
    <div className="absolute bottom-100 left-10 text-3xl text-white
      opacity-0 animate-[fadeUp_0.5s_forwards_0.2s]">
      {contactInfo.phone}
    </div>

    {/* Email */}
    <div className="absolute bottom-90 left-10 text-3xl text-white
      opacity-0 animate-[fadeInLeft_0.6s_0.5s_forwards]">
      {contactInfo.email}
    </div>

    {/* Helper text */}
    <p className="absolute bottom-70 left-10 text-xl text-(--muted)
      opacity-0 animate-[fadeInRight_0.6s_0.8s_forwards]">
      Click to copy {copyStep === "phone" ? "phone" : "email"}
    </p>

    {/* Feedback */}
    {copied && (
      <p className="absolute bottom-60 left-10 text-sm text-white/70 animate-[fadeIn_0.3s_forwards]">
        Copied {copied === "phone" ? "number to clipboard" : "email to clipboard"} ✓
      </p>
    )}
 </>
)}

    {/* PIANO */}
    {hovered === "Piano" && (
        <>
      <div className="absolute bottom-0 right-10 w-full h-full flex flex-col items-end justify-end text-right">
        
        <p className="max-w-md text-(--muted) text-lg leading-relaxed
          opacity-0 animate-[fadeIn_0.6s_forwards]">
          I’m a trained pianist by education.  
          Music deeply influences how I think about rhythm, flow, and structure in design.
        </p>
        
                <p className="pt-15 relative right-90 bottom-0 text-sm text-white
          opacity-0 animate-[fadeIn_0.6s_0.3s_forwards] text-left">
            Click to explore my musician page        </p>

                    {/* Hand-drawn arrow */}

                  <svg
  className="relative right-60 bottom-15 w-80 h-80 opacity-0 animate-[fadeIn_0.6s_0.3s_forwards] rotate-45"
  viewBox="0 0 800 600"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m160.5,262.5c244,190 370,-43 349,-78c-21,-35 -130,-54 -165,-21c-35,33 82,286 277,218"
    stroke="white"
    strokeWidth="5"
    fill="none"
  />
  <line
    x1="619.5"
    y1="380.5"
    x2="570.5"
    y2="471.5"
    stroke="white"
    strokeWidth="4"
    strokeLinecap="round"
  />
  <line
    x1="543.5"
    y1="316.5"
    x2="617.5"
    y2="380.5"
    stroke="white"
    strokeWidth="4"
    strokeLinecap="round"
  />
</svg>
            </div>

      </>
    )}

    {/* ABOUT */}
    {hovered === "About" && (
         <>
      <p className="absolute w-full right-10 top-52 text-right text-(--muted) leading-relaxed max-w-lg
        opacity-0 animate-[fadeIn_0.6s_forwards] text-xl">
        I design and develop immersive digital experiences — from concept and motion design 
        through full-stack development and deployment. My work spans industrial platforms, 
        3D environments, and artist portfolios, always aiming to create systems that feel 
        both functional and expressive.
      </p>

      </>
    )}


    </>
  );
}