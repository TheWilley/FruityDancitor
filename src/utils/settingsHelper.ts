import { IFrame } from '../global/types';
import { IEditorData } from '../hooks/useEditorData';
import { IEditorSettings } from '../hooks/useEditorSettings';

export type IExportSettings = {
    canvas: HTMLCanvasElement | undefined
    frames: IFrame[]
}

export const deriveExportSettings = (editorData: IEditorData) => {
    return {
        canvas: editorData.viewport,
        frames: editorData.frames,
    };
};

export type ISaveAndLoadSettings = {
    frames: IFrame[]
    rows: number
    width: number
    height: number
}

export const deriveSaveAndLoadSettings = (editorData: IEditorData, editorSettings: IEditorSettings) => {
    return {
        frames: editorData.frames,
        rows: editorSettings.rows,
        width: editorSettings.width,
        height: editorSettings.height,
    };
};
