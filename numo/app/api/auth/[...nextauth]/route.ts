import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(process.env.BACKEND_URL + "/api/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "smth",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;

        const { username, password } = credentials;

        const res = await fetch(process.env.BACKEND_URL + "/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 401) {
          return null;
        }
        const user = await res.json();

        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: any;
      account: any;
      profile?: any;
    }) {
      if (account?.provider === "google") {
        const userData = {
          name: profile.name,
          email: profile.email,
          picture: profile.picture,
          providerAccountId: account.providerAccountId,
        };

        try {
          const res = await fetch(
            process.env.BACKEND_URL + "/api/auth/googleLogIn",
            {
              method: "POST",
              body: JSON.stringify(userData),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const user = await res.json();

          return user;
        } catch (err) {
          return true;
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (account && account?.provider === "google") {
        const bodyData = {
          email: token.email,
          name: token.name,
          providerAccountId: account.providerAccountId,
        };

        try {
          const res = await fetch(
            process.env.BACKEND_URL + "/api/auth/tokens",
            {
              method: "POST",
              body: JSON.stringify(bodyData),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const newUser = await res.json();

          return { ...newUser };
        } catch (err) {
          return token;
        }
      }

      if (user) {
        return { ...token, ...user };
      }
      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      return await refreshToken(token);

      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
