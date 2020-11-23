import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { config } from '@/app/config';
import { NexusGenRootTypes } from 'nexus-typegen';

export type TokenPayload = { userId: string };

export function createToken(payload: TokenPayload): NexusGenRootTypes['AuthResponse'] {
  const expiresIn = 60 * 60 * 24 * 7; // 7 days
  const issuedAt = Date.now();
  const token = jwt.sign(payload, config.TOKEN_SECRET, {
    expiresIn,
  });

  return { token, issuedAt, expiresIn };
}

export function extractToken(req: Request): TokenPayload | undefined {
  const authHeader = req.headers.authorization;
  const [, token] = authHeader?.match(/^bearer\s(.+)$/i) ?? [];
  if (!token) {
    return undefined;
  }

  try {
    const tokenPayload = jwt.verify(token, config.TOKEN_SECRET);
    if (typeof tokenPayload !== 'object' || !Object.prototype.hasOwnProperty.call(tokenPayload, 'userId')) {
      return undefined;
    }

    return tokenPayload as TokenPayload;
  } catch {
    return undefined;
  }
}
