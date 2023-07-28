import { NextResponse } from 'next/server';
import * as jose from 'jose';

import { algorithm, JWT_SECRET } from '@/utils/constants';


//This function takes a payload (an object of type Record<string, unknown>) and generates a JWT. It uses the SignJWT class from the jose library to create a new JWT with the provided payload. The setProtectedHeader method sets the algorithm used for signing the JWT, and setExpirationTime sets the token's expiration time to 720 hours. The sign method then signs the JWT using the secret key JWT_SECRET imported from the constants file.
export const generateJWT = async (payload: Record<string, unknown>) => {
  const token = await new jose.SignJWT(payload).setProtectedHeader({ alg: algorithm }).setExpirationTime('720h').sign(JWT_SECRET);

  return token;
};

//This function takes a JWT as a string and attempts to decode it. It first encodes the secret key from the environment variable JWT_SECRET using TextEncoder. Then, it uses the jwtVerify method from the jose library to verify and decode the JWT. If the verification is successful, it returns the decoded JWT. If it fails (for example, if the token is expired or the signature is invalid), it catches the error and returns a NextResponse with a status of 401 (Unauthorized) and a JSON string containing an error message.
export const decodeJWT = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET?.toString());
  try {
    const decoded = await jose.jwtVerify(token, secret);
    return decoded;
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: 'Unauthorized request.', error: err }),
      { status: 401 },
    );
  }
};
