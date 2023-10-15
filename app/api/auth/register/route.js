import User from "@/models/User";
import { dbConnect } from "@/utils/database";
import bcrypt from "bcryptjs"
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request) => {
  const { username, email, password } = await request.json();


  try {
    await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
    await newUser.save();
    console.log("UserObject", newUser);
    return new Response("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new Response(err.message, {
      status: 500,
    });
  }
};