import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import path from "path";
import { getCurrentDirectory } from "./navigation.js";

export async function copyFile(sourcePath, destPath) {
  try {
    const fullSourcePath = path.resolve(getCurrentDirectory(), sourcePath);
    const fullDestPath = path.resolve(getCurrentDirectory(), destPath);

    const readStream = createReadStream(fullSourcePath);
    const writeStream = createWriteStream(fullDestPath);

    await pipeline(readStream, writeStream);
  } catch (error) {
    throw new Error("Operation failed");
  }
}



