import { IncomingMessage, ServerResponse } from 'http';
import { getUsers } from './routes/getUsers.ts';
import { postUser } from './routes/postUser.ts';
import { getUserById } from './routes/getUserById.ts';
import { deleteUser } from './routes/deleteUser.ts';
import { putUser } from './routes/putUser.ts';

export function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const url = req.url ?? '';
  const method = req.method ?? '';

  if (method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return; 
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (url === '/api/users' && method === 'GET') {
    return getUsers(req, res);
  }
  if (url.startsWith('/api/users/') && method === 'GET') {
    const userId = url.split('/')[3];
    return getUserById(req, res, userId);
  }
  if (url === '/api/users' && method === 'POST') {
    return postUser(req, res);
  }
  if (url === '/api/users/' && method === 'PUT') {
  const userId = url.split('/')[3];
  return putUser(req, res, userId);
  }
  if (url.startsWith('/api/users/') && method === 'DELETE') {
    return deleteUser(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end('Not Found');
}
