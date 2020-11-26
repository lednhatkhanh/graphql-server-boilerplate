import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { prisma } from '@/libs';
import { config } from './config';
import { token } from '@/helpers';

export function context({ req }: ExpressContext) {
  const tokenPayload = token.extract(req);

  return {
    prisma,
    config,
    userId: tokenPayload?.userId,
  };
}

export type Context = ReturnType<typeof context>;
