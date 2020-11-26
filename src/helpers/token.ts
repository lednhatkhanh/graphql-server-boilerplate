import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { NexusGenRootTypes } from 'nexus-typegen';
import { DateTime } from 'luxon';

import { getClientUrl } from '@/utils';
import { config } from '@/app/config';

export type TokenPayload = { userId: string };

export const token = {
  extract,
  create,
  validate,
};

function create(payload: TokenPayload): NexusGenRootTypes['AuthResponse'] {
  const expiresIn = 60 * 60 * 24 * 7; // 7 days
  const issuedAt = DateTime.local().toMillis();
  const token = jwt.sign(payload, config.TOKEN_SECRET, {
    expiresIn,
    audience: config.FRONTEND_URL,
  });

  return { token, issuedAt, expiresIn };
}

function extract(req: Request): TokenPayload | undefined {
  const authHeader = req.headers.authorization;
  const [, token] = authHeader?.match(/^bearer\s(.+)$/i) ?? [];
  if (!token) {
    return undefined;
  }

  return validate(token, req);
}

function validate(token: string, req: Request): TokenPayload | undefined {
  try {
    const payload = jwt.verify(token, config.TOKEN_SECRET, {
      audience: getClientUrl(req),
    });
    if (typeof payload !== 'object' || !Object.prototype.hasOwnProperty.call(payload, 'userId')) {
      return undefined;
    }

    return payload as TokenPayload;
  } catch {
    return undefined;
  }
}
