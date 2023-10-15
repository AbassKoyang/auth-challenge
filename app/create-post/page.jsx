"use client"
import React from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@/Components/Form';
import Navbar from '@/Components/Navbar';

const CreatePost = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ caption: "", tag: "", picture: null});
  
    const createPost = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
        const response = await fetch("/api/prompt/new", {
            method: "POST",
            body: JSON.stringify({
              caption: post.caption,
              userId: session?.user.id,
              tag: post.tag,
              picture: post.picture,
            }),
          });
  
        if (response.ok) {
          router.push("/home");
        }
      } catch (error) {
        console.log("New post error", error);
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <section className='w-full max-w-full flex-col flex-start lg:px-20 px-6'>
      <Navbar/>
      <Form
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPost}
      />
      </section>
    );
  };

export default CreatePost;