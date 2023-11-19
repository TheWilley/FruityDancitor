import {AppSettings, EditorData, EditorSettings} from '../global/types';

export const deriveExportSettings = (editorData: EditorData) => {
    return {
        viewport: editorData.viewport,
        spriteSheetFrames: editorData.spriteSheetFrames,
    };
};

export const deriveSaveAndLoadSettings = (editorData: EditorData, appSettings: AppSettings, editorSettings: EditorSettings) => {
    return {
        spriteSheetFrames: editorData.spriteSheetFrames,
        imageCompressionRatio: appSettings.imageCompressionRatio,
        numberOfSequences: editorSettings.numberOfSequences,
        width: editorSettings.width,
        height: editorSettings.height,
    };
};
