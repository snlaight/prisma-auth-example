import RouteHandler from '@/api/route.handler';
import { handleMe } from '@/api/handlers/auth';

export const dynamic = 'force-dynamic'

export const { GET, POST } = await RouteHandler({
  GET: handleMe,
});
