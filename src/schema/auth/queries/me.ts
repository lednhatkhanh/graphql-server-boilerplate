import { queryField } from '@nexus/schema';
import { AuthenticationError } from 'apollo-server-express';

export const me = queryField('me', {
  type: 'User',
  nullable: false,
  async resolve(_, _1, { prisma, userId }) {
    if (!userId) {
      throw new AuthenticationError('Unauthorized');
    }

    try {
      const user = await prisma.user.findOne({ where: { id: userId } });
      if (!user) {
        throw new AuthenticationError('Unauthorized');
      }

      return user;
    } catch (error) {
      console.log(error);
      throw new AuthenticationError('Unauthorized');
    }
  },
});
