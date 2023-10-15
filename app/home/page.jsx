"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import Navbar from "@/Components/Navbar";
import Feed from "@/Components/Feed";

const Home = () => {
  const {data: session} = useSession();
  return (
    <main className="mx-auto mt-0 max-w-7xl px-0 bg-[#202227] flex-center flex-col">
      <Navbar/>
        <h1 className="head_text text-center">
            Discover & Share
            <br className="max-w-md:hidden"/>
            <span className="orange_gradient text-center font-satoshi">Accurate Predictions</span>
        </h1>
        <p className="desc text-center font-inter">
            Logo is an open-source community for sports enthusiast to discover, create and share accurate match predictions.
        </p>
        <Feed/>
    </main>
  );
}

export default Home
