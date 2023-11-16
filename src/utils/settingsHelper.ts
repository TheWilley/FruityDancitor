import { SpriteSheetFrame } from '../global/types';
import { AppSettings } from '../hooks/useAppSettings';
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
    setImageCompressionRatio: React.Dispatch<React.SetStateAction<number>>
    imageCompressionRatio: number, 
    setNumberOfSequences:  React.Dispatch<React.SetStateAction<number>>
    numberOfSequences: number
    setWidth:  React.Dispatch<React.SetStateAction<number>>
    width: number
    setHeight:  React.Dispatch<React.SetStateAction<number>>
    height: number
}

export const deriveSaveAndLoadSettings = (editorData: EditorData, appSettings: AppSettings, editorSettings: IEditorSettings): DeriveSaveAndLoadSettings => {
    return {
        setSpriteSheetFrames: editorData.setSpriteSheetFrames,
        spriteSheetFrames: editorData.spriteSheetFrames,
        setImageCompressionRatio: appSettings.setImageCompressionRatio,
        imageCompressionRatio: appSettings.imageCompressionRatio,
        setNumberOfSequences: editorSettings.setnumberOfSequences,
        numberOfSequences: editorSettings.numberOfSequences,
        setWidth: editorSettings.setWidth,
        width: editorSettings.width,
        setHeight: editorSettings.setHeight,
        height: editorSettings.height,
    };
};
