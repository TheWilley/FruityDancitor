import { db } from './db.ts';

/**
 *
 */
export async function addImage(base64: string) {
  try {
    const id = await db.frames.add({
      base64: base64,
      modifications: { scale: 0, xoffset: 0, yoffset: 0 },
    });

    return id;
  } catch (error) {
    // Handle errors here, you can log or throw the error
    console.error('Error adding data:', error);
    throw error;
  }
}

/**
 *
 */
export async function getImage(id: number) {
  const data = await db.frames.get({ id: id });
  return data;
}
