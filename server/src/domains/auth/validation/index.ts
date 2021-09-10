import { Schema } from "express-validator";

const MIN_PASSWORD_LENGTH = 5;
const MAX_PASSWORD_LENGTH = 25;

export const registrationSchema: Schema = {
  first_name: {
    notEmpty: true,
    errorMessage: "first_name is required!",
  },
  password: {
    isLength: {
      errorMessage: `Пароль должен быть от ${MIN_PASSWORD_LENGTH} до${MAX_PASSWORD_LENGTH}`,
      options: { min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH },
    },
    customSanitizer: {
      options: (value) => value.toString(),
    },
  },
  email: {
    isEmail: true,
    errorMessage: "email is invalid",
  },
};

export const loginSchema: Schema = {
  password: {
    isLength: {
      errorMessage: `Пароль должен быть от ${MIN_PASSWORD_LENGTH} до${MAX_PASSWORD_LENGTH}`,
      options: { min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH },
    },
    customSanitizer: {
      options: (value) => value.toString(),
    },
  },
  email: {
    isEmail: true,
    errorMessage: "email is invalid",
  },
};
