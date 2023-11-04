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

export type IFrame = { row: Array<string>, name: string }