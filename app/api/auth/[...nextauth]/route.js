import React from 'react'
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@/utils/database';
import User from '@/models/User';

const handler = NextAuth({
  providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
              }
            }
      }),
  ],
  
      async session({session}){
          const sessionUser = await User.findOne({
              email: session.user.email,
          })
          session.user.id = sessionUser._id.toString();
          return session;
      },
  
      async signIn({profile}){
          try {
              await connectToDB();

              const userExists = await User.findOne({
                  email: profile.email
              })

              if(!userExists){
                  await User.create({
                    username: profile.name.replace(" ","").replace(" ",""),
                      email: profile.email,
                      image: profile.picture
                  })
              }
          } catch (error) {
              console.log("ErrorMessage", error);
              returnfalse;
          }
      }
  
});

export {handler as GET, handler as POST};
