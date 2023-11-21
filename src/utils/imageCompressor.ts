function imageCompressor(
  file: File,
  compressionRatio: number,
  callback: (result: string) => void
) {
  const reader = new FileReader();

  reader.onload = (event: ProgressEvent<FileReader>) => {
    if (event.target?.result) {
      const image = new Image();
      image.src = event.target.result as string;

      image.onload = () => {
        // Create canvas element
        const canvas = document.createElement('canvas');

        // Set max width and height
        const MAX_WIDTH = 500;
        const MAX_HEIGHT = 500;

        // Get the actual width and height
        let width = image.width;
        let height = image.height;

        // Resize the image while maintaining its aspect ratio within the defined maximum width and height constraints
        if (width > height) {
          // If the image is landscape-oriented
          if (width > MAX_WIDTH) {
            // If the image width exceeds the maximum allowed width
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          // If the image is portrait-oriented or a square
          if (height > MAX_HEIGHT) {
            // If the image height exceeds the maximum allowed height
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        // Set canvas width and height
        canvas.width = width;
        canvas.height = height;

        // Get context and draw image
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(image, 0, 0, width, height);
          callback(canvas.toDataURL('image/png', compressionRatio));
        }
      };
    }
  };

  reader.readAsDataURL(file);
}

export default imageCompressor;
