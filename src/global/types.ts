import { RefObject } from 'react';

/**
 * Defines structure of saved and loaded projects.
 */
export type SaveAndLoad = {
  /**
   * Unique identifier for the project.
   */
  id: string;
  /**
   * THw width of the sprite sheet.
   */
  width: number;
  /**
   * The height of the sprite sheet.
   */
  height: number;
  /**
   * Whether the header should be shown.
   */
  showHeader: boolean;
  /**
   * The source of the background image. This is a URL.
   */
  backgroundSrc: string;
  /**
   * How dark the background should be. This is a number between 0 and 1.
   */
  backgroundDarkness: number;
  /**
   * The preview frame rate.
   */
  fps: number;
  /**
   * The number of sequences in the sprite sheet.
   */
  numberOfSequences: number;
  /**
   * The number of frames in a given sequence.
   */
  numberOfFrames: number;
  /**
   * The actual sequences of the sprite sheet.
   */
  spriteSheetSequences: SpriteSheetSequence[];
};

/**
 * The modifications to be applied to a frame in the sprite sheet.
 */
export type Modifications = {
  /**
   * The x offset of the frame.
   */
  xoffset: number;
  /**
   * The y offset of the frame.
   */
  yoffset: number;
  /**
   * The scale multiplier of the frame.
   */
  scale: number;
};

export type SpriteSheetSequence = {
  /**
   * The sequence of frames in the sprite sheet. Includes the object URL of the frame and the modifications to be applied to the frame.
   */
  sequence: Array<{ objectURL: string; modifications: Modifications }>;
  /**
   * The name of the sequence.
   */
  name: string;
};

/**
 * Defined "global" refs for the application.
 */
export type Refs = {
  /**
   * A canvas element that is used to display the sprite sheet.
   */
  viewport: RefObject<HTMLCanvasElement>;
  /**
   * A file input element that is used to upload a file.
   */
  fileUpload: RefObject<HTMLInputElement>;
};
/**
 * Defines the structure of the export object.
 */
export type Export = Pick<Refs, 'viewport'> & {
  /**
   * The sequences of the sprite sheet.
   */
  sequencesRetail: SpriteSheetSequence[];
  /**
   * The file name of the exported ZIP file.
   */
  filename: string;
};
