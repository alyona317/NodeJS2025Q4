import {
  readFile as fsReadFile,
  mkdir,
  rename as fsRename, writeFile,
} from "fs/promises";
import path from 'path';
import { getCurrentDirectory } from './navigation.js';

export async function readFile(fileName) {
  try {
    const filePath = path.resolve(getCurrentDirectory(), fileName);
    const content = await fsReadFile(filePath, 'utf-8');
    console.log(content);
  } catch (err) {
    throw new Error('Operation failed');
  }
}

export async function createFile(fileName) {
  try {
    const fullPath = path.join(getCurrentDirectory(), fileName);
    await writeFile(fullPath, "");
  } catch (error) {
    throw new Error("Operation failed");
  }
}

export async function createDirectory(dirname){
  try {
    const fullPath = path.join(getCurrentDirectory(), dirname);
    await mkdir(fullPath);
  } catch (err){
    throw new Error('Operation failed');
  }
}

export async function renameFile(oldName, newName){
  try {
    const oldPath = path.join(getCurrentDirectory(), oldName);
    const newPath = path.join(getCurrentDirectory(), newName);
    await fsRename (oldPath, newPath);
  } catch (err){
    throw new Error('Operation failed');
  }
}