declare module "react-spotify-embed" {
  import type { HTMLAttributes, JSX } from "react";

  export interface SpotifyProps extends HTMLAttributes<HTMLIFrameElement> {
    link: string;
    wide?: boolean;
    width?: number | string;
    height?: number | string;
    frameBorder?: number | string;
    allow?: string;
  }

  export const Spotify: (props: SpotifyProps) => JSX.Element;
}
