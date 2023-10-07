import React from 'react';
import { signIn, signOut, useSession, getProviders, SessionProvider} from 'next-auth/react';
import { useState, useEffect } from 'react';

const page = () => {
  return (
    <div>
    <button type='button' onClick={() => signOut({callbackUrl: "http://localhost:3000/login"})}>Sign Out Now</button>
    </div>

  )
}

export default page
