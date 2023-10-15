"use client"
import Image from 'next/image';
import React from 'react';
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {useForm, SubmitHandler} from 'react-hook-form';
import { signIn, signOut, useSession, getProviders, SessionProvider} from 'next-auth/react';
import { useState, useEffect } from 'react';
import GoogleButton from '@/Components/GoogleButton';

export default function Login() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {formState: { errors, isSubmitting }, handleSubmit, register, control, watch} = form;
  const watchHolder = watch();
  const [holdBtn, setHoldBtn] = useState(true);
  const {data: session} = useSession();
  const [providers, setProviders] = useState(null);
  const errorMessage = session?.error?.message;
  
  useEffect(() => {
    if (
      watchHolder.email &&
      watchHolder.password &&
      watchHolder.terms
    ) {
      setHoldBtn(false);
    } else {
      setHoldBtn(true);
    }
  }, [watchHolder]);
  

  useEffect(() => {
    const setUpProviders = async () => {
      try {
        const response = await getProviders();
        setProviders(response);
        console.log(response);
        console.log(session)
        const myVariable = process.env.GOOGLE_CLIENT_ID;

        if (myVariable && myVariable.length > 0) {
          // The environment variable exists and has a non-empty value.
          // You can use it here.
          console.error("environment variable works")
        } else {
          console.error("MY_VARIABLE is not set or is empty.");
        }
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };
    setUpProviders();
  }, []);

const params = useSearchParams();
const router = useRouter();
const [error, setError] = useState(null);

useEffect(() => {
  setError(params.get("error"));
}, [params]);

if (session) {
  router?.push("/home");
}

const formSubmit = (form) => {
  const { email, password } = form;
  signIn("credentials", {
    email,
    password,
  });
};

  
return (
<main className="block min-h-screen lg:flex p-4 bg-[#202227]">
<form onSubmit={handleSubmit(formSubmit)} noValidate className='bg-[#202227] w-full h-full lg:w-[45%] lg:px-24 lg:pr-28'>
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
<input type='checkbox' name='terms' className='outline-none border border-[#8692A6]'
{...register('terms',
{
  required:{
    value: true,
    message: "To proceed you must agree with our terms and conditions."
  }
})}
/>
<p className='font-normal font-poppins text-[13px] text-[#8692A6]'>I agree to terms & conditions</p>
</div>

<button type='submit'
      disabled={holdBtn}
      onClick={handleSubmit}
      className={`text-white w-full  ${holdBtn ? "bg-[#8497f55d] cursor-not-allowed" : "bg-[#5871EB] cursor-pointer"} ease-in-out transition-all duration-300 w-full h-[60px] my-10 mb-5 rounded-sm text-white font-medium flex items-center justify-center`}>
        Log In
 </button>

<div className='w-full flex items-center '>
<div className='w-[50%] h-[0.5px] bg-[#F5F5F5]'></div>
<p className='text-[#BABABA] text-[12px] px-7 bg-[#202227]'>Or</p>
<div className='w-[50%] h-[0.5px] bg-[#F5F5F5]'></div>
</div>

<button 
type='button' 
className='bg-black w-full h-[60px] my-5 rounded-sm text-white font-medium flex items-center justify-center gap-7' 
onClick={() => {signIn("google")}}>
<Image src="./assets/googleicon.svg" alt='Google Logo' width={30} height={30}/> Continue with Google
</button>

{isSubmitting}
</form>

<div className='hidden lg:block rounded-xl overflow-hidden w-[55%] h-full'>
<img src='./assets/signupimage.png' className='w-full h-full' alt='aesthetic image'/>
</div>
</main>
  )
}
