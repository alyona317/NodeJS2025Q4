import readline from "readline";
// import handleCommand from "./commands.js";

let username = '';

export function setUsername(name){
  username= name;
}
export function getUsername() {
  return username;
}

function welcomeUser(){
  console.log(`Welcome to the File Manager, ${username}!`);
}
function displayGoodbye(){
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
}

function initFileManager(){
  const rl = readline.createInterface({ 
    input: process.stdin, 
    output: process.stdout, 
    prompt: ">" });

  rl.on('line', async(line) => {
    const command = line.trim();

    if (command === '.exit' ){
      displayGoodbye();
      rl.close();
    }
    // await handleCommand(command){
    //   showCurrentDirectory();
    //   rl.prompt();
    // }
  });
  rl.on('close', () => {
    displayGoodbye()
    process.exit(0);
  });
  welcomeUser();
  rl.prompt();
}

const arg = process.argv.slice(2);
const usernameArg =arg.find(arg => arg.startsWith('--username='))

if (!usernameArg){
  console.log('Username not provided. Using "Anonymous" as default.');
  setUsername('Anonymous');
} else {
  setUsername(usernameArg.split("=")[1]);
}

initFileManager();