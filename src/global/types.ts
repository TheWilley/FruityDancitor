/*/ Editor Settings /*/
export type IEditorSettings = {
    rows: number;
    setRows: React.Dispatch<React.SetStateAction<number>>;
    width: number;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
    height: number;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
};

export type IExportSettings = {
    canvas: HTMLCanvasElement | undefined
    frames: IFrame[]
}

type IMod = {
    xoffset: number,
    yoffset: number,
    scale: number
}

export type IFrame = { row: Array<{base64: string, mods: IMod}>, name: string }