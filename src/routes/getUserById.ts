import { users } from '../data.ts';
import { IncomingMessage, ServerResponse } from 'http';
import { validate as isUuid } from 'uuid';

export function getUserById(req: IncomingMessage, res: ServerResponse, userId: string) {
  if (!isUuid(userId)) {
    res.statusCode = 400;
    res.end('Invalid userId format');
    return;
  }
  const user = users.find((u) => u.id === userId);
  if (!user) {
    res.statusCode = 404;
    res.end('User not found');
    return;
  }
  res.statusCode = 200;
  res.end(JSON.stringify(user));
}
