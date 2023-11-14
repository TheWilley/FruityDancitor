import { SpriteSheetFrame } from '../global/types';
import { EditorData } from '../hooks/useEditorData';
import { IEditorSettings } from '../hooks/useEditorSettings';

export type DeriveExportSettings = {
    canvas: HTMLCanvasElement | undefined
    spriteSheetFrames: SpriteSheetFrame[]
}

export const deriveExportSettings = (editorData: EditorData): DeriveExportSettings => {
    return {
        canvas: editorData.viewport,
        spriteSheetFrames: editorData.spriteSheetFrames,
    };
};

export type DeriveSaveAndLoadSettings = {
    setSpriteSheetFrames:  React.Dispatch<React.SetStateAction<SpriteSheetFrame[]>>
    spriteSheetFrames: SpriteSheetFrame[]
    setNumberOfSequences:  React.Dispatch<React.SetStateAction<number>>
    numberOfSequences: number
    setWidth:  React.Dispatch<React.SetStateAction<number>>
    width: number
    setHeight:  React.Dispatch<React.SetStateAction<number>>
    height: number
}

export const deriveSaveAndLoadSettings = (editorData: EditorData, editorSettings: IEditorSettings): DeriveSaveAndLoadSettings => {
    return {
        setSpriteSheetFrames: editorData.setSpriteSheetFrames,
        spriteSheetFrames: editorData.spriteSheetFrames,
        setNumberOfSequences: editorSettings.setnumberOfSequences,
        numberOfSequences: editorSettings.numberOfSequences,
        setWidth: editorSettings.setWidth,
        width: editorSettings.width,
        setHeight: editorSettings.setHeight,
        height: editorSettings.height,
    };
};
