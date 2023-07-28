import RouteHandler from '@/api/route.handler';
import { handleUserVerification } from '@/api/handlers/auth';

export const { GET } = await RouteHandler({
  GET: handleUserVerification,
});
