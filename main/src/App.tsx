import Hero from "./header/Hero";
import Body from "./body/Body";
import Footer from "./footer/Footer";

function App() {
  return (
    <>
      <header>
        <Hero />
      </header>
      <main>
        <Body />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
