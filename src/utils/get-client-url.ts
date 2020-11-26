import { Request } from 'express';

export function getClientUrl(req: Request): string {
  return `${req.protocol}://${req.hostname}`;
}
