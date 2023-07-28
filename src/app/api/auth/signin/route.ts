import RouteHandler from '@/api/route.handler';
import { handleSignIn } from '@/api/handlers/auth';

export const { POST } = await RouteHandler({
  POST: handleSignIn,
});
