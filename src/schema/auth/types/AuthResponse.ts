import { objectType } from '@nexus/schema';

export const AuthResponse = objectType({
  name: 'AuthResponse',
  definition(t) {
    t.string('token', { nullable: false });
    t.float('issuedAt', { nullable: false });
    t.float('expiresIn', { nullable: false });
  },
});
