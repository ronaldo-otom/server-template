import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../constants.js";

export const generateAccessToken = async (str) => {
  const token = await jwt.sign({ session: str }, TOKEN_SECRET, {
    expiresIn: "30m",
  });
  return token;
};

export const generateRefreshToken = async (str) => {
  const token = await jwt.sign({ session: str }, TOKEN_SECRET);
  return token;
};

export const generateTokens = async (str) => {
  const access_token = await generateAccessToken(str);
  const refresh_token = await generateRefreshToken(str);
  return { access_token, refresh_token };
};
