import { createReadStream } from "fs";
import { createHash } from "crypto";
import path from "path";
import { getCurrentDirectory } from "./navigation.js";


export async function calculateHash(filePath) {
  try {
    const fullPath = path.resolve(getCurrentDirectory(), filePath);
    const hash = createHash("sha256");
    const stream = createReadStream(fullPath);

    return new Promise((resolve, reject) => {
      stream.on("data", (chunk) => hash.update(chunk));
      stream.on("end", () => {
        const result = hash.digest("hex");
        console.log(result);
        resolve(result);
      });
      stream.on("error", reject);
    });
  } catch (error) {
    throw new Error("Operation failed");
  }
}
