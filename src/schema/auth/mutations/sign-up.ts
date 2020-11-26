import { mutationField, nonNull, stringArg } from '@nexus/schema';
import { ForbiddenError } from 'apollo-server-express';
import bcrypt from 'bcrypt';

import { token } from '@/helpers';

export const signUp = mutationField('signUp', {
  type: 'AuthResponse',
  nullable: false,
  args: {
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
    name: nonNull(stringArg()),
  },
  async resolve(_, { email, password, name }, { prisma }) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ForbiddenError('User with the same email exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    return token.create({ userId: newUser.id });
  },
});
