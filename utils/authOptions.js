// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "./database";
// import bcrypt from "bcryptjs"
// import User  from "../models/User";

// const authOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   secret: "J3ASPbb+Z8zOEm7JhCXjYk26+gidMHLWggO/HtB4t1U=",
//   providers: [
//     GoogleProvider({
//       clientId: "572161231405-1q87s6de5o6j89ftp8ec140khjm2jfc2.apps.googleusercontent.com",
//       clientSecret: "GOCSPX-KMvQgVtXYyZ3kUD8BFEv7pfz-aT",
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       id: "credentials",
//       credentials: {
//         email: {
//           label: "email",
//           type: "email",
//           placeholder: "email@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         await dbConnect();
//         if (credentials == null) return null;

//         try {
//           const user = await User.findOne({ email: credentials.email });

//           if (user) {
//             const isMatch = await bcrypt.compare(
//               credentials.password,
//               user.password
//             );
//             if (isMatch) {
//               return user;
//             } else {
//               throw new Error("Email or password is incorrect");
//             }
//           } else {
//             throw new Error("User not found");
//           }
//         } catch (err) {
//           throw new Error(err);
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//     newUser: "/home",
//     error: "/login",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = {
//           _id: user._id,
//           email: user.email,
//           name: user.name,s
//         };
//       }
//       return token;
//     },
//     session: async ({ session, token }) => {
//       if (token) {
//         session.user = token.user;
//       }
//       return session;
//     },
//   },
// };

// module.exports = NextAuth(authOptions);