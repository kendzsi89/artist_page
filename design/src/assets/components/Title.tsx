import {title} from "../data/Data";
import {About} from "./About";

export default function Title({
  faded,
  aboutOpened,
  setAboutOpen
}: {
  faded: boolean;
  aboutOpened: boolean;
  setAboutOpen: (v: boolean) => void;
}) {
  return (
    <div className={`flex justify-between items-end px-4 md:px-10 lg:px-20 pt-32 ${faded ? '' : ''}`}>
      <div>
      <h1 className={`inline text-5xl md:text-7xl font-semibold tracking-tight `}
      style={{ color: faded ? '#444444' : 'white' }}>
        {title.headline}
      </h1>
      <p className="ml-12 inline text-center text-xl text-(--muted) max-w-lg font-light">
        {title.subheadline}
      </p>
      </div>
      <About faded={faded} open={aboutOpened} toggle={() => setAboutOpen(!aboutOpened)}/>
    
    </div>
  );
};

