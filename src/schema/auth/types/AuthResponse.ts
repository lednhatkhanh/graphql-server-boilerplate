import { objectType } from '@nexus/schema';

export const AuthResponse = objectType({
  name: 'AuthResponse',
  definition(t) {
    t.nonNull.string('token');
    t.nonNull.float('issuedAt');
    t.nonNull.float('expiresIn');
  },
});
