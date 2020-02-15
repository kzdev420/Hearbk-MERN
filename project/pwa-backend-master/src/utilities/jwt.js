import jwt from "jsonwebtoken";
import { UnauthorisedRequestError } from "./errorHandlers";

export const generateAccessToken = async (userData) => {
  const token = await jwt.sign(userData, process.env.SECRET, { expiresIn: "1h" });
  return token;
};

export const validateToken = async (token) => {
  try {
    return await jwt.verify(token, process.env.SECRET);
  } catch(e) {
    throw new UnauthorisedRequestError();
  }
};
