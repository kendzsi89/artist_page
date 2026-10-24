export type QuoteSource = {
  name: string;
  outlet?: string;
  url?: string;
};

export type Quote = {
  text: string;
  source?: QuoteSource;
};

export const gershwinQuote: Quote = {
  text: "… Kendzsi played Rhapsody in Blue with fantastic confidence, […] with huge, energetic fortes, and oftentimes with gentle, tender keystrokes.",
  source: {
    name: "Annaróza",
    outlet: "Régiségeknek",
    url: "https://regisegeknek.blog.hu/2018/06/24/egy_japan-magyar_zongorista_igeretes_palyakezdese",
  },
};

export const liveRecordingQuote: Quote = {
  text: "The warmth and melancholy of this soulful piece is beautifully captured in this live recording by pianist Kendzsi Tanaka...",
  source: {
    name: "PH Pianos",
    outlet: "The Chopin Project",
    url: "https://phpianosphfurniture.com/blogs/news/the-chopin-project-part-1-of-2",
  },
};
