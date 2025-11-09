import { IncomingMessage, ServerResponse } from 'http';
import { getUser } from './routes/getUser.ts';
import { postUser } from './routes/postUser.ts';

export function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const { url, method } = req;

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
    return getUser(req, res);
  }
  if (url === '/api/users' && method === 'POST') {
    return postUser(req, res);
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end('Not Found');
}
