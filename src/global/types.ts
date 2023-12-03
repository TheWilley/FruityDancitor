// Generic type for setters and getters of useState
import { Dispatch, RefObject, SetStateAction } from 'react';

export type Setter<T> = Dispatch<SetStateAction<T>>;

export type AppSettings = {
  imageCompressionRatio: number;
  setImageCompressionRatio: Setter<number>;
  customBackgroundSrc: string;
  setCustomBackgroundSrc: Setter<string>;
  customBackgroundDarkness: number;
  setCustomBackgroundDarkness: Setter<number>;
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
  spriteSheetFrames: SpriteSheetFrame[];
  setSpriteSheetFrames: Setter<SpriteSheetFrame[]>;
  selectedSequence: number;
  setSelectedSequence: Setter<number>;
  selectedFrame: number;
  setSelectedFrame: Setter<number>;
  viewport: RefObject<HTMLCanvasElement>;
};

export type PickDialogFrames = {
  showDialog: boolean;
  setShowDialog: Setter<boolean>;
  dialogFrames: string[];
  setDialogFrames: Setter<string[]>;
  selectedDialogFrames: number[];
  setSelectedDialogFrames: Setter<number[]>;
  callback: (base64: string) => void;
  spriteSheetFrames: EditorData['spriteSheetFrames'];
  selectedSequence: EditorData['selectedSequence'];
};

export type ExportSettings = Pick<EditorData, 'spriteSheetFrames' | 'viewport'>;

export type SaveAndLoadSettings = Pick<EditorData, 'setSpriteSheetFrames'> &
  Pick<
    AppSettings,
    'setImageCompressionRatio' | 'setCustomBackgroundSrc' | 'setCustomBackgroundDarkness'
  > &
  Pick<EditorSettings, 'setWidth' | 'setHeight' | 'setNumberOfSequences'>;

export type Modifications = {
  xoffset: number;
  yoffset: number;
  scale: number;
};

export type SpriteSheetFrame = {
  sequence: Array<{ objectURL: string; modifications: Modifications }>;
  name: string;
};
