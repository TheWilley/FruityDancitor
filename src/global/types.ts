// Generic type for setters and getters of useState
import { Dispatch, RefObject, SetStateAction } from 'react';

export type Setter<T> = Dispatch<SetStateAction<T>>;

export type AppSettings = {
  useImageCompression: boolean;
  setUseImageCompression: Setter<boolean>;
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
  spriteSheetSequences: SpriteSheetSequences[];
  setSpriteSheetSequences: Setter<SpriteSheetSequences[]>;
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
  spriteSheetSequences: EditorData['spriteSheetSequences'];
  selectedSequence: EditorData['selectedSequence'];
};

export type ExportSettings = Pick<EditorData, 'spriteSheetSequences' | 'viewport'>;

export type LoadSettings = Pick<EditorData, 'setSpriteSheetSequences'> &
  Pick<
    AppSettings,
    'setUseImageCompression' | 'setCustomBackgroundSrc' | 'setCustomBackgroundDarkness'
  > &
  Pick<EditorSettings, 'setWidth' | 'setHeight' | 'setNumberOfSequences'>;

export type SaveSettings = Pick<EditorData, 'spriteSheetSequences'> &
  Pick<
    AppSettings,
    'useImageCompression' | 'customBackgroundSrc' | 'customBackgroundDarkness'
  > &
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
