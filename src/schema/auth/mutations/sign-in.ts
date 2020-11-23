import { mutationField, stringArg } from '@nexus/schema';
import { ForbiddenError } from 'apollo-server-express';
import bcrypt from 'bcrypt';

import { createToken } from '@/helpers';

export const signIn = mutationField('signIn', {
  type: 'AuthResponse',
  nullable: false,
  args: { email: stringArg({ nullable: false }), password: stringArg({ nullable: false }) },
  async resolve(_, { email, password }, { prisma }) {
    const user = await prisma.user.findOne({ where: { email } });
    if (!user) {
      throw new ForbiddenError('Wrong email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenError('Wrong email or password.');
    }

    return createToken({ userId: user.id });
  },
});
