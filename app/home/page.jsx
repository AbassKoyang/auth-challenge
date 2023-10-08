"use client"
import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login/?callbackUrl=/home");
  }
  return (
    <main className="mx-auto mt-4 max-w-5xl px-6">
      <h2>
        {session !== null && (
          <p className="text-4xl font-semibold">Hi {session?.user?.name}!</p>
        )}
      </h2>
      <button type='button' onClick={() => signOut({callbackUrl: "http://localhost:3000/login"})}>Sign Out Now</button>
    </main>
  );
}
