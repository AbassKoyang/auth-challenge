"use client"
import Image from 'next/image';
import React from 'react';
import { useEffect, useState } from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import { signIn, signOut, useSession, getProviders, SessionProvider} from 'next-auth/react';
import Link from "next/link";
import GoogleButton from '@/Components/GoogleButton';


export default function Home() {
  const form = useForm({defaultValues: {
    email: "",
    username: "",
    password: "",
  }},);

  const {formState: { errors, isSubmitting }, handleSubmit, register, control, watch} = form;
  const watchHolder = watch();
  const [holdBtn, setHoldBtn] = useState(true);
  const {data: session} = useSession();
  const [providers, setProviders] = useState(null);
  const errorMessage = session?.error?.message;
  
  useEffect(() => {
    if (
      watchHolder.username &&
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
        console.log(process.env.GOOGLE_CLIENT_ID)
        console.log(session)
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };
    setUpProviders();
  }, []);


  const [message, setMessage] = useState(null);

  const formSubmit = async (form) => {
    const { username, email, password } = form;

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      if (res.status === 201) {
        router.push("/login?success=Account has been created");
      }
    } catch (err) {
      setMessage(err);
    }
  };


  return (
    <main className="block min-h-screen lg:flex p-4 bg-[#202227]">
      <form onSubmit={handleSubmit(formSubmit)} className='bg-[#202227] w-full h-full lg:w-[45%] lg:px-24 lg:pr-28'>
      <Image src="./assets/logo.svg"
      width={100}
      height={100}
      alt='Logo'/>
      <h1 className='mt-[70px] font-medium font-poppins text-[28px] text-white'>Create an account 👋</h1>
      <p className='font-normal font-poppins text-[16px] text-[#8692A6] mt-[10px]'>Kindly fill in your details to create an account</p>


      <div className='flex flex-col items-start mt-[45px]'>
        <label htmlFor='username' className='font-normal font-poppins text-[14px] text-[#696F79]'>Your fullname*</label>
        <input type='text' name='username' placeholder='Enter your name' className='bg-[#282A2F] w-full h-[60px] outline-none border border-[#8692A6] focus:border-[#5871EB] pl-4 mt-3 rounded-sm text-[11px] text-[#8692A6]'
        {...register('username',
        {
          required:{
            value: true,
            message: "Username is required."
          },
          pattern:{
            value: /^[A-Za-z]+$/,
            message: "Username must contain only alphabetic characters."
          }
        }
        )}
        />
        <p className='text-red-500 text-left font-normal text-[11px] mt-3'>{errors.username?.message}</p>
      </div>

      <div className='flex flex-col items-start my-[23px]'>
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
        <label htmlFor='password' className='font-normal font-poppins text-[14px] text-[#696F79]'>Create password*</label>
        <input type='password' name='password' placeholder='Create a password' className='bg-[#282A2F] w-full h-[60px] outline-none border border-[#8692A6] focus:border-[#5871EB] pl-4 mt-3 rounded-sm text-[11px] text-[#8692A6]'
        {...register('password',
        {
          required: {
            value: true,
            message: "Password is required!"
          },
          pattern: {
            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            message: "Password must contain at least one uppercase letter, number and special character"
          },
        }
        )}
        />
        <p className='text-red-500 text-left font-normal text-[11px] mt-3'>{errors.password?.message}</p>
      </div>

      <div className=' my-[23px]'>
        <div className='flex flex-row gap-4 items-center'>
        <input type='checkbox' name='terms' className='outline-none border border-[#8692A6]'
        {...register('terms',
        {
          required:{
            value: true,
            message: "To proceed you must agree with our terms and conditions."
          }
         }
        )}
        />
        <p className='font-normal font-poppins text-[13px] text-[#8692A6]'>I agree to terms & conditions</p>
        </div>
        <p className='text-red-500 text-left font-normal text-[11px] mt-3'>{errors.terms?.message}</p> 
      </div>
      <p className='font-normal font-poppins text-[13px] text-[#8692A6] mt-1'>Already have an account? <span className='text-[#5871EB]'><Link href='/login'>Log In</Link></span></p>

      <button type='submit'
      disabled={holdBtn || isSubmitting}
      onClick={handleSubmit}
      className={`text-white w-full  ${holdBtn ? "bg-[#8497f55d] cursor-not-allowed" : "bg-[#5871EB] cursor-pointer"} ease-in-out transition-all duration-300 w-full h-[60px] my-10 mb-5 rounded-sm text-white font-medium flex items-center justify-center`}>
        Register Account
      </button>

      <div className='w-full flex items-center '>
        <div className='w-[50%] h-[0.5px] bg-[#F5F5F5]'></div>
        <p className='text-[#BABABA] text-[12px] px-7 bg-[#202227]'>Or</p>
        <div className='w-[50%] h-[0.5px] bg-[#F5F5F5]'></div>
      </div>

      <GoogleButton/>
      {isSubmitting}
      </form>

      <div className='hidden lg:block rounded-xl overflow-hidden w-[55%] h-full'>
        <img src='./assets/loginimage.png' className='w-full h-full' alt='spiral image'/>
      </div>
    </main>
  )
}
