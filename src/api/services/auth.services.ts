/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

import { checkIfUserExists, createUser, createUserVerification, deleteVerification, findVerificationByCode } from '@/utils/prisma/prisma.auth-services';
import { updateUser, checkIfUserIsVerified } from '@/utils/prisma/prisma.user-services';
import { hashPassword, comparePasswords } from '@/utils/bcrypt';
import { generateJWT } from '@/utils/jwt';
import { SignUpRequestDTO, RequestErrorDTO } from '@/utils/interfaces';


//This function is used to create a new user account. It first checks if a user with the provided email already exists. If not, it hashes the password and creates a new user. It also creates a verification entry for the new user and generates a JWT (JSON Web Token) for the user.
export const createAccount = async (req:any): Promise<SignUpRequestDTO | RequestErrorDTO> => {
  const { email, password, firstname, lastname } = req;

  const userExists = await checkIfUserExists(email);

  if (userExists) {
    return {
      error: 'User already exists',
    };
  }

  const hashedPassword = await hashPassword(password);

  const user = await createUser({
    email,
    password: hashedPassword,
    firstname,
    lastname,
  });

  if (!user) {
    return {
      error: 'User could not be created',
    };
  }

  const verification = await createUserVerification({
    userId: user.id,
    code: crypto.randomUUID(),
  });

  if (!verification) {
    return {
      error: 'Error creating verification',
    };
  }
  const token = await generateJWT(user);

  return { token, user };
};


//This function is used to sign in an existing user. It checks if the user exists and if the user is verified. If both checks pass, it compares the provided password with the stored hashed password. If the password is correct, it generates a JWT for the user.
export const signIn = async (req: any) => {
  const { email, password } = req;

  const user = await checkIfUserExists(email);

  if (!user) {
    return {
      error: 'User does not exist',
    };
  }

  if (!user.isVerified) {
    return {
      error: 'User is not verified',
    };
  }

  const isPasswordCorrect = await comparePasswords(password, user.password as string);

  if (!isPasswordCorrect) {
    return {
      error: 'Password is incorrect',
    };
  }

  const token = await generateJWT(user);

  return { token, user };
};


//This function is used to verify a user. It finds a verification entry with the provided code, checks if the user is already verified, and if not, it updates the user's verification status and deletes the verification entry.
export const verifyUser = async (req: any) => {
  const { code } = req;

  const verification = await findVerificationByCode(code);

  if (!verification) {
    return {
      error: 'Verification does not exist',
    };
  }

  const isUserVerified = await checkIfUserIsVerified(verification.userId);

  if (isUserVerified?.isVerified) {
    return {
      error: 'User is already verified',
    };
  }

  const user = await updateUser(verification.userId, {
    isVerified: true,
  });

  if (!user) {
    return {
      error: 'User could not be verified',
    };
  }

  await deleteVerification(verification.id);

  return {
    message: 'User verified successfully',
    data: {
      user,
    },
  };
};


//This function is used to get the current authenticated user's information. It extracts the JWT from the authorization header, decodes it to get the user's email, and then fetches the user's information.
export const me = async (req: NextRequest) => {
  const bearerToken = req.headers.get('authorization') as string;

  const token = bearerToken.split(' ')[1];

  const decodedToken = jwt.decode(token) as {email:string};

  const user = await checkIfUserExists(decodedToken.email, {
    id: true,
    email: true,
    firstname: true,
    lastname: true,
    isVerified: true,
    role: true,
  });

  if (!user) {
    return {
      error: 'User does not exist',
    };
  }

  return { user };
};


//This function is similar to me, but it takes a JWT as a parameter instead of extracting it from the authorization header. It decodes the JWT to get the user's email and fetches the user's information.
export const handleProfileFetch = async (token: {[key:string] : string}) => {
  const decoded = jwt.decode(token.value) as {email:string};

  const user = await checkIfUserExists(decoded.email, {
    id: true,
    email: true,
    firstname: true,
    lastname: true,
    isVerified: true,
    role: true,
  });

  if (!user) {
    return {
      error: 'User does not exist',
    };
  }

  return { user };
};
