import { SpriteSheetFrame } from '../global/types';
import { EditorData } from '../hooks/useEditorData';
import { IEditorSettings } from '../hooks/useEditorSettings';

export type IExportSettings = {
    canvas: HTMLCanvasElement | undefined
    spriteSheetFrames: SpriteSheetFrame[]
}

export const deriveExportSettings = (editorData: EditorData) => {
    return {
        canvas: editorData.viewport,
        spriteSheetFrames: editorData.spriteSheetFrames,
    };
};

export type ISaveAndLoadSettings = {
    spriteSheetFrames: SpriteSheetFrame[]
    numberOfSequences: number
    width: number
    height: number
}

export const deriveSaveAndLoadSettings = (editorData: EditorData, editorSettings: IEditorSettings) => {
    return {
        spriteSheetFrames: editorData.spriteSheetFrames,
        numberOfSequences: editorSettings.numberOfSequences,
        width: editorSettings.width,
        height: editorSettings.height,
    };
};
