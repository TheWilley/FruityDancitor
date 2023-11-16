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

export type DeriveExportSettings = {
    canvas: HTMLCanvasElement | undefined
    spriteSheetFrames: SpriteSheetFrame[]
}

export type EditorSettings = {
    numberOfSequences: number;
    setnumberOfSequences: React.Dispatch<React.SetStateAction<number>>;
    width: number;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
    height: number;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
};

export type EditorData = {
    spriteSheetFrames: SpriteSheetFrame[];
    setSpriteSheetFrames: React.Dispatch<React.SetStateAction<SpriteSheetFrame[]>>;
    selectedSequence: number;
    setSelectedSequence: React.Dispatch<React.SetStateAction<number>>;
    selectedFrame: number
    setSelectedFrame: React.Dispatch<React.SetStateAction<number>>;
    viewport: HTMLCanvasElement | undefined
    setViewport: React.Dispatch<React.SetStateAction<HTMLCanvasElement | undefined>>;
}

export type AppSettings = {
    imageCompressionRatio: number
    setImageCompressionRatio: React.Dispatch<React.SetStateAction<number>>;
}

type Modifications = {
    xoffset: number,
    yoffset: number,
    scale: number
}

export type SpriteSheetFrame = { sequence: Array<{base64: string, modifications: Modifications}>, name: string }