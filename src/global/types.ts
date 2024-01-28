import { Dispatch, RefObject, SetStateAction } from 'react';

export type Setter<T> = Dispatch<SetStateAction<T>>;

export type AppSettings = {
  customBackgroundSrc: string;
  setCustomBackgroundSrc: Setter<string>;
  customBackgroundDarkness: number;
  setCustomBackgroundDarkness: Setter<number>;
  previewFps: number;
  setPreviewFps: Setter<number>;
};

export type EditorSettings = {
  numberOfSequences: number;
  setNumberOfSequences: Setter<number>;
  width: number;
  setWidth: Setter<number>;
  height: number;
  setHeight: Setter<number>;
};

export type EditorData = {
  spriteSheetSequences: SpriteSheetSequences[];
  setSpriteSheetSequences: Setter<SpriteSheetSequences[]>;
  selectedSequence: number;
  setSelectedSequence: Setter<number>;
  selectedFrame: number;
  setSelectedFrame: Setter<number>;
  dialogFrames: string[];
  setDialogFrames: Setter<string[]>;
  dialogIsShown: boolean;
  setDialogIsShown: Setter<boolean>;
  selectedDialogFrames: number[];
  setSelectedDialogFrames: Setter<number[]>;
  viewport: RefObject<HTMLCanvasElement>;
  fileUpload: RefObject<HTMLInputElement>;
};

export type ExportSettings = Pick<EditorData, 'spriteSheetSequences' | 'viewport'>;

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

export type Upload = Pick<EditorData, 'fileUpload'>;
