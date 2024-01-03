import * as joi from "joi";

export const userValidations = {
  createUserValidator: {
    body: joi.object({
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      username: joi.string().required(),
    }),
  },
};
