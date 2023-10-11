// import User from "@/models/User";
// import { dbConnect } from "@/utils/database";
// import bcrypt from "bcryptjs"
// import { NextResponse, NextRequest } from "next/server";

// const POST = async (request) => {
//   const { username, email, password } = await request.json();

//   await dbConnect();

//   const hashedPassword = await bcrypt.hash(password, 5);

//   const newUser = new User({
//     username,
//     email,
//     password: hashedPassword,
//   });

//   try {
//     await newUser.save();
//     return new NextResponse("User has been created", {
//       status: 201,
//     });
//   } catch (err) {
//     return new NextResponse(err.message, {
//       status: 500,
//     });
//   }
// };

// module.exports = POST;
