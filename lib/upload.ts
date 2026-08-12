import fs from "fs";
import path from "path";

const IMAGES_DIR = path.join(
  process.cwd(),
  "public",
  "imagens"
);

export function saveImage(
  fileName: string,
  buffer: Buffer
): string {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const filePath = path.join(IMAGES_DIR, fileName);

  fs.writeFileSync(filePath, buffer);

  return `/imagens/${fileName}`;
}