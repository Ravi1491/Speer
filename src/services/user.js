import { decode, sign } from "jsonwebtoken";

import model from "../../models";
import { expires_in, issuer, jwt_secret } from "../../config/default";

const userModel = model.user;

export const findOneUser = async (payload) => {
  const user = await userModel.findOne({
    where: payload,
  });

  return user;
};

export const createUser = async (payload) => {
  return userModel.create({ ...payload });
};

export const generateToken = async ({ id, email }) => {
  const token = sign(
    {
      id,
      email,
    },
    jwt_secret,
    {
      expiresIn: expires_in,
      algorithm: "HS256",
      issuer: issuer,
    }
  );

  const decodedToken = decode(token);

  return {
    token,
    expiresIn: decodedToken.exp - decodedToken.iat,
  };
};
