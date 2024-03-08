import { RefObject } from 'react';

export type SaveAndLoad = {
  id: string;
  width: number;
  height: number;
  showHeader: boolean;
  backgroundSrc: string;
  backgroundDarkness: number;
  fps: number;
  numberOfSequences: number;
  numberOfFrames: number;
  spriteSheetSequences: SpriteSheetSequence[];
};

export type Modifications = {
  xoffset: number;
  yoffset: number;
  scale: number;
};

export type SpriteSheetSequence = {
  sequence: Array<{ objectURL: string; modifications: Modifications }>;
  name: string;
};

export type Refs = {
  viewport: RefObject<HTMLCanvasElement>;
  fileUpload: RefObject<HTMLInputElement>;
};

export type Export = Pick<Refs, 'viewport'> & {
  sequencesRetail: SpriteSheetSequence[];
  filename: string;
};
