import { useEffect, useRef, useState } from "react";
import Title from "./assets/components/Title";
import { AboutOpened} from "./assets/components/About";
import Menu from "./assets/components/Menu";
import Grid from "./assets/components/Grid";
import WindowOverlay from "./assets/components/WindowOverlay";
import Footer from "./assets/components/Footer";
import { data, type PortfolioItem } from "./assets/data/Data";
import BackgroundFX from "./assets/components/BackgroundFX";


function App() {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
const [activeId, setActiveId] = useState<number | null>(null);
const [nearMouse, setNearMouse] = useState(false);

  
const buttonRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleMove = (e: MouseEvent) => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    const distance = Math.sqrt(dx * dx + dy * dy);

    setNearMouse(distance < 100);
  };

  window.addEventListener("mousemove", handleMove);
  return () => window.removeEventListener("mousemove", handleMove);
}, []);

  
  return (
    <div className={`
     transition-all duration-700
    ${activeId ? "bg-[radial-gradient(circle_at_center,rgba(0,0,0,1),transparent_90%)]" : ""}
  `}>
      
      <div className={`transition-all duration-800 `}>
        <Title faded={menuOpen} aboutOpened={aboutOpen} setAboutOpen={setAboutOpen} menuOpen={menuOpen}/>
        <AboutOpened open={aboutOpen} faded={menuOpen} />
        
      <Grid
        items={data}
        onSelect={setSelected}
        compressed={menuOpen}
        setActiveId={setActiveId}
        activeId={activeId}
        aboutOpen={aboutOpen}
        menuOpen={menuOpen}
      />

      <WindowOverlay
        item={selected}
        onClose={() => setSelected(null)}
      />

      <Footer />
      
      </div>
      
<Menu onToggle={setMenuOpen} nearMouse={nearMouse} buttonRef={buttonRef}/>
<BackgroundFX
  aboutOpen={aboutOpen}
  menuOpen={menuOpen}
  activeId={activeId}
/>
      
    </div>
  );
}

export default App;