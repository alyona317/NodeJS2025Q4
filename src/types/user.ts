// Users are stored as objects that have following properties:
// id — unique identifier (string, uuid) generated on server side
// username — user's name (string, required)
// age — user's age (number, required)
// hobbies — user's hobbies (array of strings or empty array, required)
export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface NewUser {
  username: string;
  age: number;
  hobbies: string[];
}