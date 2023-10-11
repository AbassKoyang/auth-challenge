"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const {data: session} = useSession();
  if (!session) {
    redirect("/login");
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
