import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/utils/database";
import bcrypt from "bcryptjs"
import User from "@/models/User";
const handler = NextAuth(
    {
        session: {
          strategy: "jwt",
        },
        secret: "J3ASPbb+Z8zOEm7JhCXjYk26+gidMHLWggO/HtB4t1U=",
        providers: [
          GoogleProvider({
            clientId: "572161231405-cosa02ao0mvgk6p151726g07a5dvc9l6.apps.googleusercontent.com",
            clientSecret: "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",
          }),

          CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
              email: {
                label: "email",
                type: "email",
                placeholder: "email@example.com",
              },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
              await dbConnect();
              if (credentials == null) return null;
      
              try {
                const user = await User.findOne({ email: credentials.email });
      
                if (user) {
                  const isMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                  );
                  if (isMatch) {
                    return user;
                  } else {
                    throw new Error("Email or password is incorrect");
                  }
                } else {
                  throw new Error("User not found");
                }
              } catch (err) {
                throw new Error(err);
              }
            },
          }),
        ],
        pages: {
          signIn: "/login",
          newUser: "/home",
          error: "/home",
        },
        callbacks: {
          async jwt({ token, user }) {
            if (user) {
              token.user = {
                _id: user._id,
                email: user.email,
                name: user.name,s
              };
            }
            return token;
          },
          session: async ({ session, token }) => {
            if (token) {
              session.user = token.user;
            }
            return session;
          },
        },
      }
);
export { handler as GET, handler as POST };

