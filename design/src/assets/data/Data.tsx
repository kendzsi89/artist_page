export interface PortfolioItem {
  id: number;
  title: string;
  thumbnail: string;
  image: string;
  previews?: string[];
  description: string;
  url?: string;
  type: "external" | "internal";
  logo?: string;
  media?: {
    type: "image" | "video";
    src: string;
  };
  useLoader?: boolean;
}

export const icons = {
    hamburger: <svg className="w-6 h-6 fill-(--bg)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M112 448C103.2 448 96 455.2 96 464C96 508.2 131.8 544 176 544L464 544C508.2 544 544 508.2 544 464C544 455.2 536.8 448 528 448L112 448zM96 266C96 278.2 105.9 288 118 288L522 288C534.2 288 544 278.1 544 266C544 248.8 541.4 231.6 533.2 216.5C511 175.7 450.9 96 320 96C189.1 96 129 175.6 106.8 216.5C98.6 231.6 96 248.8 96 266zM64 368C64 385.7 78.3 400 96 400L544 400C561.7 400 576 385.7 576 368C576 350.3 561.7 336 544 336L96 336C78.3 336 64 350.3 64 368zM320 136C333.3 136 344 146.7 344 160C344 173.3 333.3 184 320 184C306.7 184 296 173.3 296 160C296 146.7 306.7 136 320 136zM184 192C184 178.7 194.7 168 208 168C221.3 168 232 178.7 232 192C232 205.3 221.3 216 208 216C194.7 216 184 205.3 184 192zM432 168C445.3 168 456 178.7 456 192C456 205.3 445.3 216 432 216C418.7 216 408 205.3 408 192C408 178.7 418.7 168 432 168z"/></svg>,
    close: <svg className="w-6 h-6 fill-(--bg)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z"/></svg>,
    arrow: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M297.4 566.6C309.9 579.1 330.2 579.1 342.7 566.6L502.7 406.6C515.2 394.1 515.2 373.8 502.7 361.3C490.2 348.8 469.9 348.8 457.4 361.3L352 466.7L352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 466.7L182.6 361.3C170.1 348.8 149.8 348.8 137.3 361.3C124.8 373.8 124.8 394.1 137.3 406.6L297.3 566.6z"/></svg>

  }

  export const menu = [
  { name: "Work", href: "#", position: "top-left", delay: "delay-0" },
  { name: "About", href: "#about", position: "top-right", delay: "delay-75" },
  { name: "Contact", href: "#contact", position: "bottom-left", delay: "delay-150" },
  { name: "Piano", href: "https://kendzsi.com", position: "bottom-right", delay: "delay-200" }
];

export const title = {
    headline:<>I'm Kendzsi,</>,
    subheadline:<>a web developer crafting <i>digital experiences.</i></>
}

export const aboutText = `
I design and build immersive digital experiences with a focus on clarity, motion, and storytelling.

Much of my work has been in collaboration with industrial companies, where I translate complex machinery and production capabilities into accessible, visual narratives—showcasing both the products and what they make possible.

Alongside this, I work with 3D animation and rendering, as well as portfolio platforms for artists and creatives, always aiming to balance aesthetics with performance.

My process spans the full stack: from concept and interface design to development and deployment. I handle everything from front-end architecture to CI/CD pipelines, ensuring smooth delivery and reliability.

After launch, I continue with maintenance, iteration, and optimization—supporting projects beyond handover.

I also work across digital media, including photography, iconography, and brand identity, creating cohesive visual systems that extend beyond the screen.
`;

export const data: PortfolioItem[] = [
  {
    id: 1,
    title: "Nodi A/S",
    thumbnail: "/images/placeholder.jpg",
    image: "/images/placeholder.jpg",
    previews: ["/images/previews/nodi/nodi-preview-1.jpeg", "/images/previews/nodi/nodi-preview-2.jpeg", "/images/previews/nodi/nodi-preview-3.jpeg"],
    description: "A serverless frontend connected to an Odoo backend, designed to showcase complex industrial machinery and production capabilities through a clean, performant interface.",
    url: "https://nodi.dk",
    type: "external",
    logo: "logos/nodi.png",
    media: {
      type: "video",
      src: "/videos/nodi-walkthrough.mov"
  }
  },
  {
    id: 2,
    title: "analogprints.dk",
    thumbnail: "/images/placeholder.jpg",
    image: "/images/placeholder.jpg",
    previews: ["/images/previews/analogprints/analogprints-preview-1.jpeg", "/images/previews/analogprints/analogprints-preview-2.jpeg", "/images/previews/analogprints/analogprints-preview-3.jpeg"],
    description: "A full-stack webshop built from scratch, focused on selling curated photographic prints with a minimal, tactile browsing experience.",
    url: "https://analogprints.dk",
    type: "external",
    logo: "logos/analogprints.png",
    media: {
      type: "video",
      src: "/videos/analogprints-walkthrough.mov"
  }
  },
  {
    id: 3,
    title: "Tonmeister Jonas Eliyah",
    thumbnail: "/images/placeholder.jpg",
    image: "/images/placeholder.jpg",
    previews: ["/images/previews/jonaseliyah/jonaseliyah-preview-1.jpeg", "/images/previews/jonaseliyah/jonaseliyah-preview-2.jpeg", "/images/previews/jonaseliyah/jonaseliyah-preview-3.jpeg"],
    description: "A portfolio platform for a sound artist, combining digital and analog photography with a restrained, atmospheric visual language.",
    url: "https://jonaseliyah.com",
    type: "external",
    logo: "logos/jonaseliyah.png",
    media: {
      type: "video",
      src: "/videos/jonaseliyah-walkthrough.mov"
  }
  },
  {
    id: 4,
    title: "3D Photo Gallery",
    thumbnail: "/images/placeholder.jpg",
    image: "/images/placeholder.jpg",
    previews: ["/images/previews/internal/gallery-preview.png"],
    description: "An experimental 3D gallery space where photographs are placed within a fictional environment, exploring spatial storytelling.",
    url: "/projects/3DGallery/index.html",
    type: "internal",
    useLoader: true
  },
  {
    id: 5,
    title: "Space Composer",
    thumbnail: "/images/placeholder.jpg",
    image: "/images/placeholder.jpg",
    previews: ["/images/previews/internal/spacecomposer-preview.png"],
    description: "An interactive audio-visual experiment where sound evolves based on spatial relationships between celestial bodies.",
    url: "/projects/Space-composer/index.html",
    type: "internal",
    useLoader: true
  },
  {
    id: 6,
    title: "Image to PDF",
    thumbnail: "/images/placeholder.jpg",
    image: "/images/placeholder.jpg",
    previews: ["/images/previews/internal/imagetopdf-preview.png"],
    description: "A client-side tool that converts images to PDF format, with basic contrast and lighting editing tools. Supports HEIC, JPG, and PNG file formats.",
    url: "projects/ImageToPDF/index.html",
    type: "internal",
    useLoader: true
  }
];

export const contactInfo = {
  phone: "+45 5O 34 43 51",
  email: "akendzsi(@)gmail.com"
};