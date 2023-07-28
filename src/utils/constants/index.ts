export const algorithm = 'HS256';
export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
