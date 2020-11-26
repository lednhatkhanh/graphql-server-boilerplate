import { mutationField, nonNull, stringArg } from '@nexus/schema';
import { ForbiddenError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import {} from '@nexus/schema';

import { token } from '@/helpers';

export const signIn = mutationField('signIn', {
  type: 'AuthResponse',
  nullable: false,
  args: { email: nonNull(stringArg()), password: nonNull(stringArg()) },
  async resolve(_, { email, password }, { prisma }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ForbiddenError('Wrong email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenError('Wrong email or password.');
    }

    return token.create({ userId: user.id });
  },
});
