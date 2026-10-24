export type Excerpt = {
  src: string;
  piece: string;
  seconds: number;
};

// Budget: 15–45 seconds, at most 800 KB (`du -k`).
export const EXCERPT: Excerpt | null = {
  src: "/audio/Bartok-sonata_Kendzsi_Jonas.mp3",
  piece: "Bartók sonata",
  seconds: 45,
};
