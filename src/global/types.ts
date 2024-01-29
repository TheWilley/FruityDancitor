import { RefObject } from 'react';

export type SaveAndLoad = {
  width: number;
  height: number;
  backgroundSrc: string;
  backgroundDarkness: number;
  fps: number;
  numberOfSequences: number;
  spriteSheetSequences: SpriteSheetSequences[];
};

export type Modifications = {
  xoffset: number;
  yoffset: number;
  scale: number;
};

export type SpriteSheetSequences = {
  sequence: Array<{ objectURL: string; modifications: Modifications }>;
  name: string;
};

export type Refs = {
  viewport: RefObject<HTMLCanvasElement>;
  fileUpload: RefObject<HTMLInputElement>;
};

export type Export = Pick<Refs, 'viewport'> & {
  sequencesRetail: SpriteSheetSequences[];
  filename: string;
};
