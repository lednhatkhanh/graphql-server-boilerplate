import { makeSchema } from '@nexus/schema';
import { nexusPrisma } from 'nexus-plugin-prisma';
import { DateTimeResolver } from 'graphql-scalars';

import { prisma } from '@/libs';
import { resolveApp } from '@/utils';
import * as authModule from './auth';
import * as userModule from './user';

export const schema = makeSchema({
  types: [authModule, userModule],
  outputs: {
    typegen: resolveApp('node_modules/@types/nexus-typegen/index.d.ts'),
    schema: resolveApp('./schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: require.resolve('.prisma/client/index.d.ts'),
        alias: 'prisma',
      },
      {
        source: require.resolve('../app/context'),
        alias: 'ContextModule',
      },
    ],
    contextType: 'ContextModule.Context',
  },
  plugins: [
    nexusPrisma({
      prismaClient: () => prisma,
      experimentalCRUD: true,
      scalars: {
        DateTime: DateTimeResolver,
      },
    }),
  ],
});
