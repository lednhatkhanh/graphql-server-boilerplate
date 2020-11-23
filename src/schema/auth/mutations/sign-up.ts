import { mutationField, stringArg } from '@nexus/schema';
import { ForbiddenError } from 'apollo-server-express';
import bcrypt from 'bcrypt';

import { createToken } from '@/helpers';

export const signUp = mutationField('signUp', {
  type: 'AuthResponse',
  nullable: false,
  args: {
    email: stringArg({ nullable: false }),
    password: stringArg({ nullable: false }),
    name: stringArg({ nullable: false }),
  },
  async resolve(_, { email, password, name }, { prisma }) {
    const existingUser = await prisma.user.findOne({ where: { email } });
    if (existingUser) {
      throw new ForbiddenError('User with the same email exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    return createToken({ userId: newUser.id });
  },
});
