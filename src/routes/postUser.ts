import { users } from '../data.ts';
import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../types/user.ts';
import type { NewUser } from '../types/user.ts';
import { v4 as uuidv4 } from 'uuid';

export function getRequestBody(req: IncomingMessage): Promise<NewUser> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        if (
          typeof parsed.username !== 'string' ||
          typeof parsed.age !== 'number' ||
          !Array.isArray(parsed.hobbies) ||
          !parsed.hobbies.every((hobby: any) => typeof hobby === 'string')
        ) {
          reject(new Error('Invalid user data'));
          return;
        }
        resolve(parsed as NewUser);
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', (err) => reject(err));
  });
}

export async function postUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getRequestBody(req);

    const newUser: User = {
      id: uuidv4(),
      username: body.username,
      age: body.age,
      hobbies: body.hobbies,
    };

    users.push(newUser);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: (err as Error).message }));
  }
}