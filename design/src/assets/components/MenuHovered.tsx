import {contactInfo} from "../data/Data";

export default function MenuHovered({ hovered, copied, copyStep }: { hovered: string | null; copied: string | null; copyStep: "phone" | "email" }) {
    
  return (
    <>
    
    {/* CONTACT */}
{hovered === "Contact" && (
  <>
    {/* Phone */}
    <div className={`absolute bottom-115 left-10 text-3xl text-white
      transition-all duration-500 delay-1000
      ${hovered === "Contact" ? "opacity-100" : "opacity-0"}`}>
      {contactInfo.cta}
    </div>
    <div className="absolute bottom-100 left-10 text-3xl text-white
      opacity-0 animate-[fadeUp_0.5s_forwards_0.2s]">
      {contactInfo.phone}
    </div>

    {/* Email */}
    <div className="absolute bottom-85 left-10 text-3xl text-white
      opacity-0 animate-[fadeInLeft_0.6s_0.5s_forwards]">
      {contactInfo.email}
    </div>

    {/* Helper text */}
    <p className="absolute bottom-50 left-10 text-xl text-(--muted)
      opacity-0 animate-[fadeInRight_0.6s_0.8s_forwards]">
      Click to copy {copyStep === "phone" ? "phone" : "email"}
    </p>
    <svg className="absolute left-24 bottom-6 w-80 h-80 opacity-0 animate-[fadeIn_0.6s_0.7s_forwards]" 
    viewBox="0 0 800 600"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
 <g>
  <title>Layer 1</title>
  <path stroke="white" stroke-width="4" d="m326,229.5c0,0 -0.203,-0.2565 1,-1c2.69,-1.66251 7.10059,-2.38779 15,-4c7.13306,-1.45581 8.15225,-1.23463 10,-2c1.30655,-0.5412 4.95712,-2.24541 10,-3c9.93921,-1.48724 18,-2 29,-2c15,0 23.00925,-0.40784 32,0c11.03403,0.50052 22.92987,3.34686 32,5c13.91293,2.5358 28.9046,4.48607 43,7c13.92242,2.48308 18.25409,2.35724 24,5c5.29749,2.43651 10.41888,6.41885 12,8c1.58112,1.58115 2,3 2,5c0,7 -0.78986,10.07843 -2,13c-1.71143,4.13171 -11.4505,15.4505 -14,18c-2.5495,2.5495 -6,4 -9,6c-9,6 -12,7 -14,9c-2,2 -3.56952,7.133 -5,11c-0.77579,2.09717 -1.49622,3.90778 -2,8c-0.85529,6.94754 0,10 0,13c0,3 0,4 0,6l1,0" id="svg_3" fill="none"/>
  <path stroke="white" stroke-width="4" d="m451,283.5c0,1 0.07339,1.93164 1,3c3.276,3.77728 8.83505,12.11328 13,18c2.88785,4.0817 4.4588,6.69345 5,8c0.38269,0.92389 1,2 1,2c0,0 0,1 1,1c0,0 1,1 1,1c1,2 3.3764,2.08032 5,6c0.38269,0.92389 2,2 3,3c1,1 2,2 2,2c1,1 1,1 1,1c0,1 1,1 1,1c1,1 1.29291,0.29291 2,1c0.70709,0.70709 1,1 1,1c0,0 0,0 1,-1c1,-1 2.07843,-1.78986 5,-3c4.13171,-1.71143 19.14362,-4.38248 29,-7c3.05634,-0.81165 9.18604,-2.69254 11,-4c1.14728,-0.8269 1.29291,-0.29291 2,-1c0.70709,-0.70709 1.29291,-0.29291 2,-1c0.70709,-0.70709 0.29291,-1.29291 1,-2c0.70709,-0.70709 2,-1 2,-1c0,-1 1,-1 1,-1l0,0l1,0l0,-1" id="svg_7" fill="none"/>
 </g>

</svg>

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