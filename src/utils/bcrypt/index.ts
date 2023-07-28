import bcrypt from 'bcrypt';


//This function takes a plain text password as an argument. It generates a salt using bcrypt.genSalt(10), which creates a random string to mix with the password for hashing. The number 10 is the number of rounds to use, the higher the rounds the more secure but slower the function. Then, it hashes the password with the generated salt using bcrypt.hash(password, salt). The hashed password is then returned.
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};


//This function takes a plain text password and a hashed password as arguments. It uses bcrypt.compare(password, hashedPassword) to check if the plain text password, when hashed with the same salt as the hashed password, would result in the same hashed password. It returns a boolean indicating whether the passwords match.
export const comparePasswords = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);

  return isMatch;
};
