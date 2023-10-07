"use client"
import Image from 'next/image';
import React from 'react';
import {useForm} from 'react-hook-form';
import { signIn, signOut, useSession, getProviders, SessionProvider} from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const form = useForm();
  const {formState, handleSubmit, register, control} = form;
  const {errors} = formState;
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const errorMessage = session?.error?.message;


  useEffect(() => {
    const setUpProviders = async () => {
      try {
        const response = await getProviders();
        setProviders(response);
        console.log(response);
        console.log(process.env.GOOGLE_CLIENT_ID)
        console.log(session)
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };
    setUpProviders();
  }, []);
  
  return (
<main className="block min-h-screen lg:flex p-4 bg-[#202227]">
<form onSubmit={handleSubmit()} noValidate className='bg-[#202227] w-full h-full lg:w-[45%] lg:px-24 lg:pr-28'>
<Image src="./assets/logo.svg"
width={100}
height={100}
alt='logo'/>
<h1 className='mt-[70px] font-medium font-poppins text-[28px] text-white'>Welcome Back 👋</h1>
<p className='font-normal font-poppins text-[16px] text-[#8692A6] mt-[10px]'>We are happy to have you back</p>

<div className='flex flex-col items-start my-[23px] mt-[45px]'>
<label htmlFor='email' className='font-normal font-poppins text-[14px] text-[#696F79]'>Email address*</label>
<input type='text' name='email' placeholder='Enter email address' className='bg-[#282A2F] w-full h-[60px] outline-none border border-[#8692A6] focus:border-[#5871EB] pl-4 mt-3 rounded-sm text-[11px] text-[#8692A6]'
{...register('email',
{
required: {
value: true,
message: "Email is required!"
},
pattern: {
value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
message: "Please enter a valid email address."
},

validate: {
notAdmin:(fieldValue)=>{
  return (
      fieldValue !== 'admin@example.com' || 'Try a different email address.'
  );
},
notBlackListed:(fieldValue)=>{
  return (
      !fieldValue.endsWith('baddomain.com') || 'Email address not supported.'
  );
},
}
}
)}
/>
<p className='text-red-500 text-left font-normal text-[11px] mt-3'>{errors.email?.message}</p>
</div>
<div className='flex flex-col items-start my-[23px]'>
<label htmlFor='password' className='font-normal font-poppins text-[14px] text-[#696F79]'>Enter password*</label>
<input type='password' name='password' placeholder='Enter your password' className='bg-[#282A2F] w-full h-[60px] outline-none border border-[#8692A6] focus:border-[#5871EB] pl-4 mt-3 rounded-sm text-[11px] text-[#8692A6]'
{...register('password',

)}
/>
<p className='text-red-500 text-left font-normal text-[11px] mt-3'>{errorMessage && <p>{errorMessage}</p>}</p>
</div>
<div className='flex flex-row gap-4 items-center my-[23px]'>
<input type='checkbox' className='outline-none border border-[#8692A6]'/>
<p className='font-normal font-poppins text-[13px] text-[#8692A6]'>I agree to terms & conditions</p>
</div>

<button type='submit' className='bg-[#5871EB] w-full h-[60px] my-10 mb-5 rounded-sm text-white font-medium flex items-center justify-center'>Login</button>

<div className='w-full flex items-center '>
<div className='w-[50%] h-[0.5px] bg-[#F5F5F5]'></div>
<p className='text-[#BABABA] text-[12px] px-7 bg-[#202227]'>Or</p>
<div className='w-[50%] h-[0.5px] bg-[#F5F5F5]'></div>
</div>

<button 
type='button' 
className='bg-black w-full h-[60px] my-5 rounded-sm text-white font-medium flex items-center justify-center gap-7' 
onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/home' })}>
<Image src="./assets/googleicon.svg" alt='Google Logo' width={30} height={30}/> Continue with Google
</button>
</form>

<div className='hidden lg:block rounded-xl overflow-hidden w-[55%] h-full'>
<img src='./assets/signupimage.png' className='w-full h-full' alt='aesthetic image'/>
</div>
</main>
  )
}
