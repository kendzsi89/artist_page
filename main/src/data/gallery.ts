const sources = Object.values(
  import.meta.glob("../assets/slider/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  })
) as string[];

const captions = [
  { place: "Vilnius", description: "Preparing and trying the competition piano" },
  { place: "Budapest", description: "Rehearsing Ravel Trio at the Radio" },
  { place: "Nairobi", description: "Performing Brahms Trio with amazing musicians" },
  { place: "Nairobi", description: "Playing for a packed hall at Muthaiga Country Club" },
  {
    place: "Copenhagen",
    description: "Studio sessions with Aaron Hudson's Double Bass Sonata",
  },
  { place: "Nairobi", description: "Masterclass with talented young musicians" },
  {
    place: "Copenhagen",
    description: "Graduation concert at the Royal Danish Academy of Music",
  },
];

export type GalleryPhoto = {
  src: string;
  place: string;
  description: string;
  alt: string;
};

export const photos: GalleryPhoto[] = sources.map((src, index) => {
  const { place, description } = captions[index];
  return { src, place, description, alt: `${description}, ${place}` };
});

export const pileDepth = 4;

export const photoName = (index: number) => `gallery-photo-${index}`;
