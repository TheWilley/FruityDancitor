/**
 * Extract base64 from an image
 */
function getBase64(file: File) {
    return new Promise((resolve, reject) => {
        if (file.type === 'image/jpeg') {
            const reader = new FileReader();

            reader.onloadend = function () {
                resolve(reader.result);
            };

            reader.onerror = function () {
                reject(new Error('Failed to read the file as Base64'));
            };

            reader.readAsDataURL(file);
        } else {
            reject(new Error('Unsupported file type'));
        }
    });
}

export { getBase64 };