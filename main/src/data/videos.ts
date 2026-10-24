export type Video = {
  id: string;
  title: string;
  poster?: string;
};

export const videos = {
  gershwin: {
    id: "CFD0RGI-iBo",
    title: "Rhapsody in Blue",
    poster: "/thumbnails/thumbnail_gershwin.jpg",
  },
  liveRecording: {
    id: "Rk6ekMRKa_Q",
    title: "Live recording",
  },
  performance: {
    id: "nEvbK84KEUI",
    title: "Performance",
  },
  teaching: {
    id: "wGovALom5O0",
    title: "Teaching",
  },
  electronics: {
    id: "ZUzsA6tV4Es",
    title: "Piano and electronics",
  },
} satisfies Record<string, Video>;
