import RouteHandler from '@/api/route.handler';
import { handleSignUp } from '@/api/handlers/auth';

export const dynamic = 'force-dynamic'

export const { POST } = await RouteHandler({
  POST: handleSignUp,
});
