import { config } from 'dotenv';
import { createServer } from 'http';
import { handleRequest } from './server.ts';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
