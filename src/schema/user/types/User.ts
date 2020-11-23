import { objectType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.email();
    t.model.name();
    t.model.bio();
    t.model.id();
    t.model.imageUrl();
  },
});
