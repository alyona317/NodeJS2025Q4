import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../data.ts';
import { validate as isUuid } from 'uuid';

export const deleteUser = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const url = req.url;
    if (!url) throw new Error('URL not provided');

    const userId = url.split('/').pop();
    if (!userId || !isUuid(userId)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Invalid userId format');
      return;
    }

    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('User not found');
      return;
    }

    users.splice(userIndex, 1);

    res.statusCode = 204;
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end((err as Error).message);
  }
};
