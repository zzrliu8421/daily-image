import fs from 'node:fs/promises';
import path from 'node:path';

export const config = {
  runtime: 'nodejs',
};

export default async function (request, response) {

  let filename = 'daily.webp';
  let contentType = 'image/webp';

  const imagePath = path.resolve(process.cwd(), filename);

  try {
    const imageBuffer = await fs.readFile(imagePath);
    response.setHeader('Content-Type', contentType);
    response.send(imageBuffer);
  } catch (error) {
    console.error('Error reading image file:', error);
    response.status(404).send('Image not found');
  }
}
