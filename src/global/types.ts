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
};

export type ExportSettings = Pick<EditorData, 'spriteSheetSequences' | 'viewport'>;

export type LoadSettings = Pick<EditorData, 'setSpriteSheetSequences'> &
  Pick<
    AppSettings,
    'setPreviewFps' | 'setCustomBackgroundSrc' | 'setCustomBackgroundDarkness'
  > &
  Pick<EditorSettings, 'setWidth' | 'setHeight' | 'setNumberOfSequences'>;

export type SaveSettings = Pick<EditorData, 'spriteSheetSequences'> &
  Pick<AppSettings, 'previewFps' | 'customBackgroundSrc' | 'customBackgroundDarkness'> &
  Pick<EditorSettings, 'width' | 'height' | 'numberOfSequences'>;

export type Modifications = {
  xoffset: number;
  yoffset: number;
  scale: number;
};

export type SpriteSheetSequences = {
  sequence: Array<{ objectURL: string; modifications: Modifications }>;
  name: string;
};

export type Upload = Pick<
  EditorData,
  | 'spriteSheetSequences'
  | 'setSpriteSheetSequences'
  | 'selectedSequence'
  | 'dialogFrames'
  | 'setDialogFrames'
  | 'dialogIsShown'
  | 'setDialogIsShown'
  | 'selectedDialogFrames'
  | 'setSelectedDialogFrames'
>;
