import { goUp, changeDir, listDirectory} from "./ops/navigation.js";
import {
  readFile,
  createDirectory,
  createFile,
  renameFile,
  deleteFile,
  moveFile
} from "./ops/fsOps.js";
import { copyFile} from "./ops/streams.js";
import { calculateHash } from "./ops/hashing.js";


export async function handleCommand (input){
const [command, ...args] = input.split(" ");
try {
  switch (command) {
    case "up":
      await goUp();
      break;

    case "cd":
      if (!args[0]) throw new Error("Invalid input");
      await changeDir(args[0]);
      break;

    case "ls":
      await listDirectory();
      break;

    case "cat":
      if (!args[0]) throw new Error("Invalid input");
      await readFile(args[0]);
      break;

    case "add":
      if (!args[0]) throw new Error("Invalid input");
      await createFile(args[0]);
      break;

    case "rn":
      if (args.length < 2) throw new Error("Invalid input");
      await renameFile(args[0], args[1]);
      break;

    case "cp":
      if (args.length < 2) throw new Error("Invalid input");
      await copyFile(args[0], args[1]);
      break;

    case "mv":
      if (args.length < 2) throw new Error("Invalid input");
      await moveFile(args[0], args[1]);
      break;

    case "rm":
      if (!args[0]) throw new Error("Invalid input");
      await deleteFile(args[0]);
      break;

    case "hash":
      if (!args[0]) throw new Error("Invalid input");
      await calculateHash(args[0]);
      break;

    case "mkdir":
      if (!args[0]) throw new Error("Invalid input");
      await createDirectory(args[0]);
      break;

    default:
      console.log("Invalid input");
  }
} catch (error) {
  if (
    error.message === "Invalid input" ||
    error.message === "Operation failed"
  ) {
    console.log(error.message);
  } else {
    console.log("Operation failed");
  }
}
}