type IMod = {
    xoffset: number,
    yoffset: number,
    scale: number
}

export type IFrame = { row: Array<{base64: string, mods: IMod}>, name: string }