import { users } from "../data.ts";
import { IncomingMessage, ServerResponse } from "http";

export function getUser(req: IncomingMessage, res: ServerResponse) {
  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify(users));
  return [];
}
