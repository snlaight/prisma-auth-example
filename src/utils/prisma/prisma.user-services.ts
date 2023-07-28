import { prisma } from '@/utils/prisma/client';
import { User } from '@/utils/interfaces';


//This function updates a user in the database. It takes two parameters: id (the ID of the user to update) and data (an object containing the fields to update). It uses Prisma's update method, which updates a record in the database where the id matches the provided id, and updates the fields specified in data. The function then returns the updated user.
export const updateUser = async (id: number, data: Partial<User>) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  return user;
};


//This function checks if a user is verified. It takes one parameter: id (the ID of the user to check). It uses Prisma's findUnique method, which finds a unique record in the database where the id matches the provided id. It then selects the isVerified field of the user. The function returns the user with only the isVerified field.
export const checkIfUserIsVerified = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      isVerified: true,
    },
  });

  return user;
};
