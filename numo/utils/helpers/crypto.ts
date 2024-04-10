import { randomBytes } from "crypto";

export const generateEmailVerificationToken = () => {
  return randomBytes(32).toString("hex");
};
