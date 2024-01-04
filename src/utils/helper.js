import jwt from "jsonwebtoken";
import { jwt_secret } from "../../config/default";

export async function decodeToken(token) {
  const extractedToken = token.replace("Bearer ", "");
  const decoded = jwt.verify(extractedToken, jwt_secret);

  return decoded;
}
