import bcrypt from "bcryptjs";

const hashPassword = (password) => {
  if (password.length < 8) {
    throw new Error("Password length is less than 8");
  }

  return bcrypt.hash(password, 10);
};

export { hashPassword as default };
