// Generic type for setters and getters of useState
import { RefObject } from 'react';

export interface StateWithSetter<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}

export type AppSettings = {
  imageCompressionRatio: StateWithSetter<number>;
  customBackgroundSrc: StateWithSetter<string>;
  customBackgroundDarkness: StateWithSetter<number>;
};

export type EditorSettings = {
  numberOfSequences: StateWithSetter<number>;
  width: StateWithSetter<number>;
  height: StateWithSetter<number>;
};

export type EditorData = {
  spriteSheetFrames: StateWithSetter<SpriteSheetFrame[]>;
  selectedSequence: StateWithSetter<number>;
  selectedFrame: StateWithSetter<number>;
  viewport: RefObject<HTMLCanvasElement>;
};

export type ExportSettings = Pick<EditorData, 'spriteSheetFrames' | 'viewport'>;

export type SaveAndLoadSettings = Pick<EditorData, 'spriteSheetFrames'> &
  Pick<
    AppSettings,
    'imageCompressionRatio' | 'customBackgroundSrc' | 'customBackgroundDarkness'
  > &
  Pick<EditorSettings, 'width' | 'height' | 'numberOfSequences'>;

export type Modifications = {
  xoffset: number;
  yoffset: number;
  scale: number;
};

export type SpriteSheetFrame = {
  sequence: Array<{ objectURL: string; modifications: Modifications }>;
  name: string;
};
