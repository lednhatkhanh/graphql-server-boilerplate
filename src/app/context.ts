import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { prisma } from '@/libs';
import { config } from './config';
import { extractToken } from '@/helpers';

export function context({ req }: ExpressContext) {
  const tokenPayload = extractToken(req);

  return {
    prisma,
    config,
    userId: tokenPayload?.userId,
  };
}

export type Context = ReturnType<typeof context>;
