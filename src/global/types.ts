// Generic type for setters and getters of useState
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
  viewport: StateWithSetter<HTMLCanvasElement | undefined>;
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
  sequence: Array<{ base64: string; modifications: Modifications }>;
  name: string;
};
