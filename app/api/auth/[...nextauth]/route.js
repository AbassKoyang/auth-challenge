import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/utils/database";
import bcrypt from "bcryptjs"
import User from "@/models/User";

// const handler = NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   secret: "J3ASPbb+Z8zOEm7JhCXjYk26+gidMHLWggO/HtB4t1U=",
//   providers: [
//     GoogleProvider({
//       clientId: "572161231405-cosa02ao0mvgk6p151726g07a5dvc9l6.apps.googleusercontent.com",
//       clientSecret: "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",
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
//         password: { label: "Password", type: "password"},
//         username: {label: "Username", type: "text", placeholder: "AbassKoyang"}
//       },
//       async authorize(credentials, req) {
//         await dbConnect();
//         if (credentials == null) return null;

//         try {
//           const userExistsByEmail = await User.findOne({ email: credentials.email });

//           if (userExistsByEmail) {
//             const isMatch = await bcrypt.compare(
//               credentials.password,
//               userExistsByEmail.password
//             );

//             if (isMatch) {
//               return userExistsByEmail;
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
//     error: "/error",
//   },
//   callbacks: {
//     async session({ session }) {
//       // store the user id from MongoDB to session
//       const sessionUser = await User.findOne({ email: session.user.email });
//       session.user.id = sessionUser._id.toString();

//       return session;
//     },

//     async signIn({ account, profile, user, credentials }) {
//       try {
//         await dbConnect();

//         // check if user already exists
//         const googleUserExists = await User.findOne({ email: profile.email });

//         // if not, create a new document and save user in MongoDB
//         if (!googleUserExists) {
//           await User.create({
//             email: profile.email,
//             username: profile.name.replace(" ", "").replace(" ",""),
//             image: profile.picture,
//           });
//            return true
//         }
//         } catch (error) {
//           console.log("Error checking if user exists: ", error.message);
//           return false
//         }}
        
//   }
// })


const handler = NextAuth({
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
        password: { label: "Password", type: "password"},
        username: {label: "Username", type: "text", placeholder: "AbassKoyang"}
      },
      async authorize(credentials, req) {
        await dbConnect();
        if (credentials == null) return null;

        try {
          const userExistsByEmail = await User.findOne({ email: credentials.email });

          if (userExistsByEmail) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              userExistsByEmail.password
            );

            if (isMatch) {
              return userExistsByEmail;
            } else {
              throw new Error("Email or password is incorrect");
            }
          } else {
            return true
          }

        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await dbConnect();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase().replace(" ",""),
            image: profile.picture,
          });
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }

