import { SpriteSheetFrame } from '../global/types';
import { EditorData } from '../hooks/useEditorData';
import { IEditorSettings } from '../hooks/useEditorSettings';

export type IExportSettings = {
    canvas: HTMLCanvasElement | undefined
    frames: SpriteSheetFrame[]
}

export const deriveExportSettings = (editorData: EditorData) => {
    return {
        canvas: editorData.viewport,
        frames: editorData.spriteSheetFrames,
    };
};

export type ISaveAndLoadSettings = {
    frames: SpriteSheetFrame[]
    numberOfSequences: number
    width: number
    height: number
}

export const deriveSaveAndLoadSettings = (editorData: EditorData, editorSettings: IEditorSettings) => {
    return {
        frames: editorData.spriteSheetFrames,
        numberOfSequences: editorSettings.numberOfSequences,
        width: editorSettings.width,
        height: editorSettings.height,
    };
};
