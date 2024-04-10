export const register = async (userData: {
  name: string;
  email: string;
  password: string;
  emailVerificationToken: string;
}) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/signin",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.json();
  } catch (err) {
    throw new Error("ERROR sign up failed ");
  }
};

export const resetVerificationToken = async (userData: {
  name: string;
  email: string;
  password: string;
  emailVerificationToken: string;
}) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/resetToken",
      {
        method: "PATCH",
        body: JSON.stringify({
          email: userData.email,
          emailVerificationToken: userData.emailVerificationToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.json();
  } catch (err) {
    throw new Error("ERROR sign up failed ");
  }
};

export const verifyUser = async (userData: {
  email: string;
  emailVerificationToken: string;
}) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/verifyUser",
      {
        method: "PATCH",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.json();
  } catch (err) {
    throw new Error("ERROR sign up failed ");
  }
};

export const resetPassword = async (userData: {
  email: string;
  password: string;
  emailVerificationToken: string;
}) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/resetPassword",
      {
        method: "PATCH",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.json();
  } catch (err) {
    throw new Error("ERROR sign up failed ");
  }
};
