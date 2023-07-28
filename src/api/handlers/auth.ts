import { NextRequest, NextResponse } from 'next/server';

import { AuthValidationRules, SignInValidationRules } from '@/utils/validations/auth.validations';
import { validateRequestBody } from '@/utils/api/validate-request';
import { createAccount, signIn, me, verifyUser } from '@/api/services/auth.services';

//This function handles user registration. It first validates the request body using AuthValidationRules. If there are validation errors, it returns a response with status 422 and the errors. If the validation passes, it attempts to create a new user account. If the account creation is successful, it sets a JWT (JSON Web Token) in the response cookies and returns a success message. If there's an error during account creation, it returns a response with status 400 and the error message.
export const handleSignUp = async (req: NextRequest) => {
  const request = await req.json();

  const validationErrors = validateRequestBody(request, AuthValidationRules);

  if (Object.keys(validationErrors).length > 0) {
    return NextResponse.json({ errors: validationErrors }, { status: 422 });
  }

  const handler = await createAccount(request);

  if ('error' in handler) {
    return NextResponse.json({ error: handler.error }, { status: 400 });
  }
  const response = NextResponse.json({
    message: 'User created successfully',
    data: {
      user: handler.user,
    },
    status: 200,
  });

  response.cookies.set('jwt', handler.token, { maxAge: 30 * 24 * 60 * 60 });

  return response;
};


//This function handles user login. It validates the request body using SignInValidationRules. If there are validation errors, it returns a response with status 422 and the errors. If the validation passes, it attempts to sign in the user. If the sign-in is successful, it sets a JWT in the response cookies and returns a success message. If there's an error during sign-in, it returns a response with status 400 and the error message.
export const handleSignIn = async (req: NextRequest) => {
  const request = await req.json();
  const validationErrors = validateRequestBody(request, SignInValidationRules);

  if (Object.keys(validationErrors).length > 0) {
    return NextResponse.json({ errors: validationErrors }, { status: 422 });
  }
  const handler = await signIn(request);

  if ('error' in handler) {
    return NextResponse.json({ error: handler.error }, { status: 400 });
  }

  const response = NextResponse.json({
    message: 'User signed in successfully',
    data: {
      user: handler.user,
    },
    status: 200,
  });

  response.cookies.set('jwt', handler.token, { maxAge: 30 * 24 * 60 * 60 });

  return response;
};


//This function handles requests to fetch the currently authenticated user's data. It calls the me function with the request as an argument. If there's an error, it returns a response with status 400 and the error message. If the request is successful, it returns the user's data.
export const handleMe = async (req: NextRequest) => {
  const handler = await me(req);
  if ('error' in handler) {
    return NextResponse.json({ error: handler.error }, { status: 400 });
  }

  return NextResponse.json({
    message: 'User fetched successfully',
    data: {
      user: handler.user,
    },
    status: 200,
  });
};


//This function handles user verification. It extracts a verification code from the request URL. If there's no code, it returns a response with status 400 and an error message. If there is a code, it attempts to verify the user. If the verification is successful, it returns a success message and the user's data. If there's an error during verification, it returns a response with status 400 and the error message.
export const handleUserVerification = async (req: NextRequest) => {
  const code = req.nextUrl.pathname.split('/')[4];

  if (!code) return NextResponse.json({ error: 'Verification code is required' }, { status: 400 });

  const handler = await verifyUser({ code });

  if ('error' in handler) {
    return NextResponse.json({ error: handler.error }, { status: 400 });
  }

  return NextResponse.json({
    message: 'User verified successfully',
    data: {
      user: handler.data.user,
    },
    status: 200,
  });
};
