/**
 * Draws an image on a given tile
 */
function drawImageOnTile(ctx: CanvasRenderingContext2D, y: number, x: number, height: number, width: number) {
    console.log('drawing');
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    
    const image = new Image();
    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII';

    // Draw a rectangle at positon
    ctx.drawImage(image, x * width, y * width, width, height);
    ctx.fill();
}

export { drawImageOnTile };