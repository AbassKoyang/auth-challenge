"use client"
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';

const Form = ({type, post, setPost, submitting, handleSubmit}) => {

  return (
    <section className='w-full max-w-full flex-col flex-start mb-5'>
      <h1 className='head_text text-left'><span className='blue_gradient'>{type} Post</span></h1>
      <p className='desc text-left max-w-md'>{type} and share stunning pictures with the world and let your creativity be appreciated. Logo is the best place for  photographers to share amazing photos.</p>
      <form action="" 
      className='mt-10 w-full smax-w-2xl flex flex-col gap-7 glassmorphism'
      onSubmit={handleSubmit}
      >
        <label htmlFor="">
          <span className='font-satoshi font-semibold text-base text-white'>Caption</span>
        </label>
        <textarea
        value={post.caption}
        onChange={(e) => setPost({...post, caption: e.target.value})}
        placeholder='Write your caption here...'
        required
        className='form_textarea'
        />
        <label htmlFor="">
          <span className='font-satoshi font-semibold text-base text-white'>
            Tag 
            <span className='font-normal text-gray-400'> (#nature)</span>
          </span>
        </label>
        <input
        value={post.tag}
        onChange={(e) => setPost({...post, tag: e.target.value})}
        placeholder='Add post tag'
        required
        className='form_input'
        />
        {/* <label htmlFor="">
          <span className='font-satoshi font-semibold text-base text-white'>
            Attach Image
            <span className='font-normal text-gray-400'> (PNG, JPG, JPEG)</span>
          </span>
        </label>
        <input
        onChange={(e) => setPost({...post, picture: e.target.files[0]})}
        placeholder='Upload image'
        required
        type='file'
        accept='image/*'
        className='form_input'
        /> */}

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/home' className='text-white text-sm'>Cancel</Link>
          <button
          className='px-5 py-1.5 text-sm rounded-full text-white bg-gradient-to-r from-blue-400 via-purple-600 to-cyan-400'
          type='submit'
          disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form