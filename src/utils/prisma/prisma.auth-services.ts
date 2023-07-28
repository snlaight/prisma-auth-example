/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/utils/prisma/client';

import { comparePasswords } from '@/utils/bcrypt';
import { SelectItems } from '@/utils/interfaces';

const selectItems = {
  id: true,
  email: true,
  firstname: true,
  lastname: true,
  password: true,
  isVerified: true,
  role: true,
};


//This function checks if a user with a given email exists in the database. The select parameter is optional and allows you to specify which fields you want to retrieve from the user record.
export const checkIfUserExists = async (email:string, select?: Partial<SelectItems>) => {
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
    select: select || selectItems,
  });

  return userExists;
};


//This function creates a new user in the database with the provided data.
export const createUser = async (data: any) => {
  const user = await prisma.user.create({
    data,
  });
  return user;
};


//This function retrieves a user with a given email from the database and checks if the provided password matches the user's password. It uses the comparePasswords function from the bcrypt utility to compare the passwords.
export const checkUserWithPassword = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) return false;

  const isPasswordCorrect = await comparePasswords(password, user.password);

  if (!isPasswordCorrect) return false;

  return user;
};


//This function creates a new verification record in the database with the provided data.
export const createUserVerification = async (data: any) => {
  const verification = await prisma.verification.create({
    data,
  });

  return verification;
};


//This function retrieves a verification record with a given code from the database.
export const findVerificationByCode = async (code: string) => {
  const verification = await prisma.verification.findUnique({
    where: {
      code,
    },
  });

  return verification;
};


//This function deletes a verification record with a given id from the database.
export const deleteVerification = async (id: number) => {
  const verification = await prisma.verification.delete({
    where: {
      id,
    },
  });

  return verification;
};
