type Modifications = {
    xoffset: number,
    yoffset: number,
    scale: number
}

export type SpriteSheetFrame = { sequence: Array<{base64: string, modifications: Modifications}>, name: string }