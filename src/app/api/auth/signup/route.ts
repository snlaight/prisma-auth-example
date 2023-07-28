import RouteHandler from '@/api/route.handler';
import { handleSignUp } from '@/api/handlers/auth';

export const { POST } = await RouteHandler({
  POST: handleSignUp,
});
