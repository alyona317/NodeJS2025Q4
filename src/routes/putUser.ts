import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../data.ts';
import { User } from '../types/user.ts';
import type { NewUser } from '../types/user.ts';
import { validate as isUuid } from 'uuid';

function getRequestBody(req: IncomingMessage): Promise<NewUser> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);

        if (
          typeof parsed.username !== 'string' ||
          typeof parsed.age !== 'number' ||
          !Array.isArray(parsed.hobbies) ||
          !parsed.hobbies.every((h: unknown) => typeof h === 'string')
        ) {
          reject(new Error('Invalid user data'));
          return;
        }

        resolve(parsed as NewUser);
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', (err) => reject(err));
  });
}

export const putUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string, 
) => {
  try {
    if (!isUuid(userId)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Invalid userId format');
      return;
    }

    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('User not found');
      return;
    }

    const body = await getRequestBody(req);

    const updatedUser: User = {
      id: userId,
      username: body.username,
      age: body.age,
      hobbies: body.hobbies,
    };

    users[index] = updatedUser;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(updatedUser));
  } catch (err) {
    const errorMessage = (err as Error).message;

    if (
      errorMessage === 'Invalid user data' ||
      errorMessage === 'Invalid JSON'
    ) {
      res.statusCode = 400;
    } else {
      res.statusCode = 500;
    }

    res.setHeader('Content-Type', 'text/plain');
    res.end(errorMessage);
  }
};