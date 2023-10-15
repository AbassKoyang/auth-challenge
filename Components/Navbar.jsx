"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders, SessionProvider} from 'next-auth/react';
import Link from "next/link";

const Navbar = () => {
    const {data: session} = useSession();
    const [toggleDropdown, setToggleDropDown] = useState(false);


  return (

    <nav className={`flex-between w-full max-w-7xl mb-10 py-4 bg-[#202227] px-0`}>
    <Link href="/" className="flex gap-2 flex-center">
        <Image src="./assets/logo.svg" 
        alt="Promptopia logo"
        width={90}
        height={90}
        className="object-contain"
        />
    </Link>

    {/* Desktop Navigation */}
    <div className="sm:flex hidden">
            <div className="flex gap-3 md:gap-5">
                <Link href="/create-post" className="black_btn font-inter">
                    Create Post
                </Link>
                <button type="button" className="outline_btn font-inter" onClick={() => signOut({callbackUrl: "/login"})}>
                    Sign Out
                </button>
                <Link href="/profile">
                    <Image 
                    src={session?.user.image} 
                    width={37}
                    height={37}
                    className="rounded-full"
                    alt="Profile"
                    />
                </Link>
            </div>
    </div>


    {/* Mobile Navigation */}
    <div className="sm:hidden flex relative">
            <div className="flex">
                <Image src={session?.user.image} 
                    alt="profile"
                    width={37}
                    height={37}
                    className="rounded-full"
                    onClick={()=>setToggleDropDown((prev)=> !prev)}
                />
                {toggleDropdown && (
                    <div className="dropdown">
                        <Link
                        href="/profile"
                        className="dropdown_link font-inter"
                        onClick={()=> setToggleDropDown(false)}
                        >
                            My Profile
                        </Link>
                        <Link
                        href="/create-prompt"
                        className="dropdown_link font-inter"
                        onClick={()=> setToggleDropDown(false)}
                        >
                            Create Prompt
                        </Link>
                        <button 
                        className="mt-5 w-full black_btn font-inter"
                        type="button"
                        onClick={()=>{
                        setToggleDropDown(false);
                        signOut({callbackUrl: "/login"});
                        }}
                        >
                            Sign Out
                        </button>
                    </div>
                    )}
            </div>
    </div>
</nav>
  )
};

export default Navbar