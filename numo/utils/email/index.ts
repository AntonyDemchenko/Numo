import nodemailer from "nodemailer";

export enum EmailType {
  Verification = "verification",
  PasswordReset = "password_reset",
}
export const sendVerificationEmail = async (
  email: string,
  token: string,
  type: EmailType
) => {
  const transporter: nodemailer.Transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.MAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 0,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let subject = "";
  let emailContent = "";

  switch (type) {
    case EmailType.Verification:
      subject = "Email Verification";
      emailContent = `
        <p>Click the link below to verify your email:</p>
        <a href="${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/signup/verify?email=${email}&token=${token}">Verify Email</a>
      `;
      break;
    case EmailType.PasswordReset:
      subject = "Password Reset";
      emailContent = `
        <p>Click the link below to reset your password:</p>
        <a href="${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/newPass?email=${email}&token=${token}">Reset Password</a>
      `;
      break;
    default:
      throw new Error("Invalid email type");
  }

  const emailData = {
    from: '"Numo Auth" <verification@test.com>',
    to: email,
    subject: subject,
    html: emailContent,
  };

  try {
    await transporter.sendMail(emailData);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};
