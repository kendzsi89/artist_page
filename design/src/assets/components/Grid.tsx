import Element from "./Element";
import type { PortfolioItem } from "../data/Data";


interface Props {
  items: PortfolioItem[];
  onSelect: (item: PortfolioItem) => void;
  compressed: boolean;
  setActiveId: (id: number | null) => void;
  activeId: number | null;
  aboutOpen: boolean;
  menuOpen: boolean;
}


const Grid = ({ items, onSelect, compressed, setActiveId, activeId, menuOpen }: Props) => {

  return (
    
    <div
      className={`px-4 md:px-10 lg:px-20 pb-24 pt-24 z-0 grid gap-24 grid-flow-dense transition-all duration-500 ${
        compressed ? "" : ""}
      grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3
       ${menuOpen ? 'blur-[2px] opacity-50 brightness-70 scale-95 -translate-y-6' : 'blur-0 opacity-100 brightness-100 scale-100'}`}
    >
      {items.map((item) => (
        <Element key={item.id} item={item} onClick={onSelect} setActiveId={setActiveId} activeId={activeId} menuOpen={menuOpen} />
      ))}
    </div>
  );
};

export default Grid;