import { AppSettings, DeriveExportSettings, DeriveSaveAndLoadSettings, EditorData, EditorSettings } from '../global/types';
export const deriveExportSettings = (editorData: EditorData): DeriveExportSettings => {
    return {
        canvas: editorData.viewport,
        spriteSheetFrames: editorData.spriteSheetFrames,
    };
};

export const deriveSaveAndLoadSettings = (editorData: EditorData, appSettings: AppSettings, editorSettings: EditorSettings): DeriveSaveAndLoadSettings => {
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
