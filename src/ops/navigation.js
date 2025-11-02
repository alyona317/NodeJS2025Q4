import { readdir } from "fs/promises";
import { statSync } from "fs";
import path from "path";
import { cwd, chdir } from "process";

let currentDir = cwd();


export function showCurrentDirectory() {
  currentDir = cwd();
  console.log(`You are currently in: ${currentDir}`);
}

export function getCurrentDirectory() {
  currentDir = cwd();
  return currentDir;
}

export async function goUp() {
  const current = cwd();
  const parent = path.dirname(current);

  if (parent !== current) {
    try {
      chdir(parent);
      currentDir = parent;
    } catch (err) {
      throw new Error("Operation failed");
    }
  }
}

export async function changeDir(targetPath) {
  try {
    const current = process.cwd();
    const newPath = path.resolve(currentDir, targetPath);
    chdir(newPath);
    currentDir = newPath;
  } catch (err) {
    throw new Error("Operation failed");
  }
}

export async function listDirectory() {
  try {
    const current = cwd();
    const items = await readdir(current);
    const itemsWithStats = [];

    for (const item of items) {
      const itemPath = path.join(currentDir, item);
      const stats = statSync(itemPath);
      itemsWithStats.push({
        name: item,
        isDirectory: stats.isDirectory(),
        type: stats.isDirectory() ? "directory" : "file",
      });
    }
    itemsWithStats.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });
    console.table(
      itemsWithStats.map((item) => ({
        Name: item.name,
        Type: item.type,
      }))
    );
  } catch (err) {
    throw new Error("Operation failed");
  }
}
