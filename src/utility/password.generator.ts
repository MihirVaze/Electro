import bcrypt from "bcryptjs";
import { v4 } from "uuid";

export const generatePassword = () => v4().slice(0, 8);

export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword
  } catch (e) {
    throw "PASSWORD COULDNOT BE HASHED"
  }
}

export const compareEncription = (hashed: string, password: string) => bcrypt.compare(password, hashed)