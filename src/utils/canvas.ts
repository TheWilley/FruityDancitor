/**
 * Draws an image on a given tile
 */
function drawImageOnTile(ctx: CanvasRenderingContext2D, base64: string, y: number, x: number, height: number, width: number) {
    const image = new Image();
    image.src = base64;

    // Draw a rectangle at positon
    ctx.drawImage(image, x * width, y * height, width, height);
    ctx.fill();
}

export { drawImageOnTile };