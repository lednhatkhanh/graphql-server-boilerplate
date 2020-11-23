import { app, server } from './app';

export function startApp(): void {
  app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
}
