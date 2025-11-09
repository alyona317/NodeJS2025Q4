import { IncomingMessage, ServerResponse } from 'http';

export function handleRequest(req: IncomingMessage, res: ServerResponse) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Server is running' }));
}
